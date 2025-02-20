const consolesController = require("../controllers/consoles_controller");
const express = require("express");

const router = express.Router();

router.get("/consoles", consolesController.getAllConsoles);

router.get("/console/:id", consolesController.getConsolesById);

router.get("/consoles/images", consolesController.getAllImages);

router.get("/consoles/image/:id", consolesController.getImageById);

module.exports = router;
