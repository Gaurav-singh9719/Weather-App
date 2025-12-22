import "./Weather.css";
import React, { useState } from "react";

// 🔥 LIVE BACKEND URL (Render)
const BACKEND_URL = "https://weahter-app-backend.onrender.com/api/weather";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ city })
      });

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.message || "API Error");
      }

      setWeather(json.data);
    } catch (err) {
      setError("Failed to fetch weather data");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-forecast-app container mt-4">
      <h1>Forecastifly</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter city (e.g. Delhi)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button className="btn btn-primary mt-3">
          Get Weather
        </button>
      </form>

      {loading && <p>Loading weather data...</p>}
      {error && <p className="text-danger">{error}</p>}

      {weather && (
        <div className="card mt-4">
          <div className="card-body">
            <h4 className="card-title">{weather.name}</h4>

            <p className="card-text">
              🌡 Temperature: {weather.main?.temp} °C
            </p>

            <p className="card-text">
              💧 Humidity: {weather.main?.humidity} %
            </p>

            <p className="card-text">
              🌥 Condition: {weather.weather?.[0]?.description}
            </p>

            <p className="card-text">
              🌬 Wind Speed: {weather.wind?.speed} m/s
            </p>

            <p className="card-text">
              ☁ Cloud Coverage: {weather.clouds?.all} %
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
