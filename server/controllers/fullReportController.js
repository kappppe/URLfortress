const { fetchHostIo } = require("../services/hostioService");
const { fetchPulseDive } = require("../services/pulsediveService");
const { fetchAbuse } = require("../services/abuseipdbService");
const { checkToResolve } = require("./clientInputController");
const { fetchIpCoordinates } = require("../services/ipApiService");

async function fetchFullReport(req, res) {
  try {
    const params = req.param("query");
    const resolvedResult = await checkToResolve(params);
    const response = {};

    if (resolvedResult === false) {
      response.pulseDiveResult = await fetchPulseDive(params);
      response.abuseResult = await fetchAbuse(params);
      response.ipApiResult = await fetchIpCoordinates(params);
    } else if (resolvedResult !== null) {
      response.hostIoResult = await fetchHostIo(params);
      response.pulseDiveResult = await fetchPulseDive(resolvedResult);
      response.abuseResult = await fetchAbuse(resolvedResult);
      response.ipApiResult = await fetchIpCoordinates(resolvedResult);
    } else {
      throw new Error(`invalid input`);
    }

    res.status(200).json(response);
  } catch (error) {
    if (error && error.message && error.message.includes("invalid input")) {
      res.status(400).json({ error: "Please enter a valid domain/ip" });
    } else {
      // Must pick another more relevant status code!
      res.status(500).json({ error: "Domain/IP-address not found." });
    }
  }
}

module.exports = {
  fetchFullReport,
};
