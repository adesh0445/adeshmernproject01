const express = require("express");
const myapp = express();
require("dotenv").config();
const cors = require("cors");
const path = require("path");

// ✅ CORS setup (dynamic frontend URL)
myapp.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

// ✅ Body parsers
myapp.use(express.json());
myapp.use(express.urlencoded({ extended: true }));

// ✅ Database connection
require("./database/mydb");

// ✅ Routes
const myrouting = require("./approuting/approute");
myapp.use("/api", myrouting);

// ✅ Serve React build (for production)
const clientBuildPath = path.join(__dirname, "../client/build");

myapp.use(express.static(clientBuildPath));

// ✅ Catch-all route for React Router (Express 5+ compatible)
myapp.get("/*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// ✅ Server start
const myport = process.env.PORT || 5000;
myapp.listen(myport, () => {
  console.log(`✅ Server running on port: ${myport}`);
});
