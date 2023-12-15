async function fetchHostIo(params) {
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
  const responseBody = await response.json();
  // console.log(responseBody);
  return responseBody;
}

module.exports = {
  fetchHostIo,
};
