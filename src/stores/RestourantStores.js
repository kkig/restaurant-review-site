import React, { useState } from 'react';
import { useLocalStore } from 'mobx-react';

import StoreContext from './StoreContext';
import restaurantData from '../APIs/restaurantData.json';

import { usePlaces } from '../APIs/usePlaces';
//import { usePosition } from '../APIs/usePosition';

const StoreProvider = ({children}) => {
    //const { ...position } = usePosition();
    const { placesData, formatChanged } = usePlaces();
    const [ isPlaceStored, setPlaceStore ] = useState(false);

    const store = useLocalStore(() => ({
        storeData: [],
        addNewShop: newShop => {
            store.storeData.push(newShop);
        },
        get countData() {
            return store.storeData.length;
        },
        addNewComment: (id, newComment) => {
            store.storeData.filter(shop => (
                shop.id === id && (
                    shop.ratings.unshift(newComment))
                )
            );
            //console.log(updated);
        },
        userLocation: [],
        addUserLocation: (lat, lng) => {
            return {...store.userLocation, lat: lat, lng: lng };
        },
    }));
    
    useState(() => {
        console.log(restaurantData)
        restaurantData.map(shop => store.addNewShop({...shop, dataSrc: 'json'}));
        console.log(store.storeData);
    }, []);


    if(formatChanged && !isPlaceStored) {
        placesData.map(shop => store.addNewShop(shop));
        setPlaceStore(true);
        console.log(store.storeData);
    }

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
}


export default StoreProvider;