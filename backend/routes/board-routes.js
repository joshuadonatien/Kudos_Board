const express = require ('express')
const router = express.Router()
const controller = require("../controllers/board-controller.js")

//get all of the boards
router.get("/", controller.getAllBoards)

//get a specific board
router.get("/:board_id", controller.getBoardById)

//create a new board
router.post("/", controller.createBoard)

//update an existing board
router.put("/:board_id", controller.updateBoard)

// delete a board
router.delete("/:board_id", controller.deleteBoard)

module.exports = router