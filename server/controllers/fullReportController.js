const { fetchHostIo } = require("../services/hostioService");
const { fetchPulseDive } = require("../services/pulsediveService");

async function fetchFullReport(req, res) {
  const params = req.param("query");
  const hostIoResult = await fetchHostIo(params);
  const pulseDiveResult = await fetchPulseDive(params);
  console.log(hostIoResult);
  //   console.log(pulseDiveResult);
}
module.exports = {
  fetchFullReport,
};
