import React, { useState, useEffect } from 'react';

import './StoreLists.css';
import StoreItem from './StoreItem';

import restaurantData from '../APIs/restaurantData.json';
import { usePlaces } from '../APIs/usePlaces';

function StoreList(props) {
  const { placesData } = usePlaces();
  const [ isLoading, setLoading ] = useState(true);
  //placesData.length > 0 && console.log(placesData);

  useEffect(() => {
    placesData.results && setLoading(false);
  }, [placesData]);

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

    const dataBtwMinMax = restaurant => {
      return evalMinMax(restaurant.rating);
    }
    
    const btwMinMax = restaurant => {
      const avgRate = getAverageValue(restaurant.ratings);
      return evalMinMax(avgRate);
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

          {/*!isLoading && placesData.results.map(restaurant => console.log(restaurant.name))*/}
          
          {!isLoading && 
            <div className="google-stores">
              <h3>Restaurants from Google</h3>
              {placesData.results.filter(dataBtwMinMax).map(restaurant => (

              <div className='google-places' key={restaurant.id}>
                <StoreItem
                  
                  name={restaurant.name} 
                  type={restaurant.types[0]}  // Only display first one
                  address={restaurant.vicinity}
                  lat={restaurant.geometry.location.lat}
                  lng={restaurant.geometry.location.lng}
                  avgValue={restaurant.rating}
                  placeId={restaurant.place_id}
                  
                />
              </div>
              ))}
            </div>
          }
          
        </div>
    );
}

export default StoreList;