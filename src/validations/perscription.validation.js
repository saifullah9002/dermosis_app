const Joi = require('joi');
const { objectId, sorting } = require('./custom.validation');

const medication = Joi.object().keys({
    name: Joi.string().required(),
    dosage: Joi.string().required()
})


const createPerscription = {
    body: Joi.object().keys({
        appointmentId: Joi.string().custom(objectId),
        perscriptionEndDate: Joi.string().required(),
        medication: Joi.array().items(medication).required(),
        note: Joi.string()
    }),
};

const getPerscription = {
    params: Joi.object().keys({
        perscriptionId: Joi.string().custom(objectId),
    }),
};

const deletePerscription = {
    params: Joi.object().keys({
        perscriptionId: Joi.string().custom(objectId),
    }),
};

const updatePerscription = {
    params: Joi.object().keys({
        perscriptionId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            appointmentId: Joi.string().custom(objectId),
            perscriptionEndDate: Joi.string().required(),
            medication: Joi.array().items(medication).required(),
            note: Joi.string()
        })
        .min(1),
};

module.exports = {
    createPerscription,
    getPerscription,
    deletePerscription,
    updatePerscription
};
