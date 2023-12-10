function App() {
  const data = async () => {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };
    const results = await fetch("http://localhost:3000/api/abuseipdb", options);
    const jsonBody = await results.json();
    console.log(jsonBody.data.abuseConfidenceScore);
  };
  return (
    <>
      <div>Hello, world!</div>
      <button onClick={data}>Click me!</button>
    </>
  );
}

export default App;
