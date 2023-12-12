const { fetchHostIo } = require("../services/hostioService");

async function getHostIoData(req, res) {
  response = await fetchHostIo();
  res.send({ response });
}

module.exports = {
  getHostIoData,
};
