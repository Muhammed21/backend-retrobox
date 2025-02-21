const gamesController = require("../../controllers/games_controller");
const express = require("express");

const router = express.Router();

router.get("/games", gamesController.getAllGames);

router.get("/game/:id", gamesController.getGameById);

router.get("/games/images", gamesController.getAllImages);

router.get("/games/image/:id", gamesController.getImageById);

module.exports = router;
