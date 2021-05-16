const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const appointmentSchema = mongoose.Schema({
  patientId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  doctorId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  appointmentDateTime: {
    type: Date,
    required: true,
  },
  diseaseName: {
    type: String,
    required: true,
  },
  paidInAdvance: {
    type: Boolean,
    default: false,
    required: true,
  },
},
  {
    timestamps: true,
  });

// add plugin that converts mongoose to json
appointmentSchema.plugin(toJSON);
appointmentSchema.plugin(paginate);

/**
 * @typedef Appointment
 */
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = {
  Appointment,
  appointmentSchema,
};
