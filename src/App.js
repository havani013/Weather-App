import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import WeatherDetails from './Screens/WeatherDetails';
import Weather from './Components/weather';
import Homepage from './Screens/Homepage';
import Footer from './Screens/footer';

const AppWrapper = () => {
  // This component is only here to provide Router context to App
  return (
    <Router>
      <App />
      <Footer />
    </Router>
  );
};

const App = () => {
  const location = useLocation(); // useLocation is now used within Router context

  return (
    <Routes>
    <Route path="/" element={<Homepage />} />
    // Update the route path for the WeatherDetailsPage
    <Route path="/:placeName" element={<WeatherDetails />} />
    {/* Your other routes here */}
  </Routes>
  
  );
};

export default AppWrapper; // Export the wrapper
