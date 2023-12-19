const { fetchIpCoordinates } = require("../services/ipApiService");

async function getIpCoordinates(req, res) {
  response = await fetchIpCoordinates();
  res.send(response);
}

module.exports = {
  getIpCoordinates,
};
