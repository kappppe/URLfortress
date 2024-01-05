async function fetchPulseDive(params) {
  const apiKey = process.env.pulseApiKey;
  const baseURL = "https://pulsedive.com/api/info.php";
  const indicator = params;
  const pretty = "1";
  const queryString = `${baseURL}?indicator=${indicator}&pretty=${pretty}&key=${apiKey}`;
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };
  const response = await fetch(queryString, options);
  const responseBody = await response.json();
  console.log(responseBody);
  const clientResponseBody = {
    risk: responseBody.risk || "N/A",
    riskRecommended: responseBody.risk_recommended || "N/A",
    riskFactors: responseBody.riskfactors || "N/A",
    threats: responseBody.threats || "N/A",
    // port: responseBody.attributes.port || "N/A",
    protocol: responseBody.attributes.protocol || "N/A",
  };
  return clientResponseBody;
}

module.exports = {
  fetchPulseDive,
};
