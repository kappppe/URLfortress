const { fetchHostIo } = require("../services/hostioService");
const { fetchPulseDive } = require("../services/pulsediveService");
const { fetchAbuse } = require("../services/abuseipdbService");
const { checkToResolve } = require("./clientInputController");
const { fetchIpCoordinates } = require("../services/ipApiService");

async function fetchFullReport(req, res) {
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
  }

  res.send(response);
}
module.exports = {
  fetchFullReport,
};
