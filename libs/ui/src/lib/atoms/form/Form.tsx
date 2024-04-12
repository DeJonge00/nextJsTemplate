'use client';

import { Button, ButtonProps } from './Button';
import { Input, InputProps } from './Input';

interface FormProps {
    input: InputProps;
    button: ButtonProps;
}

export function Form({ input, button }: FormProps) {
    return (
        <div className="flex flex-col gap-4">
            <Input {...input} />
            <Button {...button} />
        </div>
    );
}
