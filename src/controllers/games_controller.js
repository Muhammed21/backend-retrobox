const prisma = require("../db/prisma");
const { getEmailContent } = require("../lib/template/emailTemplate");

const getAllGames = async (req, res) => {
  try {
    const games = await prisma.game.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        images: true,
      },
    });
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch game" });
  }
};

const getGameById = async (req, res) => {
  try {
    const game = await prisma.game.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        images: true,
      },
    });
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch game with your id" });
  }
};

const getAllImages = async (req, res) => {
  try {
    const images = await prisma.gameImage.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        game: true,
      },
    });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch games images" });
  }
};

const getImageById = async (req, res) => {
  try {
    const image = await prisma.gameImage.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        game: true,
      },
    });
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch image with your id" });
  }
};

module.exports = {
  getAllGames,
  getGameById,
  getAllImages,
  getImageById,
};
