import { useState } from "react";
function Searchbar() {
  const [query, setQuery] = useState("");
  const handleChange = (event) => {
    setQuery(event.target.value);
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
    const results = await fetch(queryString, options);
    const jsonBody = await results.json();
    console.log(jsonBody);
  };
  return (
    <>
      <label>Please, input the ip/domain address:</label>
      <input onChange={handleChange}></input>
      <button type="button" onClick={fetchData}>
        Search
      </button>
    </>
  );
}

export default Searchbar;
