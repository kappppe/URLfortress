// Import Modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000 || process.env.port;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
const scoreRoute = require("./routes/v1/urlFortress");
app.use("/api/v1", scoreRoute);

// AbuseIPDB
// app.get("/api/abuseipdb", async (req, res) => {
//   const apiKey = process.env.abuseApiKey;
//   const baseURL = "https://api.abuseipdb.com/api/v2/check";
//   const ipAddress = "43.154.151.93";
//   const maxAgeInDays = "90";
//   const options = {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       Key: apiKey,
//     },
//   };
//   const query = `${baseURL}?ipAddress=${ipAddress}&maxAgeInDays=${maxAgeInDays}`;

//   const response = await fetch(query, options);
//   const jsonBody = await response.json();
//   console.log(jsonBody);
//   res.send(jsonBody);
// });

// Pulsedive
app.get("/api/pulsedive", async (req, res) => {
  const apiKey = process.env.pulseApiKey;
  const baseURL = "https://pulsedive.com/api/info.php";
  const indicator = "43.154.151.93";
  const pretty = "1";
  const query = `${baseURL}?indicator=${indicator}&pretty=${pretty}&key=${apiKey}`;
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };
  const response = await fetch(query, options);
  const responseBody = await response.json();
  console.log(responseBody);
  res.send(responseBody);
});

// Host.io
app.get("/api/hostio", async (req, res) => {
  const apiKey = process.env.hostioApiKey;
  const baseURL = "https://host.io/api/web/";
  const domain = "mau.se";
  const query = `${baseURL}${domain}?token=${apiKey}`;
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };
  const response = await fetch(query, options);
  const responseBody = await response.json();
  res.send(responseBody);
});

// 404 Page Not Found
app.get("*", (req, res) => {
  res.status(404).send("404 Page Not Found");
});

// Server init
app.listen(port, console.log(`Server is running on http://localhost:${port}`));
