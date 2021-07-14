const Appointment = require("../models/Appointment.js")
const isAdmin = require("../middleware/isAdmin.js")

module.exports = function (app) {
  // Create a new appointment
  app.post("/appointment/create", isAdmin, async (req, res) => {
    const { doctor_name, description, registrant } = req.body
    const newAppointment = new Appointment({
      doctor_name,
      description,
      registrant,
    })
    newAppointment.save()
    return res.json(newAppointment)
  })

  // Update an appointment
  app.put("/appointment/:id", isAdmin, async (req, res) => {
    const { id } = req.params
    const { doctor_name, description } = req.body
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, {
      doctor_name,
      description,
    })
    return res.json(updatedAppointment)
  })

  // Delete an appointment
  app.delete("/appointment/:id", isAdmin, async (req, res) => {
    const { id } = req.params
    const deletedAppointment = await Appointment.findByIdAndRemove(id)
    return res.json(deletedAppointment)
  })

  // Get all registrants for an appointment
  app.get("/appointment/:id/registrants", isAdmin, async (req, res) => {
    const { id } = req.params
    const appointment = await Appointment.findById(id)
    return res.json({ data: appointment.registrant })
  })
}
