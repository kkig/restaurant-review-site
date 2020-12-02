import React, { useState, useEffect } from 'react';
// import Grid from '@material-ui/core/Grid';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery';

// Components
import Header from './layout/Header';
import Main from './layout/Main';
import LocationDialog from './components/LocationDialog/LocationDialog';

// CSS
import './App.css';

// Store
import StoreProvider from './stores/StoreProvider';

const useStyles = makeStyles({
  root: {
    width: '100%',
    minHeight: '100vh',
    fontSize: 14,

    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '50px 1fr',
  },
  header: {
    gridColumn: '1 / -1',
    gridRow: '1 / 2',
  },
  main: {
    gridColumn: '1 / -1',
    gridRow: '2 / -1',
  },
});

const AppWrapper = styled(Box)({
  width: '100%',
  minHeight: '100vh',

  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '50px 1fr',
});

const App = () => {
  const [isMapView, setMapView] = useState(true);

  // const [isDialogReady, setDialogReady] = useState(false);
  // const [isLocationAvailable, setLocationAvailable] = useState(null);

  // const isMobileView = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const classes = useStyles();

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
      <div className={classes.root}>
        <Header
          className={classes.header}
          handleClick={handleClick}
          isMapView={isMapView}
        />
        <Main className={classes.main} isMapView={isMapView} />

        {/* {!!isDialogReady && <LocationDialog isLocationAvailable={isLocationAvailable} />} */}
      </div>
    </StoreProvider>
  );
  // return (
  //   <storeProvider>
  //     <AppWrapper>
  //       <Header handleClick={handleClick} isMapView={isMapView} />
  //       <Main isMapView={isMapView} />

  //       {/* {!!isDialogReady && <LocationDialog isLocationAvailable={isLocationAvailable} />} */}
  //     </AppWrapper>
  //   </storeProvider>
  // );
};

export default App;
