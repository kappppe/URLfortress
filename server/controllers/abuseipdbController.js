
const {abuseQuery} = require("../services/abuseipdbService")

async function getAbuseScore(req, res) { 
  const result = await abuseQuery()
  res.send({ result })
}
module.exports = {
  getAbuseScore,
};



