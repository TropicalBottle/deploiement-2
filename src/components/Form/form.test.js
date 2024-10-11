import { areAllFieldsFilled, isValidEmail, isValidFrenchPostalCode, isValidName, validateAge } from './form_checker';

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