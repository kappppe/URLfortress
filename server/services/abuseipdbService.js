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
    // Will return "N/A if score is 0 (must fix)"
    score: jsonBody.data.abuseConfidenceScore || "N/A",
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
