async function fetchIpCoordinates(domain) {
  try {
    baseURL = "http://ip-api.com/json/";
    query = domain;
    queryString = `${baseURL}${query}`;
    options = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };
    response = await fetch(queryString, options);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch ipApi information. Status: ${response.status}`
      );
    }
    responseBody = await response.json();
    const clientResponseBody = {
      country: responseBody.country ?? "N/A",
      countryCode: responseBody.countryCode ?? "N/A",
      city: responseBody.city ?? "N/A",
      zip: responseBody.zip ?? "N/A",
      lat: responseBody.lat ?? "N/A",
      long: responseBody.lon ?? "N/A",
    };
    return clientResponseBody;
  } catch (error) {
    console.error("Error in ipApi service:", error);
    throw error;
  }
}

module.exports = {
  fetchIpCoordinates,
};
