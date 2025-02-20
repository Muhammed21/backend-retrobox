const prisma = require("../db/prisma");

const getAllGenders = async (req, res) => {
  try {
    const genders = await prisma.gender.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        game: true,
      },
    });
    res.status(200).json(genders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch genders" });
  }
};

const getGenderById = async (req, res) => {
  try {
    const gender = await prisma.gender.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        game: true,
      },
    });
    res.status(200).json(gender);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gender with your id" });
  }
};

module.exports = {
  getAllGenders,
  getGenderById,
};
