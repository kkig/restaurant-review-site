import React from 'react';
import { useLocalStore } from 'mobx-react';

import StoreContext from './StoreContext';

const StoreProvider = ({ children }) => {
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
    },
    clickedLocation: [],
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
