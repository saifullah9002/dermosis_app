const express = require('express');
const validate = require('../../middlewares/validate');
const appointmentValidation = require('../../validations/appointment.validation');
const appointmentController = require('../../controllers/appointment.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/', auth('completedRegistration'), validate(appointmentValidation.createAppintment), appointmentController.createAppointmnet);
router.get('/', auth('admin'), appointmentController.getAppointmnets); // IMO for privacy reasons only admin should see all appointments in application
router.get('/:appointmentId', auth('completedRegistration'), validate(appointmentValidation.getAppintment), appointmentController.getAppointmnet);
router.put('/:appointmentId', auth('completedRegistration'), validate(appointmentValidation.updateAppintment), appointmentController.updateAppointment);
router.delete('/:appointmentId', auth('completedRegistration'), validate(appointmentValidation.deleteAppintment), appointmentController.deleteAppointment);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Appointment
 *   description: Patients doctor appointment
 */

/**
 * @swagger
 * /appointment:
 *   post:
 *     summary: Book doctor appointment
 *     tags: [Appointment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patientId
 *               - doctorId
 *               - details
 *               - appointmentDateTime
 *               - diseaseName
 *               - paidInAdvance
 *             properties:
 *               patientId:
 *                 type: string
 *               doctorId:
 *                 type: string
 *               appointmentDateTime:
 *                 type: string
 *               diseaseName:
 *                 type: string
 *               paidInAdvance:
 *                 type: boolean
 *               details:
 *                 type: string
 *             example:
 *               patientId: 609c241f07f4915bfc672a88
 *               doctorId: 609adac9306fb0530cde626b
 *               details: Weeky checkup
 *               appointmentDateTime: 2020-01-05T16:00:00Z
 *               diseaseName: Weeky checkup
 *               paidInAdvance: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Appointment'
 */

/**
 * @swagger
 * /appointment/{appointmentId}:
 *   put:
 *     summary: Update appointment
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: appointment
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *               doctorId:
 *                 type: string
 *               appointmentDateTime:
 *                 type: string
 *               diseaseName:
 *                 type: string
 *               paidInAdvance:
 *                 type: boolean
 *               details:
 *                 type: string
 *             example:
 *               patientId: 609c241f07f4915bfc672a88
 *               doctorId: 609adac9306fb0530cde626b
 *               details: Weeky checkup
 *               appointmentDateTime: 2020-01-05T16:00:00Z
 *               diseaseName: Weeky checkup
 *               paidInAdvance: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Appointment'
 */

/**
 * @swagger
 * /appointment/{appointmentId}:
 *   get:
 *     summary: Get appointment with ID
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Appointment'
 */

/**
 * @swagger
 * /appointment:
 *   get:
 *     summary: Get all appointment
 *     tags: [Appointment]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 */

/**
 * @swagger
 * /appointment/{appointmentId}:
 *   delete:
 *     summary: Delete appointment with ID
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "204":
 *         description: No content
 */