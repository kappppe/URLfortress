const express = require("express");
const router = express.Router();

const abuseScoreController = require("../../controllers/abuseipdbController");
const pulsediveController = require("../..//controllers/pulsediveController");
const hostioController = require("../../controllers/hostioController");

router.get("/abusescore", abuseScoreController.getAbuseScore);
router.get("/pulsedivescore", pulsediveController.getPulseDiveScore);
router.get("/hostio", hostioController.getHostIoScore);

module.exports = router;
