import { NextRequest } from 'next/server';
import { ObjectSchema, ObjectShape } from 'yup';

export interface ApiWrapperParams<InputShape = any> {
    wrapperParams: {
        body: InputShape;
    };
    request: NextRequest;
}

export type RequestMethod = 'POST' | 'GET';

export interface ApiFunctionResponse {
    status: number;
    body?: any;
}

export interface ApiWrapperProps<
    InputShape = any,
    ValidationShape extends ObjectShape = any
> {
    name?: string;
    api: (input: ApiWrapperParams<InputShape>) => Promise<ApiFunctionResponse>;
    methods?: Set<RequestMethod>;
    inputSchema?: ObjectSchema<ValidationShape>;
    defaultOptions?: ResponseInit;
}
