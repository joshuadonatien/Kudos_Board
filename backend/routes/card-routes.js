const express = require('express')
const router = express.Router()
const controller = require("../controllers/card-controller.js")

//get all cards
router.get("/", controller.getAllCards)

//get one card by id
router.get("/:card_id", controller.getCardById)

//create a card
router.post("/", controller.createCard)

//update existing card
router.put("/:card_id", controller.updateCard)

//delete a card
router.delete("/:card_id", controller.deleteCard)

module.exports = router