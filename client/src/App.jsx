import { useState } from "react";
function App() {
  const [query, setQuery] = useState("");
  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  const baseURL = "http://localhost:3000/api/v1/pulsedivescore/?query=";
  const queryString = `${baseURL}${query}`;
  console.log(queryString);
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

export default App;
