import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/Weather.css";

const NIGERIA_STATES = [
  { name: "Lagos", lat: 6.5244, lon: 3.3792 },
  { name: "Abuja", lat: 9.0765, lon: 7.3986 },
  { name: "Enugu", lat: 6.4400, lon: 7.4945 },
  { name: "Kano", lat: 12.0022, lon: 8.5919 },
  { name: "Rivers", lat: 4.8156, lon: 7.0498 },
  { name: "Oyo", lat: 7.5248, lon: 3.9005 },
  { name: "Kaduna", lat: 10.5105, lon: 7.4165 },
  { name: "Delta", lat: 5.7700, lon: 6.0600 },
  { name: "Borno", lat: 11.8333, lon: 13.1500 },
  { name: "Anambra", lat: 6.2100, lon: 6.9400 },
  // add all 36 states as needed
];

function Weather() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchState, setSearchState] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState(null);

  const fetchWeather = async (states) => {
    setLoading(true);
    try {
      const promises = states.map(async (state) => {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${state.lat}&longitude=${state.lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Africa/Lagos`
        );
        const data = await res.json();
        return { state: state.name, weather: data };
      });
      const results = await Promise.all(promises);
      setWeatherData(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    const state = NIGERIA_STATES.find(
      (s) => s.name.toLowerCase() === searchState.toLowerCase()
    );
    if (!state) {
      setSearchError("State not found!");
      setSearchResult(null);
      return;
    }
    setSearchError(null);
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${state.lat}&longitude=${state.lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Africa/Lagos`
      );
      const data = await res.json();
      setSearchResult({ state: state.name, weather: data });
    } catch (err) {
      console.error(err);
      setSearchError("Failed to fetch weather.");
    }
  };

  useEffect(() => {
    // Only main dashboard states: Enugu, Lagos, Abuja
    fetchWeather(
      NIGERIA_STATES.filter((s) =>
        ["Enugu", "Lagos", "Abuja"].includes(s.name)
      )
    );
  }, []);

  return (
    <div className="weather-section">
      <h2>🌦️ Nigerian States Weather & 7-Day Forecast</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search any Nigerian state..."
          value={searchState}
          onChange={(e) => setSearchState(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchError && <p className="error">{searchError}</p>}

      {/* Search Result */}
      {searchResult && (
        <div className="weather-card">
          <h3>{searchResult.state}</h3>
          {searchResult.weather.current_weather && (
            <p>
              🌡️ Temp: {searchResult.weather.current_weather.temperature}°C | 🌬️ Wind:{" "}
              {searchResult.weather.current_weather.windspeed} km/h
            </p>
          )}
          {searchResult.weather.daily && (
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              modules={[Navigation, Pagination, Autoplay]}
              className="forecast-swiper"
            >
              {searchResult.weather.daily.time.map((date, i) => (
                <SwiperSlide key={i}>
                  <div className="forecast-card">
                    <p>{date}</p>
                    <p>Max: {searchResult.weather.daily.temperature_2m_max[i]}°C</p>
                    <p>Min: {searchResult.weather.daily.temperature_2m_min[i]}°C</p>
                    <p>💧 {searchResult.weather.daily.precipitation_sum[i]} mm</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      )}

      {/* Main Dashboard */}
      {loading ? (
        <p className="center">Loading weather for dashboard states...</p>
      ) : (
        <div className="weather-grid">
          {weatherData.map((item, idx) => (
            <div key={idx} className="weather-card">
              <h3>{item.state}</h3>
              {item.weather.current_weather && (
                <p>
                  🌡️ Temp: {item.weather.current_weather.temperature}°C | 🌬️ Wind:{" "}
                  {item.weather.current_weather.windspeed} km/h
                </p>
              )}
              {item.weather.daily && (
                <Swiper
                  spaceBetween={10}
                  slidesPerView={3}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  modules={[Navigation, Pagination, Autoplay]}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                  className="forecast-swiper"
                >
                  {item.weather.daily.time.map((date, i) => (
                    <SwiperSlide key={i}>
                      <div className="forecast-card">
                        <p>{date}</p>
                        <p>Max: {item.weather.daily.temperature_2m_max[i]}°C</p>
                        <p>Min: {item.weather.daily.temperature_2m_min[i]}°C</p>
                        <p>💧 {item.weather.daily.precipitation_sum[i]} mm</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Weather;
