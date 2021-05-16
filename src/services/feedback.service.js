const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const { User, Appointment, Feedback } = require('../models');

/**
 * Create new feedback
 * @param {Object} feedbackBody
 * @returns {Promise}
 */
const createFeedback = async (feedbackBody) => {
    const patient = await userService.getUserById(feedbackBody.patientId);
    if (!patient || patient.role !== 'patient') {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient does not exist');
    }
    const doctor = await userService.getUserById(feedbackBody.doctorId);
    if (!doctor || doctor.role !== 'doctor') {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor does not exist');
    }
    const feedback = await Feedback.create(feedbackBody)
    return feedback;
};

/**
 * Get all feedbacks
 * @returns {Promise}
 */
const getAllFeedbacks = async () => {
    return Feedback.find();
};

/**
 * Get feedback with Id
 * @param {String} feedbackId
 * @returns {Promise}
 */
const getFeedbackById = async (feedbackId) => {
    return Feedback.findById(feedbackId);
};

/**
 * Update feedback
 * @param {Object} feedbackBody
 * @param {String} feedbackId
 * @returns {Promise}
 */
const updateFeedback = async (feedbackBody, feedbackId) => {
    const feedback = await getFeedbackById(feedbackId);
    if (!feedback) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
    }
    const patient = await userService.getUserById(feedbackBody.patientId);
    if (!patient || patient.role !== 'patient') {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient does not exist');
    }
    const doctor = await userService.getUserById(feedbackBody.doctorId);
    if (!doctor || doctor.role !== 'doctor') {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor does not exist');
    }
    Object.assign(feedback, feedbackBody);
    await feedback.save();
    return feedback;
};

/**
 * Delete feedback
 * @param {String} feedbackId
 * @returns {Promise}
 */
const deleteFeedback = async (feedbackId) => {
    const feedback = await getFeedbackById(feedbackId);
    if (!feedback) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
    }
    await feedback.remove();
    return feedback;
};

module.exports = {
    createFeedback,
    getAllFeedbacks,
    getFeedbackById,
    updateFeedback,
    deleteFeedback
};
