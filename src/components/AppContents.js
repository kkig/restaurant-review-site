import React, { useState, useEffect, useContext } from 'react';

// Components
import MapContainer from './AppContents/MapContainer';
import StoreListContainer from './AppContents/StoreListContainer';

// CSS
import './AppContents.css';

// Store
import StoreContext from '../stores/StoreContext';
import restaurantData from '../APIs/restaurantData.json';

// Tools
import { usePlaces } from '../APIs/usePlaces';
import { usePosition } from '../APIs/usePosition';

const AppContents = ({ isMobileView, isMapView }) => {
    const { latitude, longitude } = usePosition();

    const [ isPlaceStored, setPlaceStore ] = useState(false);

    const store = useContext(StoreContext);

    // Add init user location
    !!latitude && !!longitude && store.userLocation.length === 0 && store.addUserLocation(latitude, longitude);

    
    const { placesData, formatChanged } = usePlaces(store.userLocation.lat, store.userLocation.lng);
    
    if(formatChanged && !isPlaceStored) {
        
        placesData.map(shop => store.addNewShop(shop));
        setPlaceStore(true);
        
    } 
    
   /*
    useEffect(() => {
        const addCloseStores = () => {
            console.log(placesData)
            placesData.map(shop => store.addNewShop(shop));
            setPlaceStore(true);
        };

        !isPlaceStored && !!formatChanged && formatChanged.length > 0 && addCloseStores();

    }, [store, formatChanged, placesData, isPlaceStored]);
    */
    

    // Add json data to store
    useEffect(() => {
        !!store && store.countData === 0 && restaurantData.map(shop => store.addNewShop({...shop, dataSrc: 'json'}));
    }, [store]);    

    return (
        <main>
            {   
                !isMobileView || (!!isMobileView && isMapView) ?

                <MapContainer /> :

                null

            }
            {
                !isMobileView || (!!isMobileView && !isMapView) ?

                <StoreListContainer /> :

                null
            }
        </main>
    );
};

export default AppContents;