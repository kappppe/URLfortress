const { fetchHostIo } = require("../services/hostioService");
const { fetchPulseDive } = require("../services/pulsediveService");
const { fetchAbuse } = require("../services/abuseipdbService");
const { checkToResolve } = require("./clientInputController");
const { fetchIpCoordinates } = require("../services/ipApiService");

async function fetchFullReport(req, res) {
  try {
    const params = req.param("query");
    const resolvedResult = await checkToResolve(params);
    console.log(resolvedResult);
    let response = {};

    if (resolvedResult === false) {
      response.pulseDiveResult = await fetchPulseDive(params);
      response.abuseResult = await fetchAbuse(params);
      response.ipApiResult = await fetchIpCoordinates(params);
      console.log(resolvedResult);
    } else if (resolvedResult !== null) {
      response.hostIoResult = await fetchHostIo(params);
      response.pulseDiveResult = await fetchPulseDive(resolvedResult);
      response.abuseResult = await fetchAbuse(resolvedResult);
      response.ipApiResult = await fetchIpCoordinates(resolvedResult);
    } else {
      // res.status(400).json({ error: "Please enter a valid domain/ip" });
      throw new Error(`invalid input`);
    }

    // console.log("resolvedResult:", resolvedResult);
    // res.send(response)
    res.status(200).json(response);
  } catch (error) {
    // Needs fixing so that it responds with same error for invalid domain name
    if (error && error.message && error.message.includes("invalid input")) {
      res.status(400).json({ error: "Please enter a valid domain/ip" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = {
  fetchFullReport,
};
