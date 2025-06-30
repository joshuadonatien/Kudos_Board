require("dotenv").config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const boardRoutes = require("../routes/board-routes.js")


app.get('/', (req, res) => {
    res.send("We are in the kudos board website")
})

app.use(express.json())
app.use("/boards", boardRoutes)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))