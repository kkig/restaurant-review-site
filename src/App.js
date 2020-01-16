import React, { useState, useEffect } from 'react';

// Components
import Navbar from './components/Navbar';
import AppContents from './components/AppContents';

// CSS
import './App.css';

// Store
import StoreProvider from './stores/RestourantStores';

const App = () => {
  const [ windowValue, setValue ] = useState(window.innerWidth);
  const [ isMobileView, setMobileView ] = useState(false);
  const [ isMapView, setMapView ] = useState(true);

  const handleClick = () => {
    setMapView(!isMapView);
  };
  
  // Set initial window value
  useEffect(() => {
    const intervalId = setInterval(window.addEventListener('resize', () => setValue(window.innerWidth)), 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Adjust layout when screen size change
  useEffect(() => {
    windowValue <= 600 ? setMobileView(true) : setMobileView(false);
  }, [windowValue]);

  return (
    <div className="app">
      <StoreProvider>

        <Navbar 
          handleClick={handleClick}
          isMobileView={isMobileView}
          isMapView={isMapView}
        /> 
        <AppContents 
          isMobileView={isMobileView}
          isMapView={isMapView}
        />

      </StoreProvider>
    </div>
  );
};

export default App;
