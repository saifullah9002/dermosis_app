const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const { User, Appointment } = require('../models');

/**
 * Create new appointment
 * @param {Object} appointmentBody
 * @returns {Promise}
 */
const createAppointment = async (appointmentBody) => {
    const patient = await userService.getUserById(appointmentBody.patientId);
    if (!patient || patient.role !== 'patient') {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient does not exist');
    }
    const doctor = await userService.getUserById(appointmentBody.doctorId);
    if (!doctor || doctor.role !== 'doctor') {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor does not exist');
    }
    const appointment = await Appointment.create(appointmentBody)
    return appointment;
};

/**
 * Get all appointments
 * @returns {Promise}
 */
const getAllAppointments = async () => {
    return Appointment.find();
};

/**
 * Get issue with Id
 * @param {String} appointmentId
 * @returns {Promise}
 */
const getAppointmentById = async (appointmentId) => {
    return Appointment.findById(appointmentId);
};

/**
 * Update appointment
 * @param {Object} appointmentBody
 * @param {String} appointmentId
 * @returns {Promise}
 */
const updateAppointment = async (appointmentBody, appointmentId) => {
    const appointment = await getAppointmentById(appointmentId);
    if (!appointment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found');
    }
    Object.assign(appointment, appointmentBody);
    await appointment.save();
    return appointment;
};

/**
 * Delete issue
 * @param {String} appointmentId
 * @returns {Promise}
 */
const deleteAppointment = async (appointmentId) => {
    const appointment = await getAppointmentById(appointmentId);
    if (!appointment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found');
    }
    await appointment.remove();
    return appointment;
};

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};
