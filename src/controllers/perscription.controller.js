const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { perscriptionService } = require('../services');
const ApiError = require('../utils/ApiError');

const createPerscription = catchAsync(async (req, res) => {
    const perscription = await perscriptionService.createPerscription(req.body)
    res.status(httpStatus.OK).send(perscription);
});

const getPerscription = catchAsync(async (req, res) => {
    const perscription = await perscriptionService.getPerscriptionById(req.params.perscriptionId);
    if (!perscription) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Perscription not found');
    }
    res.status(httpStatus.OK).send(perscription);
});

const getPerscriptions = catchAsync(async (req, res) => {
    const perscriptions = await perscriptionService.getAllPerscriptions();
    res.status(httpStatus.OK).send(perscriptions);
});

const updatePerscription = catchAsync(async (req, res) => {
    const perscription = await perscriptionService.updatePerscription(req.body, req.params.perscriptionId);
    res.status(httpStatus.OK).send(perscription);
});

const deletePerscription = catchAsync(async (req, res) => {
    await perscriptionService.deletePerscription(req.params.perscriptionId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createPerscription,
    getPerscription,
    getPerscriptions,
    updatePerscription,
    deletePerscription
};
