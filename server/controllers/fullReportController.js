const { fetchHostIo } = require("../services/hostioService");
const { fetchPulseDive } = require("../services/pulsediveService");
const { fetchAbuse } = require("../services/abuseipdbService");
const { checkToResolve } = require("./clientInputController");
const { fetchIpCoordinates } = require("../services/ipApiService");

async function fetchFullReport(req, res) {
  const params = req.param("query");
  console.log(params + " hej");
  const resolvedResult = await checkToResolve(params);
  console.log(resolvedResult);

  let response = {};

  if (resolvedResult !== true) {
    response.hostIoResult = await fetchHostIo(params);
    response.pulseDiveResult = await fetchPulseDive(resolvedResult);
    response.abuseResult = await fetchAbuse(resolvedResult);
    response.ipApiResult = await fetchIpCoordinates(resolvedResult);

    console.log(`Resolved result: ${resolvedResult}`);
  } else if (resolvedResult !== false) {
    const hostIoResult = await fetchHostIo(params);
  }
  console.log(response.abuseResult);
  console.log(response.pulseDiveResult);
  console.log(response.ipApiResult);
  console.log(response.hostIoResult);

  res.send(response);
}
module.exports = {
  fetchFullReport,
};
