import { render, screen } from '@testing-library/react';
import { Typography } from './Typography';

const testCopy = 'Foobar';

test('renders children', () => {
    render(<Typography>{testCopy}</Typography>);
    const placeholderText = screen.getByText(testCopy);
    expect(placeholderText).toBeInTheDocument();
});
