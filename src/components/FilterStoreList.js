import React from 'react';

import './StoreLists.css';
import StoreItem from './StoreItem';

import restaurantData from '../APIs/restaurantData.json';

function FilterStoreList(props) {
    //console.log('minValue:' + props.minValue);

    const getAverageValue = reviewArray => {
      const ratingArray = reviewArray.map(review => review.stars);
      return ratingArray.reduce((a, b) => a + b, 0) / ratingArray.length;  
    }    
    
    const aboveMinValue = restaurant => getAverageValue(restaurant.ratings) > props.minValue;

    return (
        <div className='lists-container'>
          {restaurantData.filter(aboveMinValue).map(restaurant => (
            
            <StoreItem 
              key={restaurant.id}
              name={restaurant.restaurantName}
              type={restaurant.restaurantType}
              address={restaurant.address}
              lat={restaurant.lat}
              lng={restaurant.long}
              value={restaurant.ratings}
              avgValue={getAverageValue(restaurant.ratings)}
            />   

          ))}
        </div>
    );
}

export default FilterStoreList;