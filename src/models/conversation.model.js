const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const conversationSchema = mongoose.Schema({
    participants: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'User',
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
},
    {
        timestamps: true,
    });

// add plugin that converts mongoose to json
conversationSchema.plugin(toJSON);
conversationSchema.plugin(paginate);

/**
 * @typedef Conversation
 */
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = {
    Conversation,
    conversationSchema,
};
