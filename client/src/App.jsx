async function App() {
  const options = {
    headers: {
      method: "GET",
      Accept: "application/json",
    },
  };
  const results = await fetch(
    "http://localhost:3000/home",
    options
  );
  const jsonBody = await results.json();
  console.log(jsonBody);
    

  return ( <div></div>)

}

export default App


