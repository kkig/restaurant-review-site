import React, { useState } from 'react';
import { useLocalStore } from 'mobx-react';

import StoreContext from './StoreContext';
import restaurantData from '../APIs/restaurantData.json';

import { usePlaces } from '../APIs/usePlaces';
import { usePosition } from '../APIs/usePosition';

const StoreProvider = ({children}) => {
    //const { ...position } = usePosition();
    const { placesData, formatChanged } = usePlaces();
    const [ isPlaceStored, setPlaceStore ] = useState(false);
    const { latitude, longitude } = usePosition();

    const store = useLocalStore(() => ({
        ShopDataItem: [],
        addNewShop: newShop => {
            store.ShopDataItem.push(newShop);
        },
        get countData() {
            return store.ShopDataItem.length;
        },
        addNewComment: (id, newComment) => {
            store.ShopDataItem.filter(shop => (
                shop.id === id && (
                    shop.ratings.unshift(newComment))
                )
            );
            //console.log(updated);
        },
        userLocation: [],
        addUserLocation: (lat, lng) => {
            store.userLocation = {...store.userLocation, lat: lat, lng: lng };
            console.log('Location stored');
        },
        clickedLocation: [],
        storeClickedLocation: (id, lat, lng, address) => {
            store.clickedLocation = {
                ...store.clickedLocation, 
                id: id, 
                lat: lat, 
                lng: lng, 
                address: address
            };
            console.log(store.clickedLocation)
        } 
    }));
    
    useState(() => {
        console.log(restaurantData)
        restaurantData.map(shop => store.addNewShop({...shop, dataSrc: 'json'}));
        console.log(store.ShopDataItem);
    }, []);

    useState(() => {
        
    }, [latitude, longitude]);

    if(latitude !== undefined && longitude !== undefined) {
        !store.userLocation.lat && !store.userLocation.lng && store.addUserLocation(latitude, longitude);
    } 

    //store.userLocation.lat && store.userLocation.lat && console.log(`Store Lat: ${store.userLocation.lat}, ${store.userLocation.lng}`);
    

    //store.userLocation.length > 0 && console.log(store.userLocation);

    if(formatChanged && !isPlaceStored) {
        placesData.map(shop => store.addNewShop(shop));
        setPlaceStore(true);
        console.log(store.ShopDataItem);
    }

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
}


export default StoreProvider;