import React, { useContext, useState, useRef } from 'react';

import Divider from '@material-ui/core/Divider';

// Component
import ListItem from './RestaurantListItem';
import ListItemSkelton from './ListItemSkelton';

// Class
import userReview from '../../shared/classes/UserReviewClass';

// Store
import AppContext from '../../shared/contexts/AppContext';

// MobX
import { useObserver } from 'mobx-react';

const GOOGLE_MAP_API_KEY =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_GOOGLE_KEY
    : process.env.REACT_APP_DEV_GOOGLE_KEY;

const RestaurantList = ({ minValue, maxValue }) => {
  const [selectedShop, setSelectedShop] = useState(null);

  const store = useContext(AppContext);

  const getAverageValue = (reviewArray) => {
    const ratingArray = reviewArray.map((review) => review.stars);
    return ratingArray.reduce((a, b) => a + b, 0) / ratingArray.length;
  };

  const evalMinMax = (rating) => {
    if (maxValue >= rating) {
      if (minValue <= rating) {
        return true;
      } else {
        return false;
      }
    } else {
      return;
    }
  };

  const reviewAvg = (restaurant) => {
    const avg =
      restaurant.ratings.length > 0
        ? getAverageValue(restaurant.ratings)
        : restaurant.avgRating;

    return avg;
  };

  const btwMinMax = (restaurant) => evalMinMax(reviewAvg(restaurant));

  const createCommentArray = (shops) => {
    let count = 0;
    const newArray = shops.reviews.map((review) => {
      count++;
      return new userReview(count, review.rating, review.text);
    });

    return newArray;
  };

  const detailRequest = (restaurantId) => {
    const endpoint = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${restaurantId}&fields=name,rating,reviews&key=${GOOGLE_MAP_API_KEY}`;
    const proxy = `https://cors-anywhere.herokuapp.com/`;

    fetch(proxy + endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'OK') {
          const newComments = createCommentArray(data.result);
          newComments.map((shop) => store.addNewComment(restaurantId, shop));
          store.isCommentLoading = false;
        } else {
          console.log('Errror requesting comments');
        }
      })
      .catch((error) => console.log(error));

    console.log('detail fetched');
  };

  // Handle close button click
  const handleItemClick = (id) => {
    selectedShop !== id ? setSelectedShop(id) : setSelectedShop(null);

    const selectedData = store.ShopDataItem.find((el) => el.id === id);
    console.log(selectedData);

    if (
      selectedData.ratings.length === 0 &&
      selectedData.dataSrc === 'GOOGLE'
    ) {
      store.isCommentLoading = true;
      detailRequest(selectedData.id);
    }
  };

  return useObserver(() => (
    <>
      {store.isShopLoading ? (
        <>
          <ListItemSkelton />
          <Divider />
          <ListItemSkelton />
          <Divider />
          <ListItemSkelton />
          <Divider />
        </>
      ) : (
        store.ShopDataItem.filter(btwMinMax).map((restaurant) => (
          <div key={restaurant.id}>
            <ListItem
              restaurant={restaurant}
              avgValue={reviewAvg(restaurant)}
              isDetailView={restaurant.id === selectedShop ? true : false}
              handleCloseClick={() => handleItemClick(restaurant.id)}
            />
            <Divider />
          </div>
        ))
      )}
    </>
  ));
};

export default RestaurantList;
