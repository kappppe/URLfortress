const { abuseQuery } = require("../services/pulsediveService");

async function getFetchResult(req, res) {
  const result = await abuseQuery();
  res.send({ result });
}

module.exports = {
  getFetchResult,
};
