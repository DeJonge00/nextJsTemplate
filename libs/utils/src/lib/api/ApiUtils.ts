'use server';

import { type NextRequest, NextResponse } from 'next/server';

import { type ApiWrapperProps, RequestMethod } from './ApiUtilInterfaces';

// Api wrapper
export async function apiWrapper<InputShape>({
    name,
    api,
    methods,
    inputSchema,
    defaultOptions = {
        status: 500,
        headers: { 'content-type': 'application/json' },
    },
}: ApiWrapperProps<InputShape>) {
    return async (request: NextRequest) => {
        if (methods?.size && !methods.has(request.method as RequestMethod)) {
            return new NextResponse(undefined, { status: 405 });
        }

        let body = {} as InputShape;
        if (inputSchema) {
            try {
                const input: InputShape = await request.json();
                try {
                    body = input;
                    await inputSchema.validate(body);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (e: any) {
                    // eslint-disable-next-line no-console
                    console.error(e.errors, input);
                    return new NextResponse(JSON.stringify(e.errors), {
                        ...defaultOptions,
                        status: 400,
                    });
                }
            } catch {
                return new NextResponse(
                    JSON.stringify({ error: 'Body is not valid JSON' }),
                    {
                        ...defaultOptions,
                        status: 400,
                    }
                );
            }
        }

        try {
            const apiResponse = await api({
                wrapperParams: {
                    body,
                },
                request,
            });

            if (![200, 202].includes(apiResponse.status)) {
                console.error(
                    `Api ${name ?? api.name}() returned status code ${
                        apiResponse.status
                    }:`,
                    apiResponse.body
                        ? JSON.stringify(apiResponse.body, null, 2)
                        : 'No body'
                );
            }
            return new NextResponse(JSON.stringify(apiResponse.body), {
                ...defaultOptions,
                ...apiResponse,
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            // eslint-disable-next-line no-console
            console.error(`Error in ApiWrapper (${name ?? api.name}):`, e);
            return new NextResponse(e?.message, {
                ...defaultOptions,
                headers: {
                    ...defaultOptions?.headers,
                    'content-type': 'text/xml',
                },
            });
        }
    };
}
