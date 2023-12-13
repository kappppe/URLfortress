const { fetchPulseDive } = require("../services/pulsediveService");

async function getPulseDiveScore(req, res) {
  const result = await fetchPulseDive();
  res.send({ result });
}

module.exports = {
  getPulseDiveScore,
};
