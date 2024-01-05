const express = require("express");
const router = express.Router();

const mapController = require("../../controllers/mapController");
const abuseScoreController = require("../../controllers/abuseipdbController");
const pulsediveController = require("../..//controllers/pulsediveController");
const hostioController = require("../../controllers/hostioController");
const threatInfo = require("../../controllers/threatInfo"); //threat info from pulsedive
const ipApiController = require("../../controllers/ipApiController");
const fullReportController = require("../../controllers/fullReportController");

router.get("/map", mapController.getMapScore);
router.get("/abusescore", abuseScoreController.getAbuseScore);
router.get("/pulsedivescore", pulsediveController.getPulseDiveScore);
router.get("/hostio", hostioController.getHostIoScore);
router.get("/threatinfo", threatInfo.getThreatScore); //threat info from pulsedive
router.get("/fullreport", fullReportController.fetchFullReport);
router.get("/ip-api", ipApiController.getIpCoordinates);

module.exports = router;
