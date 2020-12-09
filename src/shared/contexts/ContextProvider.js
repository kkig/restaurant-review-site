import React from 'react';
import { useLocalStore } from 'mobx-react';

import AppContext from './AppContext';

// Class
import ShopDataItem from '../classes/ShopDataItemClass';

const GOOGLE_MAP_API_KEY =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_GOOGLE_KEY
    : process.env.REACT_APP_DEV_GOOGLE_KEY;

const proxy = `https://cors-anywhere.herokuapp.com/`;

const formatData = (data) => {
  let newArray = [];
  data.map((restaurant) =>
    newArray.push(
      new ShopDataItem(
        restaurant.place_id,
        restaurant.name,
        restaurant.types[0],
        restaurant.vicinity,
        restaurant.geometry.location.lat,
        restaurant.geometry.location.lng,
        restaurant.rating,
        [],
        'GOOGLE'
      )
    )
  );

  return newArray;
};

const fetchGooglePlaces = async (latitude, longitude) => {
  const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${GOOGLE_MAP_API_KEY}`;
  const data = await fetch(proxy + endpoint)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  const placesData = formatData(data.results);
  console.log('google places requested.');

  return placesData;
};

const ContextProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    ShopDataItem: [],
    addNewShop: (newShop) => {
      store.ShopDataItem.unshift(newShop);
      store.isShopLoading = false;
    },
    isShopLoading: true,
    get countData() {
      return store.ShopDataItem.length;
    },

    addNewComment: (id, newComment) => {
      store.ShopDataItem.find(
        (shop) => shop.id === id && shop.ratings.unshift(newComment)
      );
      store.isCommentLoading = false;
    },
    isCommentLoading: false,

    userLocation: [null],
    addUserLocation: (lat, lng) => {
      if (store.userLocation === null) {
        return;
      } else {
        store.userLocation = { ...store.userLocation, lat: lat, lng: lng };
      }

      store.isShopLoading = true;

      const getPlacesData = async () => {
        const data = await fetchGooglePlaces(lat, lng);

        data.map((shop) => store.addNewShop(shop));
        console.log(store.ShopDataItem);
      };

      getPlacesData();
      console.log('Location stored');
    },
    clickedLocation: [],
  }));

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export default ContextProvider;
