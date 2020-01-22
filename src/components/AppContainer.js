import React, { useState, useEffect } from 'react';

// Components
import Navbar from './AppContainer/Navbar';
import AppCOntents from './AppContainer/AppContents'

const Body = () => {
    const [ windowValue, setValue ] = useState(window.innerWidth);
    const [ isMobileView, setMobileView ] = useState(false);
    const [ isMapView, setMapView ] = useState(true);
  
    const handleClick = () => {
      setMapView(!isMapView);
    };
    
    // Adjust to screen size when resized
    useEffect(() => {
      const intervalId = setInterval(window.addEventListener('resize', () => setValue(window.innerWidth)), 1000);
      return () => clearInterval(intervalId);
    }, []);
  
    // Adjust layout when screen size change
    useEffect(() => {
      windowValue <= 768 ? setMobileView(true) : setMobileView(false);
      console.log(windowValue)
    }, [windowValue]);

    return (
        <div className="container" style={{ height: `${window.innerHeight}`}}>
            <Navbar
                handleClick={handleClick}
                isMobileView={isMobileView}
                isMapView={isMapView}                 
            />
            <AppCOntents 
                isMobileView={isMobileView}
                isMapView={isMapView}            
            />
        </div>
    );
};

export default Body;