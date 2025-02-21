const emailController = require("../../controllers/email_controller");
const express = require("express");

const router = express.Router();

router.post("/test-mail", emailController.testEmailRoute);

module.exports = router;
