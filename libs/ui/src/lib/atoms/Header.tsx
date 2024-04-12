import { ReactNode } from 'react';

import { Container } from './elements';
import { Link } from './nextjs/Link';

export interface HeaderProps {
    children?: ReactNode;
}

export function Header({ children }: HeaderProps) {
    return (
        <div className="w-full flex flex-col gap-2 justify-center bg-gray-700">
            <div className="flex flex-col gap-4 max-w-7xl w-full mx-auto p-4">
                <Container>
                    <Link href="/">Homepage</Link>
                    <span>Title</span>
                    <span>Menu 1</span>
                    <span>Menu 2</span>
                    <span>Menu 3</span>
                </Container>
                {children && <div>{children}</div>}
            </div>
        </div>
    );
}
