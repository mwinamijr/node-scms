require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const app = express()

const userRoute = require("./routes/userRoutes")

app.use(express.json())

//routes to handle requests
app.use("/users", userRoute)

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