
async function abuseQuery() {

    const apiKey = process.env.pulseApiKey;
    const baseURL = "https://pulsedive.com/api/info.php?indicator=";
    const domain = "mau.se"
    const options = {
        method: "GET"
    };

    const query = `${baseURL}${domain}&pretty=1&key=${apiKey}`;
    console.log(query);
    
    const response = await fetch(query, options);
    const jsonBody = await response.json();
    return jsonBody
    }
    
module.exports = {
    abuseQuery,
};
    