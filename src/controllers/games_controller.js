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
        gender: true,
        pegi: true,
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
        gender: true,
        pegi: true,
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

const getAllVignettes = async (req, res) => {
  try {
    const vignettes = await prisma.gameVignettes.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        game: true,
      },
    });
    res.status(200).json(vignettes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vignettes" });
  }
};

const getVignetteById = async (req, res) => {
  try {
    const vignette = await prisma.gameVignettes.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        game: true,
      },
    });
    res.status(200).json(vignette);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vignette with your id" });
  }
};

module.exports = {
  getAllGames,
  getGameById,
  getAllImages,
  getImageById,
  getAllVignettes,
  getVignetteById,
};
