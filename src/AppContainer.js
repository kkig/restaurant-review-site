import React, { useState, useEffect } from 'react';

// Components
import Navbar from './components/Navbar/Navbar';
import AppContents from './AppContents'
import LocationDialog from './components/LocationDialog/LocationDialog';

const AppContainer = () => {
    const [ windowValue, setValue ] = useState(window.innerWidth);
    const [ isMobileView, setMobileView ] = useState(false);
    const [ isMapView, setMapView ] = useState(true);

    const [ isDialogReady, setDialogReady ] = useState(false);
    const [ isLocationAvailable, setLocationAvailable ] = useState(null);
  
    const handleClick = () => {
      setMapView(!isMapView);
    };
    /*
    // Set LocationAvailable after user selected location access 
    !!navigator.geolocation && navigator.geolocation.getCurrentPosition(
      () => setLocationAvailable(true), 
      () => setLocationAvailable(false)
    );
    */
    useEffect(() => {
      // Set LocationAvailable after user selected location access 
      navigator.geolocation ? 
        navigator.geolocation.getCurrentPosition(
          () => setLocationAvailable(true), 
          () => setLocationAvailable(false)
        ) :
        setLocationAvailable(false) 
    }, []);
    
    // Adjust to screen size when resized
    useEffect(() => {
      const intervalId = setInterval(window.addEventListener('resize', () => setValue(window.innerWidth)), 1000);
      return () => clearInterval(intervalId);
    }, []);
  
    // Adjust layout when screen size change
    useEffect(() => {
      windowValue <= 768 ? setMobileView(true) : setMobileView(false);
    }, [windowValue]);

    // Displau dialog when user selected location access
    useEffect(() => {
      isLocationAvailable != null && setDialogReady(true);
    }, [isLocationAvailable]);

    return (
        <div className="container" style={{ height: `${window.innerHeight}`}}>
            <Navbar
                handleClick={handleClick}
                isMobileView={isMobileView}
                isMapView={isMapView}                 
            />
            <AppContents 
                isMobileView={isMobileView}
                isMapView={isMapView}            
            />

            {!!isDialogReady && <LocationDialog isLocationAvailable={isLocationAvailable} />}
        </div>
    );
};

export default AppContainer;