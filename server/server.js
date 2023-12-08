const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const port = 3000;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/home", async (req, res) => {
  const baseURL = "https://api.abuseipdb.com/api/v2/check";
  const apiKey = process.env.apiKey;
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Key: apiKey,
    },
  };
  const query = `${baseURL}?ipAddress=43.154.151.93&maxAgeInDays=90`;

  const response = await fetch(query, options);
  const jsonBody = await response.json();
  console.log(jsonBody);
  //   console.log(response);
  console.log(jsonBody.data.abuseConfidenceScore);
  const score = jsonBody.data.abuseConfidenceScore;
  // res.send(${score});
  res.send({ jsonBody });
});

app.listen(port, console.log(`Server is running on http://localhost:${port}`));
