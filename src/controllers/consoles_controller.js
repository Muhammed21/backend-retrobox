const prisma = require("../db/prisma");

const getAllConsoles = async (req, res) => {
  // API - All consoles
  try {
    const consoles = await prisma.console.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        images: true,
      },
    });
    res.status(200).json(consoles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch consoles" });
  }
};

const getConsolesById = async (req, res) => {
  // API - Console with your id
  try {
    const console = await prisma.console.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        images: true,
      },
    });
    res.status(200).json(console);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch console with your id" });
  }
};

const getAllImages = async (req, res) => {
  // API - All consoles images
  try {
    const images = await prisma.consoleImage.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        console: true,
      },
    });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch consoles images" });
  }
};

const getImageById = async (req, res) => {
  // API - Console image with your id
  try {
    const image = await prisma.consoleImage.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        console: true,
      },
    });
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch image with your id" });
  }
};

module.exports = {
  getAllConsoles,
  getConsolesById,
  getAllImages,
  getImageById,
};
