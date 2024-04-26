'use client';

import { Button, Input } from '@website/ui';

export function FormPage() {
    return (
        <div className="flex flex-col gap-2">
            <Input onClick={console.log} />
            <Button onClick={console.log}>test</Button>
        </div>
    );
}
