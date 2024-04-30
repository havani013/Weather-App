import React, { useState, useEffect } from 'react';

const TenDaysDetails = ({ lat, lon }) => {
  const [tenDaysWeather, setTenDaysWeather] = useState(null);
  const apiKey = '949b8f1fce4574efb8acb25a88da1cd9';

  useEffect(() => {

    const fetchTenDaysWeather = async () => {
      try {
        const response = await fetch(`api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=10&appid=${apiKey}`);
        const data = await response.json();
        setTenDaysWeather(data.daily);
      } catch (error) {
        console.error('Error fetching 10 days weather details:', error);
      }
    };


    if (lat && lon) {
      fetchTenDaysWeather();
    }
  }, [lat, lon, apiKey]);

  if (!tenDaysWeather) {
    return <div>Loading 10 days forecast...</div>;
  }


  return (
    <div className="ten-days-weather-container">
      {tenDaysWeather.map((day, index) => (
        <div className="daily-weather-detail" key={index}>

          <div className="weather-date">
            Date: /* date here */
          </div>
          <div className="weather-temp">
            Day: {day.temp.day}°C
            Night: {day.temp.night}°C
          </div>
          <div className="weather-desc">
            {day.weather[0].description}
          </div>

        </div>
      ))}
    </div>
  );
};

export default TenDaysDetails;
