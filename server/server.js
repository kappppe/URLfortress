// Import Modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000 || process.env.port;

// Middleware
app.use(cors());

// Routes
const apiRoute = require("./routes/v1/urlFortress");
app.use("/api/v1", apiRoute);

// 404 Resource Not Found
app.get("*", (req, res) => {
  res.status(404).send("404 Resource Not Found");
});

// Server init
app.listen(port, console.log(`Server is running on http://localhost:${port}`));
