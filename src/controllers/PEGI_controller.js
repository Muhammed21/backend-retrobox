const prisma = require("../db/prisma");

const getAllPEGI = async (req, res) => {
  try {
    const PEGIS = await prisma.pEGI.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        game: true,
      },
    });
    res.status(200).json(PEGIS);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch PEGI'S" });
  }
};

const getPEGIById = async (req, res) => {
  try {
    const PEGI = await prisma.pEGI.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        game: true,
      },
    });
    res.status(200).json(PEGI);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch PEGI with your id" });
  }
};

module.exports = {
  getAllPEGI,
  getPEGIById,
};
