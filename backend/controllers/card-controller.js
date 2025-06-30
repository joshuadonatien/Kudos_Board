const prisma = require("../models/prisma-client")

//getting all of the cards
exports.getAllCards = async (req, res) => {
    let cards = await prisma.card.findMany() 
    res.json(cards)
}

//getting a card by id
exports.getCardById = async (req, res) => {
    const card_id = Number(req.params.card_id)
    const card = await prisma.card.findUnique({where: {card_id}})

    if(!card) {
        return res.status(404).json({error: "not found"})
    }

    res.json(card)
}

//create a new board
exports.createCard = async (req, res) => {
    const {title, description, gif_url, upvotes, owner} = req.body
    const newCard = await prisma.card.create({
        data: {
            title,
            description,
            gif_url,
            upvotes,
            owner
        }
    })

    res.status(201).json(newCard)
}

exports.updateCard = async (req, res) => {
    const card_id = Number(req.params.card_id)

    const {title, description, gif_url, upvotes, owner} = req.body
    const updatedCard = await prisma.card.update ({
        where:{card_id},
        data:{title, description, gif_url, upvotes, owner}
    })

    res.json(updatedCard)
}

exports.deleteCard = async (req, res) => {
    const id = Number(req.params.card_id)

    await prisma.card.delete({where: {card_id: id}})
    res.status(204).end()
}

