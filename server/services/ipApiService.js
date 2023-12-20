async function fetchIpCoordinates() {
  baseURL = "http://ip-api.com/json/";
  query = "mau.se";
  queryString = `${baseURL}${query}`;
  options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };
  response = await fetch(queryString, options);
  responseBody = await response.json();
  console.log(responseBody);
  return responseBody;
}

module.exports = {
  fetchIpCoordinates,
};
