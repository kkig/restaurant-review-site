import React from 'react';

import './StoreLists.css';
import StoreItem from './StoreItem';

import restaurantData from '../APIs/restaurantData.json';

function StoreList(props) {

    const getAverageValue = reviewArray => {
      const ratingArray = reviewArray.map(review => review.stars);
      return ratingArray.reduce((a, b) => a + b, 0) / ratingArray.length;  
    }    
    
    const btwMinMax = restaurant => {
      const avgRate = getAverageValue(restaurant.ratings);
      if(props.maxValue > avgRate) {
        if(props.minValue < avgRate) {
          return true;
        } else {
          return false;
        }
      } else {
        return;
      }
    }    

    return (
        <div className='lists-container'>
          {restaurantData.filter(btwMinMax).map(restaurant => (
            
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

export default StoreList;