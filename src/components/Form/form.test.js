import { areAllFieldsFilled, isValidEmail, isValidFrenchPostalCode, isValidName, validateAge } from './form_checker';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Form from './Form';

describe('is age over 18', () => {
    it( 'should return true if over 18', () => {
        const nineTeenDate = new Date();
        nineTeenDate.setFullYear(nineTeenDate.getFullYear() - 19);
        expect(validateAge(nineTeenDate)).toBe(true);
    } );

    it( 'should return true is equal to 18', () => {
        const eighteenDate = new Date();
        eighteenDate.setFullYear(eighteenDate.getFullYear() - 18);
        expect(validateAge(eighteenDate)).toBe(true);
    } );

    it( 'should return false is below 18', () => {
        const seventeenDate = new Date();
        seventeenDate.setFullYear(seventeenDate.getFullYear() - 17);
        expect(validateAge(seventeenDate)).toBe(false);
    } );

    it( 'should return false if a string is sent', () => {
        expect(validateAge('DROP TABLE;')).toBe(false)
    } );

    it( 'should return false if nothing is sent', () => {
        expect(validateAge(undefined)).toBe(false);
    } );
});

describe('it should be a french postal code', () => {
    it( 'should return true if the postal code is french', () => {
        const frenchPostalCode = '34300';
        expect(isValidFrenchPostalCode(frenchPostalCode)).toBe(true);
    } );

    it( 'should return false if american postal code', () => {
        const ukPostalCode = 'CF101AE'; //Postal code from Cardiff
        expect(isValidFrenchPostalCode(ukPostalCode)).toBe(false);
    } );
})

describe('check if is valid name', () => {
    it( 'should return true if name is a simple name', () => {
        expect(isValidName('Maxine')).toBe(true);
    } );

    it( 'should return true for name with particular case', () => {
        expect(isValidName('Loïse')).toBe(true);
    } );

    it( 'should return false for alien name', () => {
        expect(isValidName('X Æ A-12')).toBe(false); //Sorry Elon Musk son
    } );

    it( 'should return false if symbol are used', () => {
        expect(isValidName('DROP TABLE;')).toBe(false);
    } );

    it( 'should return false if not a string', () => {
        expect(isValidName(35)).toBe(false)
    } );

    it( 'should return false if nothing sent', () => {
        expect(isValidName(undefined)).toBe(false)
    } );
});

describe('check is email is valid', () => {
    it( 'should return true for a mail', () => {
        expect(isValidEmail('maill@mail.com')).toBe(true);
    } );

    it( 'should return true for a regular mail', () => {
       expect(isValidEmail('mail.mail@mail.com')).toBe(true);
    } );

    it( 'should return false if extension if forgotten', () => {
        expect(isValidEmail('mail@mail')).toBe(false);
    } );

    it( 'should return false if is a regular text', () => {
        expect(isValidEmail('DROP TABLE;')).toBe(false);
    } );
})

describe('check if all fields are valid', () => {
    it( 'should return true if all formData are filled', () => {
        const formData = {
            first_name: 'Maxine',
            last_name: 'Caufield',
            email: 'maxine.caufield@gmail.com',
            date: '0200-10-04',
            city: 'Montpellier',
            postal: '34500'
        };

        expect(areAllFieldsFilled(formData)).toBe(true);
    } );

    it( 'should return false if a input is empty', () => {
        const formData = {
            first_name: 'Maxine',
            last_name: '',
            email: 'maxine.caufield@gmail.com',
            date: '0200-10-04',
            city: 'Montpellier',
            postal: '34500'
        };

        expect(areAllFieldsFilled(formData)).toBe(false);
    } );
})

describe( 'it should test if the form appear correctly', () => {
    beforeEach( () => {
        render( <Form/> );
    } );

    test( 'render form', () => {
        expect( screen.getByRole( 'heading', { name: 'Register' } ) ).toBeInTheDocument();
    } );

    test( 'all inputs are appearing', () => {
        expect( screen.getAllByRole( 'textbox' ).length ).toBe( 5 );
        expect( screen.getByLabelText( 'Birthday:' ) ).toBeInTheDocument();
        expect( screen.getByRole('button', { name:'Register' }) ).toBeInTheDocument();
    } );

    describe('it should check if the input error handling is working fine', () => {
        test('nothing should happen if no input are filled and button is clicked', () => {
            expect( screen.getByRole('button', { name:'Register' }) ).toBeDisabled();
        });
    } );
} );

describe('the search function should manage the form submission', () => {
    beforeEach( () => {
        render( <Form/> );
    } );

    test('shows error messages when invalid inputs are submitted', async () => {
        const submitButton = screen.getByRole('button', { name: 'Register' });
        const form = screen.getByRole('form');

        fireEvent.submit(form);

        await waitFor(() => {
            expect(screen.getByText('* Please verify your first name')).toBeInTheDocument();
            expect(screen.getByText('* Please verify your last name')).toBeInTheDocument();
            expect(screen.getByText('* Please verify your mail')).toBeInTheDocument();
            expect(screen.getByText('* Please verify your date')).toBeInTheDocument();
            expect(screen.getByText('* Please verify your city')).toBeInTheDocument();
            expect(screen.getByText('* Please verify your postal code')).toBeInTheDocument();
        });
    });

    test('submits successfully when all inputs are valid', async () => {
        fireEvent.change(screen.getByPlaceholderText('Max'), { target: { value: 'John' } });
        fireEvent.change(screen.getByPlaceholderText('Smith'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByPlaceholderText('mail@mail.com'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Montpellier'), { target: { value: 'Paris' } });
        fireEvent.change(screen.getByPlaceholderText('34500'), { target: { value: '75000' } });
        fireEvent.change(screen.getByLabelText('Birthday:'), { target: { value: '2000-01-01' } });

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        await waitFor(() => {
            expect(screen.getByText('You have been registered.')).toBeInTheDocument();
        });
    });
})