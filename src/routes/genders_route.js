const gendersController = require("../controllers/genders_controller");
const express = require("express");

const router = express.Router();

router.get("/genders", gendersController.getAllGenders);

router.get("/gender/:id", gendersController.getGenderById);

module.exports = router;
