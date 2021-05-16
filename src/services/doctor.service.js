const httpStatus = require('http-status');
const { User } = require('../models');
const { Doctor } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Convert generic user to patient
 * @param {string} userId
 * @param {Object} doctorBody
 * @returns {Promise<Doctor>}
 */
const convertUserToDoctor = async (user, doctorBody) => {
    await User.findByIdAndRemove(user._id);
    const doctor = await Doctor.create({
        role: "doctor",
        isVerified: true,
        isRegistrationComplete: false,
        email: user.email,
        password: user.password,
        firstname: doctorBody.firstname,
        lastname: doctorBody.lastname,
        gender: doctorBody.gender,
        dateOfBirth: Date.parse(doctorBody.dateOfBirth),
        city: doctorBody.city,
        address: doctorBody.address,
        emergencyContact: doctorBody.emergencyContact
    });
    return doctor;
};

module.exports = {
    convertUserToDoctor
    /*queryUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,*/
};
