const express = require('express');
const validate = require('../../middlewares/validate');
const { perscriptionValidation } = require('../../validations/index');
const { perscriptionController } = require('../../controllers/index');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/', auth('completedRegistration'), validate(perscriptionValidation.createPerscription), perscriptionController.createPerscription);
router.get('/', auth('completedRegistration'), perscriptionController.getPerscriptions);
router.get('/:perscriptionId', auth('completedRegistration'), validate(perscriptionValidation.getPerscription), perscriptionController.getPerscription);
router.put('/:perscriptionId', auth('completedRegistration'), validate(perscriptionValidation.updatePerscription), perscriptionController.updatePerscription);
router.delete('/:perscriptionId', auth('completedRegistration'), validate(perscriptionValidation.deletePerscription), perscriptionController.deletePerscription);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Perscription
 *   description: Managing patients perscriptions
 */

/**
 * @swagger
 * /perscription:
 *   post:
 *     summary: Insert new perscription.
 *     tags: [Perscription]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - appointmentId
 *               - perscriptionEndDate
 *               - medication
 *               - note
 *             properties:
 *               appointmentId:
 *                 type: string
 *               perscriptionEndDate:
 *                 type: string
 *               medication:
 *                 $ref: "#/components/schemas/Medication"
 *               note:
 *                 type: string
 *             example:
 *               appointmentId: 60a0f237f46f411448fd9182
 *               perscriptionEndDate: 2020-01-05T16:00:00.000Z
 *               medication:
 *                  - name: Vikidin
 *                    dosage: One per day
 *               note: Bla bla
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Perscription'
 */

/**
 * @swagger
 * /perscription/{perscriptionId}:
 *   put:
 *     summary: Change perscription
 *     tags: [Perscription]
 *     parameters:
 *       - in: path
 *         name: perscriptionId
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
 *               appointmentId:
 *                 type: string
 *               perscriptionEndDate:
 *                 type: string
 *               medication:
 *                 $ref: "#/components/schemas/Medication"
 *               note:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Perscription'
 */

/**
 * @swagger
 * /perscription/{perscriptionId}:
 *   get:
 *     summary: Get perscription with ID
 *     tags: [Perscription]
 *     parameters:
 *       - in: path
 *         name: perscriptionId
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
 *               $ref: '#/components/schemas/Perscription'
 */

/**
 * @swagger
 * /perscription:
 *   get:
 *     summary: Get all perscriptions
 *     tags: [Perscription]
 *     responses:
*       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Perscription'
 */

/**
 * @swagger
 * /perscription/{perscriptionId}:
 *   delete:
 *     summary: Delete perscription with ID
 *     tags: [Perscription]
 *     parameters:
 *       - in: path
 *         name: perscriptionId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "204":
 *         description: No content
 */