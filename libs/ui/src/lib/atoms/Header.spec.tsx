import { render, screen } from '@testing-library/react';

import { Header, type HeaderProps } from './Header';

describe(Header.name, () => {
    beforeEach(() => jest.resetAllMocks());
    afterAll(() => jest.restoreAllMocks());

    const defaultProps: HeaderProps = {};

    it('renders', () => {
        render(<Header {...defaultProps} />);
        expect(
            screen.getByRole('link', { name: /homepage/i })
        ).toBeInTheDocument();
    });
});
