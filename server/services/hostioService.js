async function fetchHostIo(params) {
  try {
    const apiKey = process.env.hostioApiKey;
    const baseURL = "https://host.io/api/web/";
    const domain = params;
    const queryString = `${baseURL}${domain}?token=${apiKey}`;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };
    const response = await fetch(queryString, options);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch hostio information. Status: ${response.status}`
      );
    }
    const responseBody = await response.json();
    const clientResponseBody = {
      rank: responseBody.rank ?? "N/A",
      facebook: responseBody.facebook ?? "N/A",
      twitter: responseBody.twitter ?? "N/A",
      instagram: responseBody.instagram ?? "N/A",
      description: responseBody.description ?? "N/A",
    };
    return clientResponseBody;
  } catch (error) {
    console.error("Error in fetchHostIo service:", error);
    throw error;
  }
}

module.exports = {
  fetchHostIo,
};
