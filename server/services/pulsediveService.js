async function pulseDiveQuery() {
  const apiKey = process.env.pulseApiKey;
  const baseURL = "https://pulsedive.com/api/info.php";
  const indicator = "43.154.151.93";
  const pretty = "1";
  const queryString = `${baseURL}?indicator=${indicator}&pretty=${pretty}&key=${apiKey}`;
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };
  const response = await fetch(queryString, options);
  const responseBody = await response.json();
  console.log(responseBody);
  return responseBody;
}

module.exports = {
  pulseDiveQuery,
};
