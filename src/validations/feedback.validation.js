const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFeedback = {
    body: Joi.object().keys({
        patientId: Joi.string().required().custom(objectId),
        doctorId: Joi.string().required().custom(objectId),
        details: Joi.string().required(),
        rating: Joi.number().integer().min(1).max(5).required()
    }),
};

const getFeedback = {
    params: Joi.object().keys({
        feedbackId: Joi.string().custom(objectId),
    }),
};

const deleteFeedback = {
    params: Joi.object().keys({
        feedbackId: Joi.string().custom(objectId),
    }),
};

const updateFeedback = {
    params: Joi.object().keys({
        feedbackId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            patientId: Joi.string().required().custom(objectId),
            doctorId: Joi.string().required().custom(objectId),
            details: Joi.string().required(),
            rating: Joi.number().integer().min(1).max(5).required()
        })
        .min(1),
};

module.exports = {
    createFeedback,
    getFeedback,
    deleteFeedback,
    updateFeedback
};
