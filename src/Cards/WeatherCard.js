import React from 'react';
import '../styles/WeatherCard.css';

const WeatherCard = ({ placeName, temperature, weatherDescription, highTemp, lowTemp }) => {
  return (
    <div className="weather-card">
      <div className="weather-card-top">
        <div className="weather-card-place">{placeName}&nbsp; &nbsp;<i className="fa fa-trash" aria-hidden="true" ></i></div>
        <div className="weather-card-temp">{temperature}°</div>
      </div>
      <div className="weather-card-bottom">
        <div className="weather-card-description">{weatherDescription}</div>
        <div className="weather-card-hilow">
          H: {highTemp}° L: {lowTemp}°
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
