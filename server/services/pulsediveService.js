const { fetchThreatInfo } = require("../services/threatService");
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
    let wikiSummary = "N/A";
    let threatName = "N/A";

    if (
      response.ok &&
      responseBody.threats &&
      responseBody.threats.length > 0
    ) {
      threatName = responseBody.threats[0].name; //get first threat (if any)

      wikiSummary = await fetchThreatInfo(threatName);
      console.log("Wiki Summary:", wikiSummary);
    } else {
      console.log("No threats found in the response.");
    }

    const protocols = responseBody.attributes?.protocol ?? "N/A";
    const technology = responseBody.attributes?.technology ?? "N/A";
    const description =
      responseBody.riskfactors
        ?.map((factor) => factor.description)
        .join(", ") ?? "N/A";

    const clientResponseBody = {
      domain: responseBody.properties?.ssl?.domain ?? "N/A",
      address: responseBody.properties?.geo?.address ?? "N/A",
      risk: responseBody.risk ?? "N/A",
      riskRecommended: responseBody.risk_recommended ?? "N/A",
      riskFactors: responseBody.riskfactors ?? "N/A",
      threat: threatName ?? "N/A", // Added optional chaining here too
      port: responseBody.port ?? "N/A",
      protocols: protocols,
      technologies: technology,
      description: description,
      wikisummary: wikiSummary,
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
