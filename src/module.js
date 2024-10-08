/**
 * Calculate a person's age in years.
 *
 * @param {object} p An object representing a person, implementing a birth Date parameter.
 * @return {number} The age in years of p.
 */
function calculateAge(p) {
    if(!p) {
        throw new Error("missing param p")
    }
    let dateDiff = new Date(Date.now() - p.birth.getTime())
    let age = Math.abs(dateDiff.getUTCFullYear() - 1970);
    return age;
}

/**
 * Calculate a person's age in years.
 *
 * @param {object} p An object representing a person, implementing a birth Date parameter.
 * @return {number} The age in years of p.
 */
function calculateAgeStatic(date) {
    if(!date) {
        throw new Error("missing param p")
    }
    date = new Date(date);
    let dateDiff = new Date(Date.now() - date)
    let age = Math.abs(dateDiff.getUTCFullYear() - 1970);
    return age;
}

/**
 * Verify is postal code is french
 * @param postalCode
 * @returns {boolean}
 */
function isValidFrenchPostalCode(postalCode) {
    const regex = /^\d{5}$/;
    return regex.test(postalCode);
}

export {calculateAge, calculateAgeStatic, isValidFrenchPostalCode}
