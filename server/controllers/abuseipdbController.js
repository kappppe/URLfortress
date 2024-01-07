const { fetchAbuse } = require("../services/abuseipdbService");

async function getAbuseScore(req, res) {
  const result = await fetchAbuse();
  res.send({ result });

}

module.exports = {
  getAbuseScore,
};

