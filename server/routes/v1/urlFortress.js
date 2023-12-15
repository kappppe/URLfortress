const express = require("express");
const router = express.Router();

const abuseScoreController = require("../../controllers/abuseipdbController");
const pulsediveController = require("../..//controllers/pulsediveController");
const hostioController = require("../../controllers/hostioController");
const threatInfo = require("../../controllers/threatInfo"); //threat info from pulsedive
const fullReportController = require("../../controllers/fullReportController");

router.get("/abusescore", abuseScoreController.getAbuseScore);
router.get("/pulsedivescore", pulsediveController.getPulseDiveScore);
router.get("/hostio", hostioController.getHostIoScore);
router.get("/threatinfo", threatInfo.getThreatScore); //threat info from pulsedive
router.get("/fullreport", fullReportController.fetchFullReport);

module.exports = router;
