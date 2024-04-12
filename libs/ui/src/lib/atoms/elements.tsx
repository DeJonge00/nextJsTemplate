import { HTMLProps } from 'react';

type ContainerProps = HTMLProps<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
    return <div {...props} className={`flex flex-row gap-4 ${className}`} />;
}
