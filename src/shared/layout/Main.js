import React, { useEffect, useContext } from 'react';
// import Grid from '@material-ui/core/Grid';

import Box from '@material-ui/core/Box';
// import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery';

// Components
import Map from '../../components/Map';
import StoreListContainer from '../../components/StoreList/StoreListContainer';

// Store
import AppContext from '../contexts/AppContext';
import restaurantData from '../data/restaurantData.json';

// const useStyles = makeStyles({
//   root: {
//     // display: 'grid',
//     // gridTemplateColumns: 'repeat(6, 1fr)',
//     // gridColumn: '1 / -1',
//     height: '100%',

//     display: 'flex',
//     // justifyContent: 'space-between',
//   },
//   // wrapper: {
//   //   flexGrow: 1,
//   // },
//   // map: {
//   //   flexGrow: 1,
//   //   minWidth: '70%',
//   // },
//   // list: {
//   //   flexGrow: 1,
//   // },
// });

const MainContainer = styled(Box)({
  display: 'flex',
  height: '100%',
});

const MapSection = styled(Box)({
  flexGrow: 1,
  minWidth: '70%',
});

const ListSection = styled(Box)({
  flexGrow: 1,
});

const Main = ({ isMapView }) => {
  const store = useContext(AppContext);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  // const classes = useStyles();

  // Add json data to store
  useEffect(() => {
    !!store &&
      store.countData === 0 &&
      restaurantData.map((shop) =>
        store.addNewShop({ ...shop, dataSrc: 'json' })
      );
  }, [store]);

  // Mobile layout
  if (isMobile) {
    return (
      <MainContainer component='main'>
        {isMapView ? (
          <MapSection>
            <Map />
          </MapSection>
        ) : (
          <ListSection>
            <StoreListContainer />
          </ListSection>
        )}
      </MainContainer>
    );
  }

  // Desktop Layout
  return (
    <MainContainer component='main'>
      <MapSection>
        <Map />
      </MapSection>

      <ListSection>
        <StoreListContainer />
      </ListSection>
    </MainContainer>
  );
};

export default Main;
