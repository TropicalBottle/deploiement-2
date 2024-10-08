import { calculateAge } from "./module"
let people20years;
beforeEach(() => {
    let date = new Date();
    people20years = {
        birth: new Date(date.setFullYear(date.getFullYear() - 20))
    };
})
/**
 * @function calculateAge
 */
describe('calculateAge Unit Test Suites', () => {
    it('should return a correct age', () => {
        expect(calculateAge(people20years)).toEqual(20)
    })

    it('should be an object', () => {
        expect(people20years).toEqual(expect.any(Object))
    });

    it('should throw a "missing param p" error', () => {
        expect(() => calculateAge()).toThrow("missing param p")
    })

    it('should contain a field birth', () => {
        expect(people20years.birth).toBeDefined()
    });

    it('should be a date', () => {
        expect(people20years.birth).toEqual(expect.any(Date))
    });
})
