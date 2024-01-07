async function fetchPulseDive(params) {
  try {
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

    if (!response.ok) {
      console.error(
        `Failed to fetch pulsedive information. Status: ${response.status}`
      );
    }

    const responseBody = await response.json();

    //console.log('PULSE PULSE PULSE PULSE PULSE PULSE PULSE PULSE PULSE PULSE :', responseBody.threats.name);

    console.log("PULSE PULSE PULSE");
    if (responseBody.threats && responseBody.threats.length > 0) {
      // Access the name of the first threat in the array
      const threatName = responseBody.threats[0].name;
      console.log('Threat Name:', threatName);
    } else {
      console.log('No threats found in the response.');
    }

    const clientResponseBody = {
      risk: responseBody.risk ?? "N/A",
      riskRecommended: responseBody.risk_recommended ?? "N/A",
      riskFactors: responseBody.riskfactors ?? "N/A",
      threats: responseBody.threats ?? "N/A",
      port: responseBody.port ?? "N/A",
      protocol: responseBody.protocol ?? "N/A",
    };

    return clientResponseBody;
  } catch (error) {
    console.error("Error in pulsedive service:", error);
    return null;
  }
}
module.exports = {
  fetchPulseDive,
};
