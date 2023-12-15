import { useState } from "react";
function App() {
  const [query, setQuery] = useState("");
  const baseURL = "http://localhost:3000/api/v1/pulsedivescore/?query=";
  const queryString = `${baseURL}${query}`;
  const handleChange = (event) => {
    setQuery(event.target.value);
  };
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

// import { useState } from "react";
// function App() {
//   const [score, setScore] = useState("");
//   const data = async () => {
//     const options = {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//       },
//     };
//     const results = await fetch("http://localhost:3000/api/abuseipdb", options);
//     const jsonBody = await results.json();
//     console.log(jsonBody.data.abuseConfidenceScore);
//     setScore(jsonBody.data.abuseConfidenceScore);
//   };
//   return (
//     <>
//       <div>Hello, world!</div>
//       <button onClick={data}>Click me!</button>
//       <p>Abuse Score: {score}</p>
//     </>
//   );
// }

// export default App;
