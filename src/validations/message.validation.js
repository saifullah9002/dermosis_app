const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMessage = {
    body: Joi.object().keys({
        conversationId: Joi.string().custom(objectId).required(),
        senderId: Joi.string().custom(objectId).required(),
        type: Joi.string().required(),
        content: Joi.string().required(),
        status: Joi.string()
    }),
};

const getMessage = {
    params: Joi.object().keys({
        messageId: Joi.string().custom(objectId),
    }),
};

const getMessagesInConversation = {
    params: Joi.object().keys({
        conversationId: Joi.string().custom(objectId),
    }),
};

const deleteMessage = {
    params: Joi.object().keys({
        messageId: Joi.string().custom(objectId),
    }),
};

const updateMessage = {
    params: Joi.object().keys({
        messageId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            conversationId: Joi.string().custom(objectId).required(),
            senderId: Joi.string().custom(objectId).required(),
            type: Joi.string().required(),
            content: Joi.string().required(),
            status: Joi.string()
        })
        .min(1),
};

module.exports = {
    createMessage,
    getMessage,
    getMessagesInConversation,
    deleteMessage,
    updateMessage
};
