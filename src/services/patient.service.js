const httpStatus = require('http-status');
const { User } = require('../models');
const { Patient } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a patient
 * @param {Object} patientBody
 * @returns {Promise<Patient>}
 */
const createPatient = async (patientBody) => {
    if (await User.isEmailTaken(patientBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    const patient = await Patient.create(patientBody);
    return patient;
};

/**
 * Convert generic user to patient
 * @param {string} userId
 * @param {Object} patientBody
 * @returns {Promise<Patient>}
 */
const convertUserToPatient = async (user, patientBody) => {
    await User.findByIdAndRemove(user._id);
    const patient = await Patient.create({
        role: "patient",
        isVerified: true,
        isRegistrationComplete: true,
        email: user.email,
        password: user.password,
        firstname: patientBody.firstname,
        lastname: patientBody.lastname,
        gender: patientBody.gender,
        dateOfBirth: Date.parse(patientBody.dateOfBirth),
        city: patientBody.city,
        address: patientBody.address,
        emergencyContact: patientBody.emergencyContact
    });
    return patient;
};

module.exports = {
    createPatient,
    convertUserToPatient
    /*queryUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,*/
};
