const jwt = require("jsonwebtoken")
const User = require("../models/User")

// IsAdmin Middleware
module.exports = async function isAdmin(req, res, next) {
  // "Bearer <token>".split(" ")
  // Becomes -> ["Bearer", "<token>"]
  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1]
    jwt.verify(token, "secret", async (err, user) => {
      if (!user) return res.json({ message: "Unauthorized" })
      const userData = await User.findOne({ _id: user.id })
      if (userData.isAdmin) {
        req.user = user
        next()
      } else {
        return res.json({ message: "Unauthorized" })
      }
    })
  } else {
    return res.json({ message: "Unauthorized" })
  }
}
