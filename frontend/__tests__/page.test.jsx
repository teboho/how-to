import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';

/**
 * This test checks if the Home component renders a heading.
 */
describe('Page', () => {
    it('renders a heading', () => {
        render(<Home />);

        const heading = screen.getByRole('heading', { level: 1 });

        expect(heading).toBeInTheDocument();
    })
});


