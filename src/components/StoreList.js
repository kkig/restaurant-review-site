import React, { useContext, useState, useEffect } from 'react';


import './StoreLists.css';
import StoreItem from './StoreItem';

import StoreContext from '../stores/StoreContext';
import { useObserver } from 'mobx-react';

/*
const StoreHeader = () => {
  const store = useContext(StoreContext);
  return useObserver(() => <h1>{store.nameCount}</h1>)
}

const DisplayList = () => {
  const store = useContext(StoreContext);

  return useObserver(() => (
    <ul>
      <StoreHeader />
      {store.name.map(shopName => <li key={shopName}>{shopName}</li>)}
    </ul>
  ));
};

const StoreNames = () => {
  const store = useContext(StoreContext);
  const [shop, setShop] = useState('');

  return (
    <form
      onSubmit={e => {
        store.addShop(shop);
        setShop('');
        e.preventDefault();
      }}
    >
      <DisplayList />
      <input 
        type="text"
        value={shop}
        onChange={e => {
          setShop(e.target.value);
        }}
      />
      <button type="submit">Add</button>
    </form>
  )
};
*/

function StoreList(props) {
  const store = useContext(StoreContext);
  const [ storeData, setStoreData ] = useState(null);

  useEffect(() => {
    setStoreData(store.storeData);
  }, [store.storeData]);
    
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

    /*
    const dataBtwMinMax = restaurant => {
      return evalMinMax(restaurant.rating);
    }
    */
    
    const btwMinMax = restaurant => {

      const avgRate = restaurant.ratings.length > 0 ? 
        getAverageValue(restaurant.ratings) : 
        restaurant.avgRating;

        return evalMinMax(avgRate);
    }    

    return useObserver(() => (
        <div className='lists-container'>

          {!storeData ? null : 
            storeData.filter(btwMinMax).map(restaurant => (
            
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
                getAverageValue(restaurant.ratings):
                restaurant.avgRating
              }
            />   
          ))}
          
        </div>
    ));
}

export default StoreList;