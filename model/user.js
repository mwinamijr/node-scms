const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    isAdmin: { type: Boolean, default: false },
    token: { type: String },
});

module.exports = mongoose.model("user", userSchema)