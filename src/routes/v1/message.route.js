const express = require('express');
const validate = require('../../middlewares/validate');
const { messageValidation } = require('../../validations/index');
const { messageController } = require('../../controllers/index');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/', auth('completedRegistration'), validate(messageValidation.createMessage), messageController.createMessage);
router.get('/:messageId', auth('completedRegistration'), validate(messageValidation.getMessage), messageController.getMesage);
router.get('/conversation/:conversationId', auth('completedRegistration'), validate(messageValidation.getMessagesInConversation), messageController.getMessagesInConversation);
router.put('/:messageId', auth('completedRegistration'), validate(messageValidation.updateMessage), messageController.updateMessage);
router.delete('/:messageId', auth('completedRegistration'), validate(messageValidation.deleteMessage), messageController.deleteMessage);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Message
 *   description: Messages between application users
 */

/**
 * @swagger
 * /message:
 *   post:
 *     summary: Send new message.
 *     tags: [Message]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - conversationId
 *               - senderId
 *               - type
 *               - content
 *             properties:
 *               conversationId:
 *                 type: string
 *               senderId:
 *                 type: string
 *               type:
 *                 type: string
 *               content:
 *                 type: string
 *               status:
 *                 type: string
 *             example:
 *               conversationId: 60a0f237f46f411448fd9182
 *               senderId: 609adac9306fb0530cde626b
 *               type: text
 *               content: Hellp
 *               status: sent
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Message'
 */

/**
 * @swagger
 * /message/{messageId}:
 *   put:
 *     summary: Update message
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: messageId
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
 *               conversationId:
 *                 type: string
 *               senderId:
 *                 type: string
 *               type:
 *                 type: string
 *               content:
 *                 type: string
 *               status:
 *                 type: string
 *             example:
 *               conversationId: 60a0f237f46f411448fd9182
 *               senderId: 609adac9306fb0530cde626b
 *               type: text
 *               content: Hello
 *               status: sent
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Message'
 */

/**
 * @swagger
 * /message/{messageId}:
 *   get:
 *     summary: Get message with ID
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: messageId
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
 *               $ref: '#/components/schemas/Message'
 */

/**
 * @swagger
 * /message/{conversationId}:
 *   get:
 *     summary: Get all messages in conversation
 *     tags: [Message]
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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 */

/**
 * @swagger
 * /message/{messageId}:
 *   delete:
 *     summary: Delete message with ID
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: messageId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       "204":
 *         description: No content
 */