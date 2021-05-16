const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { conversationService } = require('../services');
const ApiError = require('../utils/ApiError');

const createConversation = catchAsync(async (req, res) => {
    const conversation = await conversationService.createConversation(req.body)
    res.status(httpStatus.OK).send(conversation);
});

const getConversation = catchAsync(async (req, res) => {
    const conversation = await conversationService.getConversationById(req.params.conversationId);
    if (!conversation) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Conversation not found');
    }
    res.status(httpStatus.OK).send(conversation);
});

const getConversations = catchAsync(async (req, res) => {
    const conversations = await conversationService.getAllConversations();
    res.status(httpStatus.OK).send(conversations);
});

const getUsersConversations = catchAsync(async (req, res) => {
    const conversations = await conversationService.getAllUsersConversations();
    res.status(httpStatus.OK).send(conversations);
});

const updateConversation = catchAsync(async (req, res) => {
    const conversation = await conversationService.updateConversation(req.body, req.params.conversationId);
    res.status(httpStatus.OK).send(conversation);
});

const deleteConversation = catchAsync(async (req, res) => {
    await conversationService.deleteConversation(req.params.conversationId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createConversation,
    getConversation,
    getConversations,
    getUsersConversations,
    updateConversation,
    deleteConversation
};
