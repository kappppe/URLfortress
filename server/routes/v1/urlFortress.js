const express = require("express");
const router = express.Router();

const abuseScoreController = require("../../controllers/abuseipdbController");
const pulsediveController = require("../..//controllers/pulsediveController");
const hostioController = require("../../controllers/hostioController");

router.get("/abusescore", abuseScoreController.getAbuseScore);
router.get("/pulsedivescore", pulsediveController.getFetchResult);
router.get("/hostio", hostioController.getHostIoData);

module.exports = router;
