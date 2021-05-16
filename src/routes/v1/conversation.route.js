const express = require('express');
const validate = require('../../middlewares/validate');
const { conversationValidation } = require('../../validations/index');
const { conversationController } = require('../../controllers/index');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/', auth('completedRegistration'), validate(conversationValidation.createConversation), conversationController.createConversation);
router.get('/', auth('completedRegistration'), conversationController.getConversations);
router.get('/:conversationId', auth('completedRegistration'), validate(conversationValidation.getConversation), conversationController.getConversation);
router.get('/user/:userId', auth('completedRegistration'), validate(conversationValidation.getUsersConversation), conversationController.getUsersConversations);
router.put('/:conversationId', auth('completedRegistration'), validate(conversationValidation.updateConversation), conversationController.updateConversation);
router.delete('/:conversationId', auth('completedRegistration'), validate(conversationValidation.deleteConversation), conversationController.deleteConversation);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Conversation
 *   description: Conversation between users
 */

/**
 * @swagger
 * /conversation:
 *   post:
 *     summary: Create a new conversation
 *     tags: [Conversation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - participants
 *             properties:
 *               participants:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               participants:
 *                 - 609c241f07f4915bfc672a88
 *                 - 609adac9306fb0530cde626b
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Conversation'
 */

/**
 * @swagger
 * /conversation/{conversationId}:
 *   put:
 *     summary: Update conversation
 *     tags: [Conversation]
 *     parameters:
 *       - in: path
 *         name: conversationId
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
 *               participants:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               participants:
 *                 - 609c241f07f4915bfc672a88
 *                 - 609adac9306fb0530cde626b
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Conversation'
 */

/**
 * @swagger
 * /conversation/{conversationId}:
 *   get:
 *     summary: Get conversation with ID
 *     tags: [Conversation]
 *     parameters:
 *       - in: path
 *         name: conversationId
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
 *               $ref: '#/components/schemas/Conversation'
 */

/**
 * @swagger
 * /conversation/user/{userId}:
 *   get:
 *     summary: Get users conversations
 *     tags: [Conversation]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conversation'
 */

/**
 * @swagger
 * /conversation:
 *   get:
 *     summary: Get all conversations
 *     tags: [Conversation]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conversation'
 */

/**
 * @swagger
 * /conversation/{conversationId}:
 *   delete:
 *     summary: Delete conversation with ID
 *     tags: [Conversation]
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "204":
 *         description: No content
 */