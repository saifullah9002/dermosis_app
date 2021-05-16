const express = require('express');
const validate = require('../../middlewares/validate');
const { feedbackValidation } = require('../../validations/index');
const { feedbackController } = require('../../controllers/index');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/', auth('completedRegistration'), validate(feedbackValidation.createFeedback), feedbackController.createFeedback);
router.get('/', auth('completedRegistration'), feedbackController.getFeedbacks);
router.get('/:feedbackId', auth('completedRegistration'), validate(feedbackValidation.getFeedback), feedbackController.getFeedback);
router.put('/:feedbackId', auth('completedRegistration'), validate(feedbackValidation.updateFeedback), feedbackController.updateFeedback);
router.delete('/:feedbackId', auth('completedRegistration'), validate(feedbackValidation.deleteFeedback), feedbackController.deleteFeedback);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: User feedback
 */

/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: Leave a feedback
 *     tags: [Feedback]
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
 *               - rating
 *             properties:
 *               details:
 *                 type: string
 *               rating:
 *                 type: int32
 *               patientId:
 *                 type: string
 *               doctorId:
 *                 type: string
 *             example:
 *               details: Connection was slow
 *               rating: 1
 *               patientId: 609c241f07f4915bfc672a88
 *               doctorId: 609adac9306fb0530cde626b
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Feedback'
 */

/**
 * @swagger
 * /feedback/{feedbackId}:
 *   put:
 *     summary: Update issue
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: feedbackId
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
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *             example:
 *               description: Edited description
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Feedback'
 */

/**
 * @swagger
 * /feedback/{feedbackId}:
 *   get:
 *     summary: Get feedback with ID
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: feedbackId
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
 *               $ref: '#/components/schemas/Feedback'
 */

/**
 * @swagger
 * /feedback/{feedbackId}:
 *   delete:
 *     summary: Delete feedback with ID
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: feedbackId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "204":
 *         description: No content
 */