import React, { useContext } from 'react';

import './StoreLists.css';
import StoreItem from './StoreItem';

import StoreContext from '../stores/StoreContext';
import { useObserver } from 'mobx-react';

function StoreList(props) {

  const store = useContext(StoreContext);

  const getAverageValue = reviewArray => {
    const ratingArray = reviewArray.map(review => review.stars);
    return ratingArray.reduce((a, b) => a + b, 0) / ratingArray.length;  
  }    

    const evalMinMax = rating => {
      if(props.maxValue > rating) {
        if(props.minValue < rating) {
          return true;
        } else {
          return false;
        }
      } else {
        return;
      }
    }

    const btwMinMax = restaurant => {

      const avgRate = restaurant.ratings.length > 0 ? 
        getAverageValue(restaurant.ratings) : 
        restaurant.avgRating;

        return evalMinMax(avgRate);
    }    

    return useObserver(() => (
        <div className='lists-container'>

          {!store.ShopDataItem ? null : 
            store.ShopDataItem.filter(btwMinMax).map(restaurant => (
            
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
                restaurant.ratings.length > 0 ? 
                getAverageValue(restaurant.ratings) :
                restaurant.avgRating
              }
            />   
          ))}
          
        </div>
    ));
}

export default StoreList;