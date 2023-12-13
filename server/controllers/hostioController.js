const { fetchHostIo } = require("../services/hostioService");

async function getHostIoScore(req, res) {
  response = await fetchHostIo();
  res.send({ response });
}

module.exports = {
  getHostIoScore,
};
