const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 7070

app.use(express.json())
app.use(cors({ credentials: true, origin: true }))

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Hospital DB connected`)
  }
)

require("./controllers/auth.controller")(app)
require("./controllers/patient.controller")(app)
require("./controllers/admin.controller")(app)

app.listen(PORT, () => {
  console.log(`Hospital at ${PORT}`)
})
