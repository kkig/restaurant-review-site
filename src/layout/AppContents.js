import React, { useEffect, useContext } from 'react';

// Components
import MapContainer from '../components/Map/MapContainer';
import StoreListContainer from '../components/StoreList/StoreListContainer';

// CSS
import './AppContents.css';

// Store
import StoreContext from '../stores/StoreContext';
import restaurantData from '../APIs/restaurantData.json';

const AppContents = ({ isMobileView, isMapView }) => {
  const store = useContext(StoreContext);

  // Add json data to store
  useEffect(() => {
    !!store &&
      store.countData === 0 &&
      restaurantData.map((shop) =>
        store.addNewShop({ ...shop, dataSrc: 'json' })
      );
  }, [store]);

  return (
    <main>
      {!isMobileView || (!!isMobileView && isMapView) ? <MapContainer /> : null}
      {!isMobileView || (!!isMobileView && !isMapView) ? (
        <StoreListContainer />
      ) : null}
    </main>
  );
};

export default AppContents;
