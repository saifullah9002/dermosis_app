const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const { User, Appointment, Issue } = require('../models');

/**
 * Create new issue
 * @param {Object} issueBody
 * @returns {Promise}
 */
const createIssue = async (issueBody) => {
    const issue = Issue.create(issueBody);
    return issue;
};

/**
 * Get all reported issues
 * @returns {Promise}
 */
const getAllIssues = async () => {
    return Issue.find();
};

/**
 * Get issue with Id
 * @param {String} issueId
 * @returns {Promise}
 */
const getIssueById = async (issueId) => {
    return Issue.findById(issueId);
};

/**
 * Find issues via mongoose filter
 * @param {Object} filter
 * @returns {Promise}
 */
const findSortIssues = async (filter, sorting) => {
    return Issue.find(filter).sort(sorting);
};

/**
 * Update issue
 * @param {Object} issueBody
 * @param {String} issueId
 * @returns {Promise}
 */
const updateIssue = async (issueBody, issueId) => {
    const issue = await getIssueById(issueId);
    if (!issue) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Issue not found');
    }
    Object.assign(issue, issueBody);
    await issue.save();
    return issue;
};

/**
 * Delete issue
 * @param {String} issueId
 * @returns {Promise}
 */
const deleteIssue = async (issueId) => {
    const issue = await getIssueById(issueId);
    if (!issue) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Issue not found');
    }
    await issue.remove();
    return issue;
};

/**
 * Get issues reported by user
 * @param {String} userId
 * @returns {Promise}
 */
const getUsersIssues = async (userId) => {

};

module.exports = {
    createIssue,
    getAllIssues,
    findSortIssues,
    getIssueById,
    updateIssue,
    deleteIssue,
    getUsersIssues
};
