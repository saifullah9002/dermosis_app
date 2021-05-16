const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { issueValidation } = require('./../../validations');
const { issueController } = require('./../../controllers');

const router = express.Router();

router.post('/', auth('completedRegistration'), validate(issueValidation.createIssue), issueController.createIssue);
router.get('/', auth('completedRegistration'), issueController.getAllIssues);
router.get('/:issueId', auth('completedRegistration'), validate(issueValidation.getIssue), issueController.getIssue);
router.get('/user/:userId', auth('completedRegistration'), validate(issueValidation.getUsersIssues), issueController.getUsersIssues);
router.put('/:issueId', auth('completedRegistration'), validate(issueValidation.updateIssue), issueController.updateIssue);
router.delete('/:issueId', auth('completedRegistration'), validate(issueValidation.deleteIssue), issueController.deleteIssue);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Issue
 *   description: Issues reported by the users of the application
 */

/**
 * @swagger
 * /issue:
 *   post:
 *     summary: Report a new issue
 *     tags: [Issue]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - type
 *             properties:
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *             example:
 *               description: Cannot open home page
 *               type: system
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Issue'
 */

/**
 * @swagger
 * /issue/{issueId}:
 *   put:
 *     summary: Update issue
 *     tags: [Issue]
 *     parameters:
 *       - in: path
 *         name: issueId
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
 *               $ref: '#/components/schemas/Issue'
 */

/**
 * @swagger
 * /issue/{issueId}:
 *   get:
 *     summary: Get issue with ID
 *     tags: [Issue]
 *     parameters:
 *       - in: path
 *         name: issueId
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
 *               $ref: '#/components/schemas/Issue'
 */

/**
 * @swagger
 * /issue/{issueId}:
 *   delete:
 *     summary: Delete issue with ID
 *     tags: [Issue]
 *     parameters:
 *       - in: path
 *         name: issueId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "204":
 *         description: No content
 */