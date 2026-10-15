import axios from "axios";

// Instance terpisah — ini langsung ke OpenWeatherMap, BUKAN ke backend kita
const weatherClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const getWeatherByCoords = (lat, lon) =>
  weatherClient
    .get("/weather", {
      params: { lat, lon, appid: API_KEY, units: "metric" },
    })
    .then((res) => res.data);

export const getWeatherByCity = (cityName) =>
  weatherClient
    .get("/weather", {
      params: { q: cityName, appid: API_KEY, units: "metric" },
    })
    .then((res) => res.data);
