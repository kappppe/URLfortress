import { useState } from "react";

function Searchbar() {
  const [query, setQuery] = useState("");
  const [responseData, setResponseData] = useState({});

  const handleChange = (event) => {
    setQuery(event.target.value);
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
  const renderField = (fieldKey, fieldValue) => (
    <div className="field" key={fieldKey}>
      <h3 className="field-title">{fieldKey}</h3>
      {typeof fieldValue === "object" ? (
        <div className="nested-fields">
          {Object.entries(fieldValue).map(([key, value]) =>
            renderField(key, value)
          )}
        </div>
      ) : (
        <p className="field-value">{`${fieldKey}: ${fieldValue || "N/A"}`}</p>
      )}
    </div>
  );

  return (
    <>
      <label>Please, input the ip/domain address:</label>
      <input onChange={handleChange}></input>
      <button type="button" onClick={fetchData}>
        Search
      </button>

      {Object.keys(responseData).length > 0 && (
        <div className="response-container">
          {Object.entries(responseData).map(([key, value]) =>
            renderField(key, value)
          )}
        </div>
      )}
    </>
  );
}

export default Searchbar;
