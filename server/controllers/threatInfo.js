const { fetchThreatInfo } = require("../services/threatService");

async function getThreatScore(req, res) {
  const result = await fetchThreatInfo();
  res.send({ result });
}

module.exports = {
  getThreatScore,
};
