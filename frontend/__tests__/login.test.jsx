import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';

/**
 * This test will check if the login page renders a has a heading.
 * Also, it will check if the login page has a form with a submit button.
 **/
describe('Login', () => {
    it('renders a heading', () => {
        render(<Login />);

        const heading = screen.getByRole('heading', { level: 1 });

        expect(heading).toBeInTheDocument();
    });
    it('renders a form with a submit button', () => {
        render(<Login />);

        const form = screen.getByRole('form');
        const submitButton = screen.getByRole('button', { name: /submit/i });

        expect(form).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });
});