import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Components
import Navbar from './layout/Navbar';
import AppContents from './layout/AppContents';
import LocationDialog from './components/LocationDialog/LocationDialog';

// CSS
import './App.css';

// Store
import StoreProvider from './stores/RestourantStores';

const AppWrapper = styled(Box)({
  width: '100%',
  minHeight: '100vh',
});

const App = () => {
  const [isMapView, setMapView] = useState(true);

  // const [isDialogReady, setDialogReady] = useState(false);
  // const [isLocationAvailable, setLocationAvailable] = useState(null);

  const isMobileView = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleClick = () => {
    setMapView((isMapView) => !isMapView);
  };
  /*
    // Set LocationAvailable after user selected location access 
    !!navigator.geolocation && navigator.geolocation.getCurrentPosition(
      () => setLocationAvailable(true), 
      () => setLocationAvailable(false)
    );
    */
  // useEffect(() => {
  //   // Set LocationAvailable after user selected location access
  //   navigator.geolocation
  //     ? navigator.geolocation.getCurrentPosition(
  //         () => setLocationAvailable(true),
  //         () => setLocationAvailable(false)
  //       )
  //     : setLocationAvailable(false);
  // }, []);

  // Displau dialog when user selected location access
  // useEffect(() => {
  //   isLocationAvailable != null && setDialogReady(true);
  // }, [isLocationAvailable]);

  return (
    <StoreProvider>
      <AppWrapper>
        <Navbar
          handleClick={handleClick}
          isMobileView={isMobileView}
          isMapView={isMapView}
        />
        <AppContents isMobileView={isMobileView} isMapView={isMapView} />

        {/* {!!isDialogReady && <LocationDialog isLocationAvailable={isLocationAvailable} />} */}
      </AppWrapper>
    </StoreProvider>
  );
};

export default App;
