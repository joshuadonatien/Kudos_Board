require("dotenv").config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const boardRoutes = require("../routes/board-routes.js")
const cardRoutes = require("../routes/card-routes.js")

const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
  
};

app.use(cors(corsOptions));


app.get('/', (req, res) => {
    res.send("We are in the kudos board website")
})

app.use(express.json())
app.use("/boards", boardRoutes)
app.use("/cards", cardRoutes)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))