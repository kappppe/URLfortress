async function fetchAbuse() {
  const apiKey = process.env.abuseApiKey;
  const baseURL = "https://api.abuseipdb.com/api/v2/check";
  const ipAddress = "43.154.151.93";
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
  console.log(jsonBody.data.ipAddress);
  // Testing custom response body for client
  const clientResponseBody = {
    ip: jsonBody.data.ipAddress,
  };
  console.log(clientResponseBody);
  return jsonBody;
}

module.exports = {
  fetchAbuse,
};
