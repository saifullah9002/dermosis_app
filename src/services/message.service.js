const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { Conversation, User, Message } = require('../models');
const { conversationService } = require('.');
const { getMessage } = require('../validations/message.validation');

/**
 * Create new message
 * @param {Object} messageBody
 * @returns {Promise}
 */
const createMessage = async (messageBody) => {
    const conversation = await conversationService.getConversationById(messageBody.conversationId);
    if (!conversation) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Conversation does not exist');
    }
    const sender = await userService.getUserById(messageBody.senderId);
    if (!sender) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Conversation participant does not exist');
    }
    const message = await Message.create(messageBody)
    return message;
};

/**
 * Get all messages in conversation
 * @param {String} conversationId
 * @returns {Promise}
 */
const getAllMessagesInConversations = async (conversationId) => {
    return Message.find({ conversationId: conversationId });
};

/**
 * Get message with Id
 * @param {String} messageId
 * @returns {Promise}
 */
const getMessageById = async (messageId) => {
    return Message.findById(messageId);
};

/**
 * Update message
 * @param {Object} messageBody
 * @param {String} messageId
 * @returns {Promise<Conversation>}
 */
const updateMessage = async (messageBody, messageId) => {
    const message = await getMessageById(messageId);
    if (!message) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
    }
    const conversation = await conversationService.getConversationById(messageBody.conversationId);
    if (!conversation) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Conversation does not exist');
    }
    const sender = await userService.getUserById(messageBody.senderId);
    if (!sender) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Conversation participant does not exist');
    }
    Object.assign(message, messageBody);
    await message.save();
    return message;
};

/**
 * Delete conversation
 * @param {String} messageId
 * @returns {Promise}
 */
const deleteMessage = async (messageId) => {
    const message = await getMessageById(messageId);
    if (!message) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
    }
    await message.remove();
    return message;
};

module.exports = {
    createMessage,
    getAllMessagesInConversations,
    getMessageById,
    updateMessage,
    deleteMessage
};
