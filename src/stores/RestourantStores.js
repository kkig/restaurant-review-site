import React, { useState } from 'react';
import { useLocalStore } from 'mobx-react';

import StoreContext from './StoreContext';
import restaurantData from '../APIs/restaurantData.json';

import { usePlaces } from '../APIs/usePlaces';
import { usePosition } from '../APIs/usePosition';

const StoreProvider = ({children}) => {
    const { placesData, formatChanged } = usePlaces();
    const { latitude, longitude } = usePosition();
    const [ isPlaceStored, setPlaceStore ] = useState(false);
    const [ isLocationReady, setLocation ] = useState(false);

    const store = useLocalStore(() => ({
        shopData: [],
        userLocation: {},
        addNewShop: newShop => {
            store.shopData.push(newShop);
        },
        get countData() {
            return store.shopData.length;
        },
        addNewComment: (id, newComment) => {
            store.shopData.filter(shop => (
                shop.id === id && (
                    shop.ratings.unshift(newComment))
                )
            );
        },
        addUserLocation: (lat, lng) => {
            store.userLocation = { ...store.userLocation, lat: lat, lng: lng };
        }
    }));

    const getUserLocation = () => {
        store.addUserLocation(latitude, longitude);
        console.log(store.userLocation);
        setLocation(true);
        console.log('Location stored');
    };

    latitude && longitude && !isLocationReady && getUserLocation();

    useState(() => {
        console.log(restaurantData)
        restaurantData.map(shop => store.addNewShop({...shop, dataSrc: 'json'}));
        console.log(store.shopData);
    }, []);

    if(formatChanged && !isPlaceStored) {
        placesData.map(shop => store.addNewShop(shop));
        setPlaceStore(true);
        console.log(store.shopData);
    }

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
}


export default StoreProvider;