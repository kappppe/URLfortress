const { abuseQuery } = require("../services/abuseipdbService");

async function getAbuseScore(req, res) {
  const result = await abuseQuery();
  console.log(result);
}
module.exports = {
  getAbuseScore,
};

// const apiKey = process.env.abuseApiKey;
// const baseURL = "https://api.abuseipdb.com/api/v2/check";
// const ipAddress = "43.154.151.93";
// const maxAgeInDays = "90";
// const options = {
//   method: "GET",
//   headers: {
//     Accept: "application/json",
//     Key: apiKey,
//   },
// };
// const query = `${baseURL}?ipAddress=${ipAddress}&maxAgeInDays=${maxAgeInDays}`;

// const response = await fetch(query, options);
// const jsonBody = await response.json();
// console.log(jsonBody);
