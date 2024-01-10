async function fetchThreatInfo(indicator) {
  try{
    const apiKey = process.env.pulseApiKey;
    const baseURL = "https://pulsedive.com/api/info.php";
    const pretty = "1";
    const queryString = `${baseURL}?threat=${indicator}&pretty=${pretty}&key=${apiKey}`;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };
    const response = await fetch(queryString, options);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch further threat information. Status: ${response.status}`
      );
    }
    const responseBody = await response.json();
    
    const wikisummary = responseBody.wikisummary;
    return wikisummary;
  } catch (error) {
    console.error("Error in pulsedive service:", error);
    throw error;
  }
}

module.exports = {
  fetchThreatInfo,
};
