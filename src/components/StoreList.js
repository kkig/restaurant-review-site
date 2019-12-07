import React, { useContext } from 'react';


import './StoreLists.css';
import StoreItem from './StoreItem';

//import { usePlaces } from '../APIs/usePlaces';

import StoreContext from '../stores/StoreContext';
//import { useObserver } from 'mobx-react';

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
  //const { placesData } = usePlaces();
  //const [ isLoading, setLoading ] = useState(true);

  const store = useContext(StoreContext);
  //placesData.length > 0 && console.log(placesData);

  //console.log(`Store: ${store.shopData[0].name}`);

  /*
  useEffect(() => {
    placesData.results && setLoading(false);
  }, [placesData]);
  */

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
      const avgRate = restaurant.ratings ? getAverageValue(restaurant.ratings): null;
      return evalMinMax(avgRate);
    }    

    return (
        <div className='lists-container'>

          {store.shopData.filter(btwMinMax).map(restaurant => (
            
            <StoreItem 
              key={restaurant.id}
              name={restaurant.name}
              type={restaurant.type}
              address={restaurant.address}
              lat={restaurant.lat}
              lng={restaurant.long}
              value={restaurant.ratings}
              avgValue={getAverageValue(restaurant.ratings)}
            />   
          ))}
          
          {/*
            !isLoading && 
            <div className="google-stores">
              <h3>Restaurants from Google</h3>
              {placesData.results.filter(dataBtwMinMax).map(restaurant => (

              <StoreItem                                
              key={restaurant.id}
              name={restaurant.name} 
              type={restaurant.types[0]}  // Only display first one
              address={restaurant.vicinity}
              lat={restaurant.geometry.location.lat}
              lng={restaurant.geometry.location.lng}
              avgValue={restaurant.rating}
              placeId={restaurant.place_id}
              />
              ))}
            </div>
            */
          }
          
        </div>
    );
}

export default StoreList;