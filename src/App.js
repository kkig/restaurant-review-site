import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Header from './shared/layout/Header';
import Main from './shared/layout/Main';
import UserLocationDialog from './components/UserLocationDialog';
import { usePosition } from './shared/hooks/usePosition';

const useStyles = makeStyles({
  root: {
    '--navbar-height': '50px',
    '--content-height': 'calc(100vh - var(--navbar-height))',

    width: '100%',
    height: '100vh',
    fontSize: 14,
  },
  header: {
    width: '100%',
    height: 'var(--navbar-height)',
  },
  main: {
    width: '100%',
    height: 'var(--content-height)',
  },
});

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
      <div className={classes.header}>
        <Header handleClick={handleClick} isMapView={isMapView} />
      </div>

      <div className={classes.main}>
        <Main isMapView={isMapView} />
      </div>

      {/* {<UserLocationDialog userLocation={userLocation} />} */}
    </div>
  );
};

export default App;
