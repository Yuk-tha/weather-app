import React, { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = "88eb63689aa079a02d8aa6743e2717d1";

  const getWeather = async () => {
    if (city.trim() === "") {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      setWeather(response.data);
      setError("");
    } catch (err) {
      setWeather(null);

      if (err.response?.status === 404) {
        setError("City not found!");
      } else if (err.response?.status === 401) {
        setError("Invalid API key!");
      } else {
        setError("Something went wrong!");
      }
    }
  };

  return (
    <div className={darkMode ? "dark weather-container" : "weather-container"}>

      <h1>Weather Report 🌤️</h1>

      {/* DARK MODE BUTTON */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{ marginBottom: "15px" }}
      >
        {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>

      {/* SEARCH BOX */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={getWeather}>Search</button>
      </div>

      {/* ERROR */}
      {error && <p className="error">{error}</p>}

      {/* WEATHER CARD */}
      {weather && (
        <div className="weather-card">

          <h2>{weather.name}</h2>

          {/* Weather Icon */}
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />

          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Weather: {weather.weather[0].main}</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>

        </div>
      )}
    </div>
  );
}

export default Weather;