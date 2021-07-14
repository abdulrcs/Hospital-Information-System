const isAuthenticated = require("../middleware/isAuthenticated.js")
const Appointment = require("../models/Appointment")

module.exports = function (app) {
  // apply appointment
  app.post("/appointment/apply/:id", isAuthenticated, async (req, res) => {
    const name = req.user.name
    const appointment = await Appointment.findOne({ _id: req.params.id })
    if (appointment.registrant.includes(name)) {
      res.status(400).send("You have already applied to this appointment.")
    } else {
      appointment.registrant.push(name)
      appointment.save()
      res.json({ message: "Applied!" })
    }
  })

  // see list of appointments
  app.get("/appointment/list", isAuthenticated, async (req, res) => {
    const appointments = await Appointment.find({})
    res.json(appointments)
  })

  // cancel an appointment
  app.put("/appointment/cancel/:id", isAuthenticated, async (req, res) => {
    const name = req.user.username
    const appointment = await Appointment.findOne({ _id: req.params.id })
    if (!appointment.registrant.includes(name)) {
      res.status(400).send("You are not registered to this appointment.")
    }
    appointment.registrant.splice(appointment.registrant.indexOf(name), 1)
    appointment.save()
    res.json({ message: "Cancelled!" })
  })
}
