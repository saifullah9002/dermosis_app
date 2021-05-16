const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAppintment = {
    body: Joi.object().keys({
        patientId: Joi.string().required(),
        doctorId: Joi.string().required(),
        details: Joi.string().required(),
        appointmentDateTime: Joi.string().required(),
        diseaseName: Joi.string().required(),
        paidInAdvance: Joi.boolean()
    }),
};

const getAppintment = {
    params: Joi.object().keys({
        appointmentId: Joi.string().custom(objectId),
    }),
};

const deleteAppintment = {
    params: Joi.object().keys({
        appointmentId: Joi.string().custom(objectId),
    }),
};

const updateAppintment = {
    params: Joi.object().keys({
        appointmentId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            patientId: Joi.string().required(),
            doctorId: Joi.string().required(),
            details: Joi.string().required(),
            appointmentDateTime: Joi.string().required(),
            diseaseName: Joi.string().required(),
            paidInAdvance: Joi.boolean()
        })
        .min(1),
};

module.exports = {
    createAppintment,
    getAppintment,
    deleteAppintment,
    updateAppintment
};
