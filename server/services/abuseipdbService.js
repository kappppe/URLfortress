async function fetchAbuse(params) {
  const apiKey = process.env.abuseApiKey;
  const baseURL = "https://api.abuseipdb.com/api/v2/check";
  const ipAddress = params;
  const maxAgeInDays = "90";
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Key: apiKey,
    },
  };
  const queryString = `${baseURL}?ipAddress=${ipAddress}&maxAgeInDays=${maxAgeInDays}`;

  const response = await fetch(queryString, options);
  const jsonBody = await response.json();
  // Testing custom response body for client
  const clientResponseBody = {
    ip: jsonBody.data.ipAddress || "N/A",
    whiteList: jsonBody.data.isWhiteListed || "N/A",
    // Checks explicitly for null and 0 and returns correct value"
    score: (jsonBody.data.abuseConfidenceScore === null) ? "N/A" : (jsonBody.data.abuseConfidenceScore === 0 ? 0 : jsonBody.data.abuseConfidenceScore),
    usage: jsonBody.data.usageType || "N/A",
    isp: jsonBody.data.isp || "N/A",
    domain: jsonBody.data.domain || "N/A",
  };

  // console.log(clientResponseBody);
  return clientResponseBody;
}

module.exports = {
  fetchAbuse,
};
