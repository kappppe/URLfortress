const express = require("express");
const router = express.Router();

const fullReportController = require("../../controllers/fullReportController");

router.get("/fullreport", fullReportController.fetchFullReport);

module.exports = router;
