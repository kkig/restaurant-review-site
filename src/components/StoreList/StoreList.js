import React, { useContext, useState } from 'react';

// Component
import StoreItem from './StoreItem';

// Store
import AppContext from '../../shared/contexts/AppContext';

// MobX
import { useObserver } from 'mobx-react';

const StoreList = ({ minValue, maxValue }) => {
  const [isInputMode, setInputMode] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const store = useContext(AppContext);

  // Handle close button click
  const handleCloseClick = (id) => {
    selectedShop !== id ? setSelectedShop(id) : setSelectedShop(null);
    setInputMode(false);
  };

  const handleInputMode = () => {
    setInputMode(true);
  };

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

  // Return filtered value
  const btwMinMax = (restaurant) => {
    const avgRate =
      restaurant.ratings.length > 0
        ? getAverageValue(restaurant.ratings)
        : restaurant.avgRating;

    return evalMinMax(avgRate);
  };

  //store.countData === 0 && console.log(store.ShopDataItem)

  return useObserver(() => (
    <div className='lists-container'>
      {store.countData > 0 ? (
        store.ShopDataItem.filter(btwMinMax).map((restaurant) => (
          <StoreItem
            key={restaurant.id}
            id={restaurant.id}
            name={restaurant.name}
            type={restaurant.type}
            address={restaurant.address}
            lat={restaurant.lat}
            lng={restaurant.long}
            ratings={restaurant.ratings}
            dataType={restaurant.dataSrc}
            avgValue={
              restaurant.ratings.length > 0
                ? getAverageValue(restaurant.ratings)
                : restaurant.avgRating
            }
            isDetailView={restaurant.id === selectedShop ? true : false}
            handleCloseClick={() => handleCloseClick(restaurant.id)}
            handleInputMode={handleInputMode}
            isInputMode={isInputMode}
          />
        ))
      ) : (
        <p>No restaurant to display.</p>
      )}
    </div>
  ));
};

export default StoreList;
