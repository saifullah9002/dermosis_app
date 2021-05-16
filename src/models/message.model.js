const mongoose = require('mongoose');
const {messsageSatatuses, messageStatuses} = require('./../config/messageStatuses');
const {messageTypes} = require('./../config/messageTypes');
const { toJSON, paginate } = require('./plugins');

const messageSchema = mongoose.Schema({
    conversationId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Conversation',
        required: true,
    },
    senderId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
    status: {
        type: String,
        enum: messageStatuses,
        default: 'sent',
    },
    type: {
        type: String,
        enum: messageTypes,
        default: 'text',
    }
},
    {
        timestamps: true,
    });

// add plugin that converts mongoose to json
messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

/**
 * @typedef Message
 */
const Message = mongoose.model('Message', messageSchema);

module.exports = {
    Message,
    messageSchema,
};
