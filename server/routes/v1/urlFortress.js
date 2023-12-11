const express = require("express");
const router = express.Router();
const abuseScoreController = require("../../controllers/abuseipdbController");

router.get("/abusescore", abuseScoreController.getAbuseScore);

module.exports = router;
