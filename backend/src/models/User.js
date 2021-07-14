const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
  first_name: String,
  last_name: String,
  age: Number,
  email: String,
  username: String,
  password: String,
  isAdmin: Boolean,
  created_at: {
    type: Date,
    default: Date.now(),
  },
})

const User = mongoose.model("User", UserSchema)

module.exports = User
