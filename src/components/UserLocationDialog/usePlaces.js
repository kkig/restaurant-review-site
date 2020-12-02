import { useState, useEffect } from 'react';

// Class
import ShopDataItem from '../../shared/classes/ShopDataItemClass';

export const usePlaces = (latitude, longitude) => {
  const [placesData, setPlaces] = useState({});
  const [formatChanged, setFormat] = useState(false);
  const [isPlaceRequested, setPlaceRequested] = useState(false);

  const getPlacesData = () => {
    if (!!isPlaceRequested || placesData.results) {
      return;
    }

    const fetchData = () => {
      const GOOGLE_MAP_API_KEY =
        process.env.NODE_ENV === 'production'
          ? process.env.REACT_APP_PROD_GOOGLE_KEY
          : process.env.REACT_APP_DEV_GOOGLE_KEY;
      const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${GOOGLE_MAP_API_KEY}`;
      const proxy = `https://cors-anywhere.herokuapp.com/`;

      fetch(proxy + endpoint)
        .then((res) => res.json())
        .then((data) => {
          setPlaces(data);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
    setPlaceRequested(true);
  };

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

    setPlaces(newArray);
    setFormat(true);
  };

  useEffect(() => {
    if (placesData.results) {
      formatData(placesData.results);
    }
  }, [placesData]);

  latitude !== undefined &&
    longitude !== undefined &&
    !isPlaceRequested &&
    getPlacesData();

  return { placesData, formatChanged };
};
