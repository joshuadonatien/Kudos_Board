require("dotenv").config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const boardRoutes = require("../routes/board-routes.js")

app.use(express.json())
app.use("/boards", boardRoutes)

app.listen(prototype, () => console.log(`Server running on port ${PORT}`))