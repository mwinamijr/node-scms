const { model } = require("mongoose")

mongoose = require("mongoose")

const studentSchema = new mongoose.Schema(
  {
    addmissionNumber: { type: Number, unique: true },
    firstName: { type: String, lowercase: true },
    middleName: { type: String, lowercase: true },
    lastName: { type: String, lowercase: true },
    gender: {type: String, lowercase:true },
    birthday: { type: Date },
    parentContact: { type: String, match: /^[0-9]{10}$/ },
    premsNumber: { type: String },
    stdViiNumber: { type: String },
    region: { type: String, lowercase: true },
    city: { type: String, lowercase: true },
    street: { type: String, lowercase: true },
  },
  { timestamps: true}
)

module.exports = monngoose.model("student", studentSchema)