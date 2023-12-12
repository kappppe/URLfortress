
const {abuseQuery} = require("../services/abuseipdbService")

async function getAbuseScore(req, res) { 
  const result = await abuseQuery()
  res.result
}
module.exports = {
  getAbuseScore,
};



