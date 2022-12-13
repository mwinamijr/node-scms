const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
  firstName: { type: String, default: null, lowercase: true },
  lastName: { type: String, default: null, lowercase: true },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  phone: { type: String, match: /^[0-9]{10}$/ },
  isAdmin: { type: Boolean },
  isAccountant: { type: Boolean },
  isTeacher: { type: Boolean },
  },
  { timestamps: true}
);

module.exports = mongoose.model("User", userSchema)