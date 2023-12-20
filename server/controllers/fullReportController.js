const { fetchHostIo } = require("../services/hostioService");
const { fetchPulseDive } = require("../services/pulsediveService");
const { fetchAbuse } = require("../services/abuseipdbService");
const { checkToResolve } = require("./clientInputController");

async function fetchFullReport(req, res) {
  const params = req.param("query");
  const resolvedResult = await checkToResolve(params);
  console.log(resolvedResult);

  if (resolvedResult !== true) {
    const hostIoResult = await fetchHostIo(params);
    const pulseDiveResult = await fetchPulseDive(resolvedResult);
    const abuseResult = await fetchAbuse(resolvedResult);
    console.log(abuseResult);
    console.log(pulseDiveResult);
    console.log(hostIoResult);
    console.log(`Resolved result: ${resolvedResult}`);
  } else if (resolvedResult !== false) {
    const hostIoResult = await fetchHostIo(params);
  }
}
module.exports = {
  fetchFullReport,
};
