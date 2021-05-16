const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/', validate(authValidation.register), authController.register);
router.post('/verify-otp', auth(), validate(authValidation.verifyOTP), authController.verifyOTP);
router.post('/continue', auth('verified'), validate(authValidation.continueRegistration), authController.continueRegistration);
router.post('/continue-doc', auth('verified', 'doctor'), validate(authValidation.continueRegistrationDoctor), authController.continueRegistrationDoctor);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Signup
 *   description: User signup
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Start user registration process
 *     tags: [Signup]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - email
 *               - password
 *             properties:
 *               phone:
 *                 type: string
 *                 description: Must be unique
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               phone: 123548915
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
 * /verify-otp:
 *   post:
 *     summary: Verify one time password
 *     tags: [Signup]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               otp:
 *                 type: string
 *             example:
 *               email: fake@example.com
 *               password: 123456
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       "401":
 *         description: Invalid email or otp
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Invalid email or otp
 */

/**
 * @swagger
 * /continue:
 *   post:
 *     summary: Contiune user registration process. For patients this is last step before completing registration process.
 *     tags: [Signup]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - firstname
 *               - lastname
 *               - gender
 *               - dateOfBirth
 *               - city
 *               - address
 *               - emergencyContact
 *             properties:
 *               type:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               emergencyContact:
 *                 type: string
 *               gender:
 *                 type: string
 *             example:
 *               type: doctor
 *               firstname: Mark
 *               lastname: Hamiln
 *               dateOfBirth: 1985-12-22
 *               city: Atlanta
 *               address: Street 123
 *               emergencyContact: +985 2356 561
 *               gender: male
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/User'
 *       "401":
 *         description: User has not verified account
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Account is not verified
 */

/**
 * @swagger
 * /continue-doc:
 *   post:
 *     summary: Last registration step for doctors. To have doctor rights, needs to be confirmed by administrator.
 *     tags: [Signup]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - speciality
 *               - licenseNumber
 *               - dateOfGraduation
 *             properties:
 *               speciality:
 *                 type: string
 *               licenseNumber:
 *                 type: int32
 *               dateOfGraduation:
 *                 type: string
 *             example:
 *               speciality: Brain surgeon
 *               licenseNumber: 312312312
 *               dateOfGraduation: 2000-05-22
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */