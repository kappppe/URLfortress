import React, { useState } from "react";
import SimpleMap from "./MapContainer";
import { MagnifyingGlass, TwitterLogo } from "@phosphor-icons/react";

function Searchbar() {
  const [query, setQuery] = useState("");
  const [responseData, setResponseData] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const inputValue = event.target.value.trim(); //check and trim whitespace.
    setQuery(inputValue);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && query.trim() !== "") {
      //check and trim whitespace.
      fetchData();
    }
  };

  const baseURL = "http://localhost:3000/api/v1/fullreport/?query=";
  const queryString = `${baseURL}${query}`;

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    //Nothing to catch, therefor -> log status and return. (fix for bad request)
    const results = await fetch(queryString, options);

    if (results.status !== 200) {
      console.error("Status code", results.status);
      setError(`Error: ${results.status}`);
    } else {
      const jsonBody = await results.json();
      setResponseData(jsonBody);
      setError(null); //resets error to enable the new search
    }
  };

  return (
    <>
      <section className="container">
        <input
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter URL/IP-address here..."
        ></input>
        <button type="button" onClick={fetchData}>
          <MagnifyingGlass />
        </button>

        {error ? (
          <div>
            <p>{error}</p>
          </div>
        ) : Object.keys(responseData).length > 0 ? (
          <div className="flex justify-between">
            <div className="info">
              <h3>General information</h3>
              <p>
                <span>Domain</span>
                {responseData.pulseDiveResult?.domain}
              </p>
              <p>
                <span>ISP</span>
                {responseData.abuseResult?.isp}{" "}
              </p>
              <p>
                <span>Protocols</span> {responseData.pulseDiveResult?.protocols}{" "}
              </p>
              <p>technologies: {responseData.pulseDiveResult?.technologies} </p>
              <p>description: {responseData.hostIoResult?.description}</p>
              <br />

              <h3>Security information</h3>
              <p>Rank: {responseData.hostIoResult?.rank}</p>
              <p>Facebook: {responseData.hostIoResult?.facebook}</p>
              <p>
                <TwitterLogo weight="fill" color="#475F7C" />
                {responseData.hostIoResult?.twitter}
              </p>
              <p>score: {responseData.abuseResult?.score}</p>
              <p>ip: {responseData.abuseResult.ip}</p>
              <p>ip version: {responseData.abuseResult?.ipVersion}</p>
              <p>usage: {responseData.abuseResult?.usage}</p>
              <p>total reports: {responseData.abuseResult?.totalReports}</p>
              <p>risk: {responseData.pulseDiveResult?.risk}</p>
              {responseData.abuseResult?.whiteList !== undefined && (
                <p>
                  whitelisted: {String(responseData.abuseResult?.whiteList)}
                </p>
              )}
              <p>threat occured: {responseData.pulseDiveResult?.threat}</p>
              <p>
                Wiki summary on{" "}
                {responseData.pulseDiveResult?.threat +
                  ": " +
                  responseData.pulseDiveResult?.wikisummary +
                  ""}
              </p>
              <br />

              <br />
            </div>

            {/* Conditionally render the map */}

            {responseData.ipApiResult ? (
              <div>
                <h3>Server location</h3>
                <p>
                  country:{" "}
                  {responseData.ipApiResult?.country +
                    " " +
                    "(" +
                    responseData.ipApiResult?.countryCode +
                    ")"}{" "}
                </p>
                <p>city: {responseData.ipApiResult?.city}</p>
                <p>zip: {responseData.ipApiResult?.zip}</p>
                <p>address: {responseData.pulseDiveResult?.address}</p>
                <SimpleMap center={responseData?.ipApiResult} />
              </div>
            ) : (
              <p>Loading map...</p>
            )}
          </div>
        ) : (
          <p>No data available. Please perform a search.</p>
        )}
      </section>
    </>
  );
}

export default Searchbar;
