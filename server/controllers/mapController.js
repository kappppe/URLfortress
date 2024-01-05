const { fetchMap } = require("../services/mapService");

async function getMapScore(req, res) {
  const params = req.param("query");
  console.log(params);
  const result = await fetchPulseDive(params);
  res.send({ result });
}

module.exports = {
  getMapScore,
};
