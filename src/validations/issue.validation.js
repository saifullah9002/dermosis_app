const Joi = require('joi');
const { objectId, sorting } = require('./custom.validation');

const createIssue = {
    body: Joi.object().keys({
        description: Joi.string().required(),
        type: Joi.string().required()
    }),
};

const getIssue = {
    params: Joi.object().keys({
        issueId: Joi.string().custom(objectId),
    }),
};

const getUsersIssues = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
    query: Joi.object().keys({
        sortCreated: Joi.string().custom(sorting)
    }),
};

const deleteIssue = {
    params: Joi.object().keys({
        issueId: Joi.string().custom(objectId),
    }),
};

const updateIssue = {
    params: Joi.object().keys({
        issueId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            description: Joi.string(),
            type: Joi.string(),
        })
        .min(1),
};

module.exports = {
    createIssue,
    getIssue,
    deleteIssue,
    updateIssue,
    getUsersIssues
};
