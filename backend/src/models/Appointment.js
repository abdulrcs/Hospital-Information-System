const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AppointmentSchema = new Schema({
  doctor_name: String,
  description: String,
  registrant: {
    type: [],
    default: [],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
})

const Appointment = mongoose.model("Appointment", AppointmentSchema)

module.exports = Appointment
