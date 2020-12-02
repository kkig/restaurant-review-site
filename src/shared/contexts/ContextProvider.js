import React from 'react';
import { useLocalStore } from 'mobx-react';

import AppContext from './AppContext';

const ContextProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    ShopDataItem: [],
    addNewShop: (newShop) => {
      store.ShopDataItem.unshift(newShop);
    },
    get countData() {
      return store.ShopDataItem.length;
    },
    addNewComment: (id, newComment) => {
      store.ShopDataItem.filter(
        (shop) => shop.id === id && shop.ratings.unshift(newComment)
      );
    },
    userLocation: [],
    addUserLocation: (lat, lng) => {
      store.userLocation = { ...store.userLocation, lat: lat, lng: lng };
      console.log('Location stored');
    },
    // get usePosition() {
    //   return store.userLocation.length;
    // },
    clickedLocation: [],
  }));

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export default ContextProvider;
