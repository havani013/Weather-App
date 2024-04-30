import React, { useEffect } from 'react';
import '../styles/Screens.css';
import SplashScreenImage from '../Images/weather-img.png';


const SplashScreen = ({ onTimeout }) => {
    useEffect(() => {

        const timer = setTimeout(() => {
            onTimeout();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onTimeout]);

    return (
        <div className="splash-screen gradient-background">
            <img src={SplashScreenImage} alt="Loading logo" className="logo" />
            <h2>WEATHER</h2>
        </div>
    );
};

export default SplashScreen;
