import { ReactNode } from 'react';

import { Container } from './elements';
import { Link } from './nextjs/Link';

export interface FooterProps {
    children?: ReactNode;
}

export function Footer({ children }: FooterProps) {
    return (
        <div className="w-full flex flex-col gap-2 justify-center bg-gray-700">
            <div className="flex flex-col gap-4 max-w-7xl w-full mx-auto p-4">
                {children && <div>{children}</div>}
                <Container className="justify-between">
                    <Container>
                        <span>Copyright?</span>
                    </Container>
                    <Link href="/api/health">Site Health</Link>
                </Container>
            </div>
        </div>
    );
}
