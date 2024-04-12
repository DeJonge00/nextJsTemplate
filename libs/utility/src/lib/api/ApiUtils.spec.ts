import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

import { apiWrapper } from './ApiUtils';
import { yup } from './yupSchema';
import { ApiWrapperProps, RequestMethod } from './ApiUtilInterfaces';

const errorBackup = console.error;

jest.mock('./ShopifyStorefrontClient', () => ({
    getStorefrontClient: jest.fn(),
}));
jest.mock('./ShopifyAdminClient', () => ({
    getAdminClient: jest.fn(),
}));
jest.mock('../config/configFactory', () => ({
    configFactory: {
        createShopifyStorefrontClientConfig: () => ({}),
    },
}));
const cookiesMock = { get: jest.fn(), set: jest.fn() };
jest.mock('next/headers', () => ({ cookies: jest.fn() }));

const defaultProps: ApiWrapperProps = {
    api: jest.fn(),
};

describe('apiWrapper', () => {
    beforeAll(() => (console.error = jest.fn()));
    beforeEach(() => {
        jest.resetAllMocks();
        (cookies as jest.Mock).mockReturnValue(cookiesMock);
        (defaultProps.api as jest.Mock).mockReturnValue({
            body: undefined,
            status: 200,
        });
    });
    afterAll(() => {
        jest.restoreAllMocks();
        console.error = errorBackup;
    });

    const defaultApiProps = { method: 'POST' } as NextRequest;

    describe('methods', () => {
        it('allows the call when the parameter is empty', async () => {
            const fn = await apiWrapper(defaultProps);
            await fn(defaultApiProps);
            expect(defaultProps.api).toHaveBeenCalledTimes(1);
        });

        it('allows provided methods', async () => {
            const fn = await apiWrapper({
                ...defaultProps,
                methods: new Set(['POST' as RequestMethod]),
            });
            await fn(defaultApiProps);
            expect(defaultProps.api).toHaveBeenCalledTimes(1);
        });

        it('disallows non-provided methods', async () => {
            const fn = await apiWrapper({
                ...defaultProps,
                methods: new Set(['GET' as RequestMethod]),
            });
            const response = await fn(defaultApiProps);
            expect(response.status).toEqual(405);
        });
    });

    describe('checkLoggedIn', () => {
        it('calls the api', async () => {
            cookiesMock.get.mockReturnValue({
                value: JSON.stringify({ customerAccessToken: 'token' }),
            });
            const fn = await apiWrapper({
                ...defaultProps,
                checkLoggedIn: true,
            });
            await fn(defaultApiProps);
            expect(defaultProps.api).toHaveBeenCalledTimes(1);
        });

        it('supplies a logged in users customerAccessToken', async () => {
            cookiesMock.get.mockReturnValue({
                value: JSON.stringify({ customerAccessToken: 'token' }),
            });
            const fn = await apiWrapper({
                ...defaultProps,
                checkLoggedIn: true,
            });
            await fn(defaultApiProps);
            expect(
                (defaultProps.api as jest.Mock).mock.calls[0][0].wrapperParams
            ).toHaveProperty('customerAccessToken');
        });

        it('errors if the customerAccessToken cannot be found', async () => {
            const fn = await apiWrapper({
                ...defaultProps,
                checkLoggedIn: true,
            });
            const response = await fn(defaultApiProps);
            expect(response.status).toEqual(401);
        });
    });

    describe('inputSchema', () => {
        const inputSchema = yup
            .object({
                requiredKey: yup.number().required(),
                keyOne: yup.number().nullable(),
                keyTwo: yup.number().nullable(),
            })
            .noUnknown()
            .strict();

        it.each`
            input
            ${{ requiredKey: 0 }}
            ${{ requiredKey: 0, keyOne: 1 }}
            ${{ requiredKey: 0, keyTwo: 2 }}
            ${{ requiredKey: 0, keyOne: 1, keyTwo: 2 }}
        `('validates $input', async ({ input }) => {
            const fn = await apiWrapper({ ...defaultProps, inputSchema });
            const response = await fn({
                ...defaultApiProps,
                json: async () => input,
            } as NextRequest);
            expect(response.status).toEqual(200);
        });

        it.each`
            input                              | error
            ${{ requiredKey: 0, otherKey: 1 }} | ${['this field has unspecified keys: otherKey']}
            ${{ requiredKey: 0, keyOne: '1' }} | ${['keyOne must be a `number` type, but the final value was: `"1"`.']}
            ${{ keyOne: 1, keyTwo: 2 }}        | ${['requiredKey is a required field']}
        `('invalidates $input', async ({ input, error }) => {
            const fn = await apiWrapper({ ...defaultProps, inputSchema });
            const response = await fn({
                ...defaultApiProps,
                json: async () => input,
            } as NextRequest);
            expect(response.status).toEqual(400);
            expect(await response.json()).toEqual(error);
        });
    });

    describe('defaultOptions status', () => {
        it('returns the default 500 code', async () => {
            const fn = await apiWrapper({
                ...defaultProps,
                api: () => {
                    throw Error();
                },
            });
            const response = await fn(defaultApiProps);
            expect(response.status).toEqual(500);
        });

        it.each`
            code
            ${200}
            ${401}
            ${501}
            ${503}
        `('returns the given $code code', async ({ code }) => {
            const fn = await apiWrapper({
                ...defaultProps,
                api: () => {
                    throw Error();
                },
                defaultOptions: { status: code },
            });
            const response = await fn(defaultApiProps);
            expect(response.status).toEqual(code);
        });
    });
});
