const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createConversation = {
    body: Joi.object().keys({
        participants: Joi.array().items(objectId).required()
    }),
};

const getConversation = {
    params: Joi.object().keys({
        conversationId: Joi.string().custom(objectId),
    }),
};

const getUsersConversation = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
};

const deleteConversation = {
    params: Joi.object().keys({
        conversationId: Joi.string().custom(objectId),
    }),
};

const updateConversation = {
    params: Joi.object().keys({
        conversationId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            participants: Joi.array().items(objectId),
            isDeleted: Joi.boolean()
        })
        .min(1),
};

module.exports = {
    createConversation,
    getConversation,
    getUsersConversation,
    deleteConversation,
    updateConversation
};
