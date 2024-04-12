'use client';

import { HTMLProps } from 'react';

export type InputProps = HTMLProps<HTMLInputElement>;

export function Input({ children, ...props }: InputProps) {
    return <input {...props}>{children}</input>;
}
