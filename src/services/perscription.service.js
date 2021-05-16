const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { User, Appointment, Feedback, Perscription } = require('../models');
const { appointmentService } = require('./index');

/**
 * Create new perscription
 * @param {Object} perscriptionBody
 * @returns {Promise}
 */
const createPerscription = async (perscriptionBody) => {
    const appointment = await appointmentService.getAppointmentById(perscriptionBody.appointmentId);
    if (!appointment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Appointment does not exist');
    }
    const perscription = await Perscription.create(perscriptionBody)
    return perscription;
};

/**
 * Get all perscriptions
 * @returns {Promise}
 */
const getAllPerscriptions = async () => {
    return Perscription.find();
};

/**
 * Get perscription with Id
 * @param {String} perscriptionId
 * @returns {Promise}
 */
const getPerscriptionById = async (perscriptionId) => {
    return Perscription.findById(perscriptionId);
};

/**
 * Update perscription
 * @param {Object} perscriptionBody
 * @param {String} perscriptionId
 * @returns {Promise}
 */
const updatePerscription = async (perscriptionBody, perscriptionId) => {
    const perscription = await getPerscriptionById(perscriptionId);
    if (!perscription) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Perscription not found');
    }
    const appointment = await appointmentService.getAppointmentById(perscriptionBody.appointmentId);
    if (!appointment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Appointment does not exist');
    }
    Object.assign(perscription, perscriptionBody);
    await perscription.save();
    return perscription;
};

/**
 * Delete perscription
 * @param {String} perscriptionId
 * @returns {Promise}
 */
const deletePerscription = async (perscriptionId) => {
    const perscription = await getPerscriptionById(perscriptionId);
    if (!perscription) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Perscription not found');
    }
    await perscription.remove();
    return perscription;
};

module.exports = {
    createPerscription,
    getAllPerscriptions,
    getPerscriptionById,
    updatePerscription,
    deletePerscription
};
