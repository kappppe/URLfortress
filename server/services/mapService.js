async function fetchMap(domain) {
    
    
    //ny kod
    
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
    responseBody = await response.json();
    // console.log(responseBody);
    const clientResponseBody = {
      country: responseBody.country || "N/A",
      city: responseBody.city || "N/A",
      lat: responseBody.lat || "N/A",
      long: responseBody.lon || "N/A",
    };
    return clientResponseBody;
  }
  
  module.exports = {
    fetchMap,
  };