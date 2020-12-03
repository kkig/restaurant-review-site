import { useState } from 'react';

// Class
import ShopDataItem from '../classes/ShopDataItemClass';

const GOOGLE_MAP_API_KEY =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_GOOGLE_KEY
    : process.env.REACT_APP_DEV_GOOGLE_KEY;

const proxy = `https://cors-anywhere.herokuapp.com/`;

export const useGooglePlaces = (latitude, longitude) => {
  const [isRequested, setRequested] = useState(false);
  const [isDataReady, setDataReady] = useState(false);
  const [placesData, setPlaces] = useState(null);
  const [err, setError] = useState(null);

  const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${GOOGLE_MAP_API_KEY}`;

  if (!latitude || !longitude) {
    setError('Location data is missing...');
    return;
  }

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

    setPlaces(...placesData, newArray);
    setDataReady(true);
    console.log(newArray);
  };

  const fetchData = async () => {
    const data = await fetch(proxy + endpoint)
      .then((res) => res.json())
      .catch((err) => console.log(err));

    formatData(data.results);
    setRequested(true);
  };

  !isRequested && !placesData && fetchData();

  return { placesData, isRequested, isDataReady, err };
};
