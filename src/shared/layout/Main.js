import React, { useContext } from 'react';

import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery';

// Components
import Map from '../../components/MapSection';
import RestaurantList from '../../components/ListSection';

// Store
import AppContext from '../contexts/AppContext';
import restaurantData from '../data/restaurantData.json';

const MainContainer = styled(Box)({
  display: 'flex',
  height: '100%',
});

const MapSection = styled(Box)({
  flexGrow: 1,
  minWidth: '70%',
});

const ListSection = styled(Box)({
  height: '100%',
  flexGrow: 1,
});

const Main = ({ isMapView }) => {
  const store = useContext(AppContext);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  // Add json data to store
  if (store.countData === 0) {
    store.isShopLoading = true;
    restaurantData.map((shop) =>
      store.addNewShop({ ...shop, dataSrc: 'json' })
    );
  }

  return (
    <MainContainer component='main'>
      {(!isMobile || (isMobile && isMapView)) && (
        <MapSection>
          <Map />
        </MapSection>
      )}

      {(!isMobile || (isMobile && !isMapView)) && (
        <ListSection>
          <RestaurantList />
        </ListSection>
      )}
    </MainContainer>
  );
};

export default Main;
