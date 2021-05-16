const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const perscriptionSchema = mongoose.Schema({
    appointmentId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Appointment',
        required: true,
    },
    perscriptionEndDate: {
        type: Date,
        required: true,
    },
    medication: {
        type: [Object],
        required: true,
    },
    note: {
        type: String,
    }
},
    {
        timestamps: true,
    });

// add plugin that converts mongoose to json
perscriptionSchema.plugin(toJSON);
perscriptionSchema.plugin(paginate);

/**
 * @typedef Perscription
 */
const Perscription = mongoose.model('Perscription', perscriptionSchema);

module.exports = {
    Perscription,
    perscriptionSchema,
};
