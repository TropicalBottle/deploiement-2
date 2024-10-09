/**
 * Verify is postal code is french
 * @param postalCode
 * @returns {boolean}
 */
export function isValidFrenchPostalCode(postalCode) {
    const regex = /^\d{5}$/;
    return regex.test(postalCode);
}

/**
 * Check if the name is valid.
 *
 * @param {object} name An string .
 * @returns {boolean} test if the name have only letters, spaces, hyphens and apostrophes.
 */
export function isValidName(name) {
    if ( typeof name !== 'string') {
        return false;
    }
    const namePattern = /^[a-zA-Zà-ÿÀ-Ÿ' -]+$/;
    return namePattern.test(name);
}

/**
 * Calculate a person's age in years.
 *
 * @param {object} p An object representing a person, implementing a birth Date parameter.
 * @return {number} The age in years of p.
 */
export function validateAge(date) {
    if(!date) {
        throw new Error("missing param p")
    }
    date = new Date(date);
    let dateDiff = new Date(Date.now() - date)
    let age = Math.abs(dateDiff.getUTCFullYear() - 1970);
    return age;
}

/**
 * Check if the email is valid.
 *
 * @param email
 * @returns {boolean}
 */
export function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

/**
 * Check if all fields of the form are not null
 * @param formData
 * @returns true|false
 */
export function areAllFieldsFilled(formData) {
    return Object.values(formData).every(value => value.trim() !== '');
}