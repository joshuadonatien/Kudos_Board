const prisma= require("../models/prisma-client")

//grabbing all of the boards
exports.getAllBoards = async(req, res) => {
    let boards = await prisma.board.findMany()
    res.json(boards)
}

//grabbing a specific board
exports.getBoardById = async (req, res) => {
    const id = Number(req.params.board_id)
    const board = await prisma.board.findUnique({where: {id}})

    if(!board) {
        return res.status(404).json({error:"not found"})
    }

    res.json(board)
}

//creating a new board
exports.createBoard = async (req, res) => {
    const {title, image_url, category, author} = req.body
    const newBoard = await prisma.board.create({
        data: {
            title,
            image_url,
            category,
            author
        }
    })

    res.status(201).json(newBoard)
}

exports.updateBoard = async (req, res) => {
    const board_id = Number(req.params.board_id)

    const {title, image_url, category, author} = req.body
    const updatedBoard = await prisma.board.update ({
        where: {board_id},
        data: {title, image_url, category, author}
    })

    res.json(updatedBoard)
}

exports.deleteBoard = async (req,res) => {
    const id = Number(req.params.board_id)

    await prisma.board.delete({where:{id: id}})
    res.status(204).end()
}

