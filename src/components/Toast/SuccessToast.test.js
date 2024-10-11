import SuccessToast from './SuccessToast';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';

beforeEach(() => {
    render(<ParentComponent/>);
})

function ParentComponent() {
    const [isSuccessful, setSuccessful] = useState(true);
    return (
        <>
            {isSuccessful && <SuccessToast setSuccessful={setSuccessful} />}
        </>
    );
}

describe('it should test if the toast can be hide on click', () => {

    test('render toast', () => {
        expect(screen.getByText('You have been registered.')).toBeInTheDocument();
    })

    test('setSuccessful to false when click on button', () => {
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        fireEvent.click(button)
        expect(button).not.toBeInTheDocument();
    })
})