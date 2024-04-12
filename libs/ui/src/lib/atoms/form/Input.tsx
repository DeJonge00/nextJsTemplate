'use client';

import { HTMLProps } from 'react';

export type InputProps = Omit<HTMLProps<HTMLInputElement>, 'children'>;

export function Input({ value, ...props }: InputProps) {
    return <input {...props} value={value} />;
}
