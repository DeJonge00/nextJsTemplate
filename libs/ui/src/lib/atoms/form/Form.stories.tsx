import type { Meta, StoryObj } from '@storybook/react';

import { Form } from './Form';

const meta: Meta<typeof Form> = {
    title: 'UI/Atoms/Form/Form',
    component: Form,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Primary: Story = {
    args: {
        input: {},
        button: {
            children: 'Button',
        },
    },
    render: (args) => <Form {...args} />,
};
