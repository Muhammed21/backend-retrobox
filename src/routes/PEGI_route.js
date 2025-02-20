const pegiController = require("../controllers/PEGI_controller");
const express = require("express");

const router = express.Router();

router.get("/PEGIS", pegiController.getAllPEGI);

router.get("/PEGI/:id", pegiController.getPEGIById);

module.exports = router;
