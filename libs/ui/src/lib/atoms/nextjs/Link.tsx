'use client';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';

export interface LinkProps extends NextLinkProps {
    disabled?: boolean;
    className?: string;
    children?: ReactNode;
}

export function Link({ disabled = false, children, ...props }: LinkProps) {
    const className = [props.className, disabled]
        .filter((i) => Boolean(i))
        .join(' ');

    return (
        <NextLink
            {...props}
            aria-disabled={disabled}
            className={className ?? undefined}
        >
            {children}
        </NextLink>
    );
}
