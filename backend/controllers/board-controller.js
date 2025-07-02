const prisma = require("../models/prisma-client");

//grabbing all of the boards
exports.getAllBoards = async(req, res) => {
    let boards = await prisma.board.findMany()
    res.json(boards)
}

//grabbing a specific board
exports.getBoardById = async (req, res) => {
  const board_id = Number(req.params.board_id);
  const board = await prisma.board.findUnique({ where: { board_id } });

  if (!board) {
    return res.status(404).json({ error: "not found" });
  }

  res.json(board);
};

//creating a new board
exports.createBoard = async (req, res) => {
  const { title, image_url, category, author } = req.body;
  const newBoard = await prisma.board.create({
    data: {
      title,
      image_url,
      category,
      author,
    },
  });

  res.status(201).json(newBoard);
};

exports.updateBoard = async (req, res) => {
  const board_id = Number(req.params.board_id);

  const { title, image_url, category, author } = req.body;
  const updatedBoard = await prisma.board.update({
    where: { board_id },
    data: { title, image_url, category, author },
  });

  res.json(updatedBoard);
};

exports.deleteBoard = async (req,res) => {
    const id = Number(req.params.board_id)

    await prisma.board.delete({where:{board_id: id}})
    res.status(204).end()
}

exports.getCardsByBoard = async (req, res) => {
    const board_id = Number(req.params.board_id)

    try {
        const cards = await prisma.card.findMany( {where: {board_id}})
        res.json(cards)
    } catch (error) {
        res.status(500).json({error: "Failed to get the cards for the board."})
    }
}

exports.createCardForBoard = async (req, res) => {
    const board_id = Number(req.params.board_id);
    const { title, description, gif_url, upvotes, owner } = req.body;

    try {
        const newCard = await prisma.card.create({
            data: {
                title,
                description,
                gif_url,
                upvotes,
                owner,
                board_id
            },
        });
        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ error: "Failed to create card for this board." });
    }
}
