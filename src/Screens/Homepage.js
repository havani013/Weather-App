
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WeatherCard from '../Cards/WeatherCard';
import '../styles/Screens.css';
import SplashScreen from './SplashScreen';


const toCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;
const toFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
const Homepage = () => {
  const apiKey = '949b8f1fce4574efb8acb25a88da1cd9';
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const weatherData = [
    {
      placeName: 'San Francisco',
      temperature: '65',
      weatherDescription: 'Partly cloudy',
      highTemp: '68',
      lowTemp: '55'
    },
    {
      placeName: 'Oakland',
      temperature: '67',
      weatherDescription: 'Sunny',
      highTemp: '70',
      lowTemp: '56'
    },
    {
      placeName: 'San Jose',
      temperature: '70',
      weatherDescription: 'Mostly sunny',
      highTemp: '73',
      lowTemp: '58'
    },
    {
      "placeName": "Los Angeles",
      "temperature": "70",
      "weatherDescription": "Sunny",
      "highTemp": "72",
      "lowTemp": "60"
    },
    {
      "placeName": "New York",
      "temperature": "55",
      "weatherDescription": "Rainy",
      "highTemp": "58",
      "lowTemp": "48"
    },
    {
      "placeName": "Chicago",
      "temperature": "50",
      "weatherDescription": "Windy",
      "highTemp": "53",
      "lowTemp": "46"
    },

  ];
  const [showSplash, setShowSplash] = useState(true);


  const hideSplashScreen = () => {
    setShowSplash(false);
  };

  const [temperatureScale, setTemperatureScale] = useState('Fahrenheit'); // keeping Fahrenheit as default 


  const handleScaleChange = (event) => {
    setTemperatureScale(event.target.value);
  };


  const getTemperature = (temp) => {
    if (temperatureScale === 'Celsius') {
      return Math.round(toCelsius(temp));
    }
    return temp;
  };


  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.length > 2) {
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${value}`);
        if (response.ok) {
          const suggestions = await response.json();

        }
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      }
    }
  };


  const handleSearchSelect = (placeName) => {
    navigate(`/${placeName}`);
  };


  const filteredResults = searchTerm
    ? weatherData.filter((data) =>
      data.placeName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];


  return (
    <div>

      {showSplash ? (
        <SplashScreen onTimeout={hideSplashScreen} />
      ) : (
        <div className="homepage-container gradient-background">
          <div className="scale-switcher">
            <label>
              <input
                type="radio"
                value="Fahrenheit"
                checked={temperatureScale === 'Fahrenheit'}
                onChange={handleScaleChange}
              />
              Fahrenheit
            </label>
            <label>
              <input
                type="radio"
                value="Celsius"
                checked={temperatureScale === 'Celsius'}
                onChange={handleScaleChange}
              />
              Celsius
            </label>
          </div>

          <div className='homePageHeader'>

            <h1 className='name'>Weather</h1>
            <i class="fa fa-plus-circle" aria-hidden="true"></i>

          </div>
          <div className="search-container">

            <input className='input-box'
              type="text"
              placeholder="Search for a city or airport"
              value={searchTerm}
              onChange={handleSearchChange}
            />&nbsp;&nbsp;
            <i class="fa fa-search search-icon"></i>


            {searchTerm && (
              <ul className="suggestions-list">
                {filteredResults.map((result) => (
                  <li
                    key={result.placeName}
                    onClick={() => handleSearchSelect(result.placeName)}
                  >
                    {result.placeName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="weather-container">
            {weatherData.map((data, index) => (
              <WeatherCard
                key={index}
                placeName={data.placeName}
                temperature={getTemperature(data.temperature)}
                weatherDescription={data.weatherDescription}
                highTemp={getTemperature(data.highTemp)}
                lowTemp={getTemperature(data.lowTemp)}

              />
            ))}
          </div>

        </div>)}
    </div>
  );
};

export default Homepage;
