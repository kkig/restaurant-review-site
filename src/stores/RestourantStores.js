import React, { useState } from 'react';
import { useLocalStore } from 'mobx-react';
//import { toJS } from 'mobx';

import StoreContext from './StoreContext';
import restaurantData from '../APIs/restaurantData.json';

import { usePlaces } from '../APIs/usePlaces';

const StoreProvider = ({children}) => {
    const { placesData, formatChanged } = usePlaces();
    const [ isPlaceStored, setPlaceStore ] = useState(false);

    const store = useLocalStore(() => ({
        shopData: [],
        addNewShop: newShop => {
            store.shopData.push(newShop);
        },
        get countData() {
            return store.shopData.length;
        },
        addNewComment: (id, newComment) => {
            const updated = store.shopData.filter(shop => (
                shop.id === id && (
                    shop.ratings.unshift(newComment))
                )
            );
            console.log(updated);
        }
    }));

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
    //formatChanged && placesData.map(shop => store.addNewShop(shop));
    /*
    useState(() => {
        if(placesData.length > 0) { 
            store.addNewShop(placesData);
            console.log(store.shopData);
        };            
    }, [placesData]);
    */
    //placesData.length > 0 && console.log(placesData);

    //store.shopData.map(shop => console.log(shop.dataSrc));
    /*
    if(placesData) { 
        store.addNewShop(placesData);
        console.log(store.shopData);
    };
    */
    

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
}


export default StoreProvider;