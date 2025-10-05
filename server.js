// server.js
require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors"); // Import CORS

const app = express();
const PORT = 3000;

// Enable CORS for all routes (needed when frontend runs on different port like Live Preview)
app.use(cors());

// Serve frontend files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Weather API endpoint
app.get("/api/weather/:city", async (req, res) => {
  const city = req.params.city;
  const apiKey = process.env.Apikey;

  try {
    // Fetch current weather
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const weatherData = await weatherResponse.json();

    // Fetch 5-day forecast
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    const forecastData = await forecastResponse.json();

    res.json({
      current: weatherData,
      forecast: forecastData,
    });
  } catch (err) {
    console.error("Error fetching weather:", err);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
