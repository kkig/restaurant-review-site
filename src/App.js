import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Header from './shared/layout/Header';
import Main from './shared/layout/Main';
import UserLocationDialog from './components/UserLocationDialog';
import { usePosition } from './shared/hooks/usePosition';

import './App.css';

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

// const AppWrapper = styled(Box)({
//   width: '100%',
//   minHeight: '100vh',

//   display: 'grid',
//   gridTemplateColumns: '1fr',
//   gridTemplateRows: '50px 1fr',
// });

const App = () => {
  const [isMapView, setMapView] = useState(true);

  const { latitude, longitude, isSuccess } = usePosition();
  const [userLocation, setUserLocation] = useState(null);

  const classes = useStyles();

  const handleClick = () => {
    setMapView((isMapView) => !isMapView);
  };

  if (!userLocation && isSuccess) {
    setUserLocation({ lat: latitude, lng: longitude });
    console.log(`Fetched: ${latitude}`);
  }

  return (
    <div className={classes.root}>
      <Header
        className={classes.header}
        handleClick={handleClick}
        isMapView={isMapView}
      />
      <Main className={classes.main} isMapView={isMapView} />

      {isSuccess != null && <UserLocationDialog userLocation={userLocation} />}
    </div>
  );
  // return (
  //   <ContextProvider>
  //     <AppWrapper>
  //       <Header handleClick={handleClick} isMapView={isMapView} />
  //       <Main isMapView={isMapView} />

  //       {/* {!!isLocationReady && <LocationDialog isLocationAvailable={isLocationAvailable} />} */}
  //     </AppWrapper>
  //   </ContextProvider>
  // );
};

export default App;
