const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { messageService } = require('../services');
const ApiError = require('../utils/ApiError');

const createMessage = catchAsync(async (req, res) => {
    const message = await messageService.createMessage(req.body)
    res.status(httpStatus.OK).send(message);
});

const getMesage = catchAsync(async (req, res) => {
    const message = await messageService.getMessageById(req.params.messageId);
    if (!message) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
    }
    res.status(httpStatus.OK).send(message);
});

const getMessagesInConversation = catchAsync(async (req, res) => {
    const messages = await messageService.getAllMessagesInConversations(req.params.conversationId);
    res.status(httpStatus.OK).send(messages);
});

const updateMessage = catchAsync(async (req, res) => {
    const message = await messageService.updateMessage(req.body, req.params.messageId);
    res.status(httpStatus.OK).send(message);
});

const deleteMessage = catchAsync(async (req, res) => {
    await messageService.deleteMessage(req.params.messageId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createMessage,
    getMesage,
    getMessagesInConversation,
    updateMessage,
    deleteMessage
};
