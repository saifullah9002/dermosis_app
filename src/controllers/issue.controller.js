const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, appointmentService, issueService } = require('../services');
const ApiError = require('../utils/ApiError');

const createIssue = catchAsync(async (req, res) => {
    const issueBody = { reporterId: req.user._id, type: req.body.type, description: req.body.description }
    const issue = await issueService.createIssue(issueBody);
    res.status(httpStatus.OK).send({ id: issue.id, type: issue.type, description: issue.description, created: issue.created, repoter: req.user });
});

const getAllIssues = catchAsync(async (req, res) => {
    const issues = await issueService.getAllIssues();
    let response = [];
    if (issues.length > 0) {
        for (const issue of issues) {
            const reporter = await userService.findUser(issue.reporterId);
            response.push({ id: issue.id, type: issue.type, description: issue.description, created: issue.created, reporter })
        }
    }
    res.status(httpStatus.OK).send(response);
});

const getIssue = catchAsync(async (req, res) => {
    const issue = await issueService.getIssueById(req.params.issueId);
    if (!issue) {
        throw new ApiError(httpStatus.NOT_FOUND, 'There is no issue with this id');
    }
    const reporter = await userService.findUser(issue.reporterId);
    res.status(httpStatus.OK).send({ id: issue.id, type: issue.type, description: issue.description, created: issue.created, reporter });
});

const updateIssue = catchAsync(async (req, res) => {
    const issue = await issueService.updateIssue(req.body, req.params.issueId);
    const reporter = await userService.findUser(issue.reporterId);
    res.status(httpStatus.OK).send({ id: issue.id, type: issue.type, description: issue.description, created: issue.created, reporter });
});

const deleteIssue = catchAsync(async (req, res) => {
    await issueService.deleteIssue(req.params.issueId);
    res.status(httpStatus.NO_CONTENT).send();
});

const getUsersIssues = catchAsync(async (req, res) => {
    const issues = await issueService.findSortIssues({ reporterId: req.params.userId }, { created: req.query.sortCreated });
    let response = [];
    if (issues.length > 0) {
        for (const issue of issues) {
            const reporter = await userService.findUser(issue.reporterId);
            response.push({ id: issue.id, type: issue.type, description: issue.description, created: issue.created, reporter })
        }
    }
    res.status(httpStatus.OK).send(response);
});

module.exports = {
    createIssue,
    getAllIssues,
    getIssue,
    updateIssue,
    deleteIssue,
    getUsersIssues
};
