import React, { useState } from "react";
import SimpleMap from "./MapContainer";

function Searchbar() {
  const [query, setQuery] = useState("");
  const [responseData, setResponseData] = useState({});

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchData();
    }
  };

  const baseURL = "http://localhost:3000/api/v1/fullreport/?query=";
  const queryString = `${baseURL}${query}`;

  const fetchData = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      };

      const results = await fetch(queryString, options);
      const jsonBody = await results.json();
      console.log(jsonBody);
      setResponseData(jsonBody);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <label>Please, input the ip/domain address:</label>
      <input
        onChange={handleChange}
        onKeyPress={handleKeyPress} // Added event listener for key press
      ></input>
      <button type="button" onClick={fetchData}>
        Search
      </button>

      {Object.keys(responseData).length > 0 ? (
        <div>
          <h3>General information</h3>
          {/* <p>domain: {responseData.pulseDiveResult.domain} </p> */}
          <p>protocols: {responseData.pulseDiveResult.protocols} </p>


          <h3>Security information</h3>
          {/* <p>Rank: {responseData.hostIoResult?.rank}</p>
          <p>Facebook: {responseData.hostIoResult?.facebook}</p>
          <p>Twitter: {responseData.hostIoResult?.twitter}</p>
          <p>score: {responseData.abuseResult?.score}</p> */}
          <p>ip: {responseData.abuseResult.ip}</p>
          <p>ip version: {responseData.abuseResult.ipVersion}</p>
          <p>usage: {responseData.abuseResult.usage}</p>
          <p>total reports: {responseData.abuseResult.totalReports}</p>
          <p>risk: {responseData.pulseDiveResult?.risk}</p>
          {responseData.abuseResult?.whiteList !== undefined && (
            <p>whitelisted: {String(responseData.abuseResult?.whiteList)}</p>
          )}
        

          <h3>Location information</h3>
          <p>country: { responseData.ipApiResult.country + " " + "(" + responseData.ipApiResult.countryCode + ")"} </p>
          <p>city: { responseData.ipApiResult.city}</p>
          <p>zip: { responseData.ipApiResult.zip}</p>
          <p>address: { responseData.pulseDiveResult.address}</p>

          {/* Conditionally render the map */}
          {responseData.ipApiResult ? (
            <SimpleMap center={responseData.ipApiResult} />
          ) : (
            <p>Loading map...</p>
          )}
        </div>
      ) : (
        <p>No data available. Please perform a search.</p>
      )}
    </>
  );
}

export default Searchbar;
