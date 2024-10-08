import {fireEvent, render, screen} from '@testing-library/react';
import Counter from "./Counter";

test('Counter increments and decrements when the buttons are clicked', () => {
    render(<Counter />);
    const button = screen.getByRole('button');
    const count = screen.getByTestId('count');
    expect(button).toBeInTheDocument();
    expect(count).toBeInTheDocument();
    expect(count).toHaveTextContent('0');
    fireEvent.click(button);
    expect(count).toHaveTextContent('1');
});