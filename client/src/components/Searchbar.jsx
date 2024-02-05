import React, { useState } from "react";
import SimpleMap from "./MapContainer";
import {
  MagnifyingGlass,
  TwitterLogo,
  FacebookLogo,
  InstagramLogo,
} from "@phosphor-icons/react";

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
              <p>Ranking: {responseData.hostIoResult?.rank}</p>
              <p>Usage: {responseData.abuseResult?.usage}</p>
              <p>Description: {responseData.hostIoResult?.description}</p>
              <p>
                <span>Socials</span>
              </p>
              <p>
                <FacebookLogo weight="fill" color="#475F7C" />
                {responseData.hostIoResult?.facebook}
              </p>
              <p>
                <InstagramLogo weight="fill" color="#475F7C" />
                {responseData.hostIoResult?.twitter}
              </p>
              <p>
                <TwitterLogo weight="fill" color="#475F7C" />
                {responseData.hostIoResult?.twitter}
              </p>
              <br />
              <h3>Security information</h3>
              <div>
                <span>Domain</span>
                {Array.isArray(responseData.pulseDiveResult?.domain)
                  ? responseData.pulseDiveResult?.domain.map(
                      (domain, index) => <p key={index}>{domain}</p>
                    )
                  : responseData.pulseDiveResult?.domain}
              </div>
              <p>
                <span>ISP</span>
                {responseData.abuseResult?.isp}
              </p>
              <p>IP: {responseData.abuseResult?.ip}</p>
              <p>IPv: {responseData.abuseResult?.ipVersion}</p>
              <div>
                <span>Technologies</span> Protocols:
                {Array.isArray(responseData.pulseDiveResult?.protocols)
                  ? responseData.pulseDiveResult?.protocols.map(
                      (protocol, index) => <p key={index}>{protocol}</p>
                    )
                  : responseData.pulseDiveResult?.protocols}
              </div>
              <p>Technologies: {responseData.pulseDiveResult?.technologies} </p>
              <p>
                <span>Threat</span>
              </p>
              <p>Abuse score: {responseData.abuseResult?.score}</p>
              <p>Risk: {responseData.pulseDiveResult?.risk}</p>
              {responseData.abuseResult?.whiteList !== undefined && (
                <p>
                  whitelisted: {String(responseData.abuseResult?.whiteList)}
                </p>
              )}
              <p>Total reports: {responseData.abuseResult?.totalReports}</p>

              <div>
                <span>Threat description</span>
                <p>Threat: {responseData.pulseDiveResult?.threat}</p>
                <p>
                  Wiki summary:
                  {responseData.pulseDiveResult?.threat +
                    ": " +
                    responseData.pulseDiveResult?.wikisummary +
                    ""}
                </p>
              </div>
              <br />
            </div>

            {/* Conditionally render the map */}

            {responseData.ipApiResult ? (
              <div>
                <h3>Server location</h3>
                <p>
                  Country:{" "}
                  {responseData.ipApiResult?.country +
                    " " +
                    "(" +
                    responseData.ipApiResult?.countryCode +
                    ")"}{" "}
                </p>
                <p>City: {responseData.ipApiResult?.city}</p>
                <p>Zip: {responseData.ipApiResult?.zip}</p>
                <p>Address: {responseData.pulseDiveResult?.address}</p>
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
