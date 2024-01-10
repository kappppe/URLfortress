async function fetchAbuse(params) {
  try {
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
    if (!response.ok) {
      throw new Error(
        `Failed to fetch abuse information. Status: ${response.status}`
      );
    }

    const jsonBody = await response.json();
    const clientResponseBody = {
      ip: jsonBody.data.ipAddress ?? "N/A",
      ipVersion: jsonBody.data.ipVersion ?? "N/A",
      score: jsonBody.data.abuseConfidenceScore ?? "N/A",
      usage: jsonBody.data.usageType ?? "N/A",
      totalReports: jsonBody.data.totalReports ?? "N/A",
      isp: jsonBody.data.isp ?? "N/A",
      domain: jsonBody.data.domain ?? "N/A",
      whiteList: jsonBody.data.isWhitelisted ?? "N/A",
    };
    return clientResponseBody;
  } catch (error) {
    console.error("Error in fetchAbuse service:", error);
    throw error;
  }
}

module.exports = {
  fetchAbuse,
};
