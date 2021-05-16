const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { Conversation, User } = require('../models');

/**
 * Create new conversation
 * @param {Object} conversationBody
 * @returns {Promise}
 */
const createConversation = async (conversationBody) => {
    conversationBody.participants.forEach(async participant => {
        const user = await User.findById(participant);
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Conversation participant does not exist');
        }
    });
    const conversation = await Conversation.create(conversationBody)
    return conversation;
};

/**
 * Get all conversations
 * @returns {Promise}
 */
const getAllConversations = async () => {
    return Conversation.find();
};

/**
 * Get all conversations with user
 * @param {String} userId
 * @returns {Promise}
 */
const getAllUsersConversations = async (userId) => {
    return Conversation.find({ participants: userId });
};

/**
 * Get conversation with Id
 * @param {String} conversationId
 * @returns {Promise}
 */
const getConversationById = async (conversationId) => {
    return Conversation.findById(conversationId);
};

/**
 * Update conversation
 * @param {Object} conversationBody
 * @param {String} conversationId
 * @returns {Promise<Conversation>}
 */
const updateConversation = async (conversationBody, conversationId) => {
    const conversation = await getConversationById(conversationId);
    if (!conversation) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Conversation not found');
    }
    if (conversationBody.participants) {
        conversationBody.participants.forEach(async participant => {
            const user = await userService.getUserById(participant);
            if (!user) {
                throw new ApiError(httpStatus.NOT_FOUND, 'Conversation participant does not exist');
            }
        });
    }
    Object.assign(conversation, conversationBody);
    await conversation.save();
    return conversation;
};

/**
 * Delete conversation
 * @param {String} conversationId
 * @returns {Promise}
 */
const deleteConversation = async (conversationId) => {
    const conversation = await getFeedbackById(conversationId);
    if (!conversation) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Conversation not found');
    }
    await conversation.remove();
    return conversation;
};

module.exports = {
    createConversation,
    getAllConversations,
    getAllUsersConversations,
    getConversationById,
    updateConversation,
    deleteConversation
};
