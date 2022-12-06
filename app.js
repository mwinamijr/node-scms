require("dotenv").config();
require("./config/database").connect();

const express = require("express")

const app = express()

app.use(express.json())

// Logic goes here
const User = require("./model/user")

//Register
app.post("/register", (req, res) => {
    //our register logic goes here
})

//Login
app.post("/login", (req, res) => {
    //our register logic goes here
})

module.exports = app