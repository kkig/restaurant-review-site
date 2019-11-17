import React from 'react';

import './StoreLists.css';
import StoreItem from './StoreItem';

import restaurantData from '../APIs/restaurantData.json';

function StoreLists(props) {
    return (
      <div className='store-section'>
        {restaurantData.map(restaurant => (
          <StoreItem 
            key={restaurant.id}
            name={restaurant.restaurantName}
            type={restaurant.restaurantType}
            address={restaurant.address}
            value={restaurant.ratings}
          />          
        ))}
      </div>        
    );
}

export default StoreLists;
