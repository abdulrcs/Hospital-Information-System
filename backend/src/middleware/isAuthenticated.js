const jwt = require("jsonwebtoken")

// IsAuthenticated Middleware
module.exports = async function isAuthenticated(req, res, next) {
  // "Bearer <token>".split(" ")
  // Becomes -> ["Bearer", "<token>"]
  if (!req.headers["authorization"])
    return res.json({ message: "Unauthorized" })
  const token = req.headers["authorization"].split(" ")[1]

  jwt.verify(token, "secret", (err, user) => {
    if (!user) {
      return res.json({ message: "Unauthorized" })
    } else {
      req.user = user
      next()
    }
  })
}
