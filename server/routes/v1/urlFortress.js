const express = require("express");
const router = express.Router();

const fullReportController = require("../../controllers/fullReportController");
const threatInfo = require("../../controllers/threatInfo");

router.get("/fullreport", fullReportController.fetchFullReport);
router.get("/threatinfo", threatInfo.getThreatScore);

module.exports = router;
