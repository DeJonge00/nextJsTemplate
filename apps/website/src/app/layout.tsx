import './global.css';

import { Footer, Header } from '@website/ui';

export const metadata = {
    title: 'Welcome to website',
    description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="flex flex-col">
                <Header />
                <div className="w-full max-w-7xl mx-auto p-4 grow">
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    );
}
