import type { Meta, StoryObj } from '@storybook/react';

function StylePage() {
    return (
        <div>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>

            <span>span</span>
            <p>paragraph</p>
            <a>link</a>

            <ul>
                <li>item 1</li>
                <li>item 2</li>
            </ul>
            <ol>
                <li>item 1</li>
                <li>item 2</li>
            </ol>

            <table>
                <tr>
                    <td>cell 1-1</td>
                    <td>cell 1-2</td>
                </tr>
                <tr>
                    <td>cell 2-1</td>
                    <td>cell 2-2</td>
                </tr>
            </table>
        </div>
    );
}

const meta: Meta<typeof StylePage> = {
    title: 'Website/Style',
    component: StylePage,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StylePage>;

export const Primary: Story = {
    args: {},
    render: (args) => <StylePage />,
};
