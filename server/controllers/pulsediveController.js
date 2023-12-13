const { pulseDiveQuery } = require("../services/pulsediveService");

async function getFetchResult(req, res) {
  const result = await pulseDiveQuery();
  res.send({ result });
}

module.exports = {
  getFetchResult,
};
