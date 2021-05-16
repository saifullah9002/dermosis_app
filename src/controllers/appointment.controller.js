const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, appointmentService } = require('../services');
const ApiError = require('../utils/ApiError');

const createAppointmnet = catchAsync(async (req, res) => {
    const appointment = await appointmentService.createAppointment(req.body)
    res.status(httpStatus.OK).send(appointment);
});

const getAppointmnet = catchAsync(async (req, res) => {
    const appointment = await appointmentService.getAppointmentById(req.params.appointmentId);
    if (!appointment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found');
    }
    res.status(httpStatus.OK).send(appointment);
});

const getAppointmnets = catchAsync(async (req, res) => {
    const appointments = await appointmentService.getAllAppointments();
    res.status(httpStatus.OK).send(appointments);
});

const updateAppointment = catchAsync(async (req, res) => {
    const appointment = await appointmentService.updateAppointment(req.body, req.params.appointmentId);
    res.status(httpStatus.OK).send(appointment);
});

const deleteAppointment = catchAsync(async (req, res) => {
    await appointmentService.deleteAppointment(req.params.appointmentId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createAppointmnet,
    getAppointmnet,
    getAppointmnets,
    updateAppointment,
    deleteAppointment
};
