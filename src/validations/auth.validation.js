const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    phone: Joi.string().required()
  }),
};

const verifyOTP = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    otp: Joi.string().required()
  }),
};

const continueRegistration = {
  body: Joi.object().keys({
    type: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    gender: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    emergencyContact: Joi.string().required()
  }),
};

const continueRegistrationDoctor = {
  body: Joi.object().keys({
    speciality: Joi.string().required(),
    licenseNumber: Joi.number().required(),
    dateOfGraduation: Joi.string().required()
  }),
};

const login = {
  body: Joi.object().keys({
    phone: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const changePassword = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required().custom(password),
    newPassword: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  verifyOTP,
  continueRegistration,
  continueRegistrationDoctor,
  login,
  logout,
  refreshTokens,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
