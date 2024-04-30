import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/WeatherDetails.css'; 

const WeatherDetails = () => {
  const { placeName } = useParams(); // Assuming we're using this dynamic segment
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    // Fetching weather details for the place
    const fetchWeatherDetails = async () => {
      try {
        
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=${placeName}&days=10`);
        if (!response.ok) throw new Error('Weather data fetch failed');
        const data = await response.json();
        setWeatherDetails(data.current);
        setForecast(data.forecast.forecastday);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWeatherDetails();
  }, [placeName]);

  if (!weatherDetails || !forecast.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="weather-details">
      <div className="weather-header">
        <h1>{placeName}</h1>
        <p>{weatherDetails.temp_c}°C</p>
        <p>{weatherDetails.condition.text}</p>
        <div className="weather-controls">
          <button>Button 1</button>
          <button>Button 2</button>
          <button onClick={() => {}}>&times;</button>
        </div>
      </div>
      <div className="weather-forecast">
        {forecast.map((day) => (
          <div key={day.date} className="forecast-card">
            <h3>{day.date}</h3>
            <p>Max Temp: {day.day.maxtemp_c}°C</p>
            <p>Min Temp: {day.day.mintemp_c}°C</p>
            <p>Condition: {day.day.condition.text}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;
