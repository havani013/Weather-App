import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Screens.css';
import TenDaysDetails from '../Cards/TenDaysDetails'
const WeatherDetails = () => {
    const [weatherDetails, setWeatherDetails] = useState(null);

    const { placeName } = useParams();
    const apiKey = '949b8f1fce4574efb8acb25a88da1cd9';

    useEffect(() => {
        // Fetching current weather details
        const fetchWeather = async () => {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${placeName}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            setWeatherDetails(data);
        };
        fetchWeather();
    }, [placeName, apiKey]);

    //  logic for rendering weatherDetails and forecastDetails
    if (!weatherDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="weather-details-container homepage-container gradient-background">
            <div className='weatherDetails-header'>
                <h1>{weatherDetails.name}</h1>
            </div>
            <div className='weatherDetails-desc'>
                <div>{weatherDetails.main.temp}°</div>
                <span>|</span>
                <div>{weatherDetails.weather[0].description}</div>
            </div>
            <TenDaysDetails
                lat={weatherDetails.coord.lat}
                lon={weatherDetails.coord.lon} />

        </div>
    );
};

export default WeatherDetails;
