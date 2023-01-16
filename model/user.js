const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
  empId: { type: String, default: null, lowercase: true },
  firstName: { type: String, default: null, lowercase: true },
  lastName: { type: String, default: null, lowercase: true },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  phone: { type: String, match: /^[0-9]{10}$/ },
  salary: {type: Number, default: 200000 },
  isAdmin: { type: Boolean },
  isAccountant: { type: Boolean },
  isTeacher: { type: Boolean },
  },
  { timestamps: true}
);

module.exports = mongoose.model("User", userSchema)