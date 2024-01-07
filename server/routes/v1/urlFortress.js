const express = require("express");
const router = express.Router();

const abuseScoreController = require("../../controllers/abuseipdbController");
const pulsediveController = require("../..//controllers/pulsediveController");
const hostioController = require("../../controllers/hostioController");
const ipApiController = require("../../controllers/ipApiController");
const fullReportController = require("../../controllers/fullReportController");
const threatInfo = require("../../controllers/threatInfo");

router.get("/abusescore", abuseScoreController.getAbuseScore);
router.get("/pulsedivescore", pulsediveController.getPulseDiveScore);
router.get("/hostio", hostioController.getHostIoScore);
router.get("/fullreport", fullReportController.fetchFullReport);
router.get("/ip-api", ipApiController.getIpCoordinates);
router.get("/threatinfo", threatInfo.getThreatScore);

module.exports = router;
