const { fetchPulseDive } = require("../services/pulsediveService");

async function getPulseDiveScore(req, res) {
  const params = req.param("query");
  console.log(params);
  const result = await fetchPulseDive(params);
  res.send({ result });
}

module.exports = {
  getPulseDiveScore,
};
