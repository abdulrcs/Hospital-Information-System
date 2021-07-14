const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/User")

module.exports = function (app) {
  // Login
  app.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ message: "User doesn't exist" })
    } else {
      // check if password is incorrect
      if (!await bcrypt.compare(password, user.password)) {
        return res.json({ message: "Password Incorrect" })
      }

      // create jwt token
      const payload = {
        id: user._id,
        email: user.email,
        username: user.username,
        name: user.first_name + " " + user.last_name,
      }
      jwt.sign(payload, "secret", (err, token) => {
        if (err) console.log(err)
        else
          return res.json({
            id: user._id,
            name: user.first_name + " " + user.last_name,
            username: user.username,
            token: token,
            isAdmin: user.isAdmin,
          })
      })
    }
  })

  // Register
  app.post("/register", async (req, res) => {
    const { first_name, last_name, age, email, username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const userExist = await User.findOne({ email })

    if (userExist) {
      return res.json({ message: "User already exists" })
    } else {
      const newUser = new User({
        first_name,
        last_name,
        age,
        email,
        username,
        password: hashedPassword,
      })
      newUser.save()
      return res.json(newUser)
    }
  })
}
