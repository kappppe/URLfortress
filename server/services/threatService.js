async function fetchThreatInfo() {
    const apiKey = process.env.pulseApiKey;
    const baseURL = "https://pulsedive.com/api/info.php";
    const indicator = "zeus";
    const pretty = "1";
    const queryString = `${baseURL}?threat=${indicator}&pretty=${pretty}&key=${apiKey}`;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };
    const response = await fetch(queryString, options);
    const responseBody = await response.json();

    const wikisummary = responseBody.wikisummary;
    console.log(`Wiki Summary: ${wikisummary}`);
    return wikisummary;
  }
  
  module.exports = {
    fetchThreatInfo,
  };
  