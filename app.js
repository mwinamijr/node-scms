require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const app = express()
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoute = require("./routes/userRoutes")
const studentRoute = require("./routes/studentRoutes")
const schoolRoute = require("./routes/schoolRoutes")
const financeRoute = require("./routes/financeRoutes")
const notificationRoute = require("./routes/notificationRoutes")

app.use(express.json())
app.use(bodyParser.json());
app.use(cors());

//routes to handle requests
app.use("/api/users", userRoute)
app.use("/api/students", studentRoute)
app.use("/api/school", schoolRoute)
app.use("/api/finance", financeRoute)
app.use("/api/notification", notificationRoute)

//handle error requests
app.get("/", (req, res) => {
  res.send('API IS NOW WORKING, append "/docs" to the current url to access API documentation')
})

app.use((req, res, next) => {
  const error = new Error()
  error.message = "Not Found"
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ error: error})
})

module.exports = app