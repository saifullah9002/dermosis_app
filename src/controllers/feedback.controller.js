const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, appointmentService, feedbackService } = require('../services');
const ApiError = require('../utils/ApiError');

const createFeedback = catchAsync(async (req, res) => {
    const feedback = await feedbackService.createFeedback(req.body)
    res.status(httpStatus.OK).send(feedback);
});

const getFeedback = catchAsync(async (req, res) => {
    const feedback = await feedbackService.getFeedbackById(req.params.feedbackId);
    if (!feedback) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
    }
    res.status(httpStatus.OK).send(feedback);
});

const getFeedbacks = catchAsync(async (req, res) => {
    const feedbacks = await feedbackService.getAllFeedbacks();
    res.status(httpStatus.OK).send(feedbacks);
});

const updateFeedback = catchAsync(async (req, res) => {
    const feedback = await feedbackService.updateFeedback(req.body, req.params.feedbackId);
    res.status(httpStatus.OK).send(feedback);
});

const deleteFeedback = catchAsync(async (req, res) => {
    await feedbackService.deleteFeedback(req.params.feedbackId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createFeedback,
    getFeedback,
    getFeedbacks,
    updateFeedback,
    deleteFeedback
};
