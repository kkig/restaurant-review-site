import React from 'react';

import './StoreLists.css';
//import ReviewFilter from '../UIComponents/ReviewFilter';
import FilterButton from '../UIComponents/FilterButton';
import StoreItem from './StoreItem';

import restaurantData from '../APIs/restaurantData.json';

function StoreLists(props) {
  

    return (
      <div className='store-section'>
        <FilterButton />
        <div className='lists-container'>
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
      </div>        
    );
}

export default StoreLists;
