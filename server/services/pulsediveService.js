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
      return null;
    }

    const responseBody = await response.json();

    console.log("PULSE PULSE PULSE PULSE PULSE PULSE PULSE PULSE PULSE ");

    let wikiSummary = "N/A";
    if (responseBody.threats && responseBody.threats.length > 0) {

      const threatName = responseBody.threats[0].name;  //get first threat (if any)
      
      wikiSummary = await fetchThreatInfo(threatName);
      console.log('Wiki Summary:', wikiSummary);
    } else {
      console.log('No threats found in the response.');
    }

    console.log(responseBody);
    const protocols = responseBody.attributes?.protocol || [];
    const technology = responseBody.attributes?.technology || [];
    const description = responseBody.riskfactors?.map((factor) => factor.description) || [];

    const clientResponseBody = {
      domain: responseBody.properties?.ssl?.domain ?? "N/A", 
      address: responseBody.properties?.geo?.address ?? "N/A",
      risk: responseBody.risk ?? "N/A",
      riskRecommended: responseBody.risk_recommended ?? "N/A",
      riskFactors: responseBody.riskfactors ?? "N/A",
      threat: responseBody.threats[0].name ?? "N/A",
      port: responseBody.port ?? "N/A",
      protocols: protocols.join(', '), // Combine into a strings
      technologies: technology.join(', '), 
      description: description.join(', '),
      wikisummary: wikiSummary,
    };

    return clientResponseBody;
  } catch (error) {
    console.error("Error in pulsedive service:", error);
    return null;
  }
}

async function fetchThreatInfo(indicator) {
  if (!indicator) {
    console.log('No threat indicator provided.');
    return "N/A";
  }

  try {
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
    const responseBody = await response.json();

    const wikisummary = responseBody.wikisummary;
    console.log(`Wiki Summary: ${wikisummary}`);
    return wikisummary;
  } catch (error) {
    console.error("Error in fetchThreatInfo:", error);
    return "N/A";
  }
}

module.exports = {
  fetchPulseDive,
  fetchThreatInfo,
};

