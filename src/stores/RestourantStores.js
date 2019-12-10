import React, { useState, useEffect } from 'react';
import { useLocalStore } from 'mobx-react';

import StoreContext from './StoreContext';
import restaurantData from '../APIs/restaurantData.json';

//import { usePlaces } from '../APIs/usePlaces';
import { usePosition } from '../APIs/usePosition';

import GOOGLE_MAP_API_KEY from '../APIs/GoogleMapKey';

import ShopDataItem from '../components/ShopDataItemClass';
//import StoreContext from '../stores/StoreContext';

const usePlaces = (latitude, longitude) => {
    //const { latitude, longitude } = usePosition();
    const [ placesData, setPlaces ] = useState({});
    const [ formatChanged, setFormat ] = useState(false);
    const [ isPlaceRequested, setPlaceRequested ] = useState(false);

    //const store = useContext(StoreContext);

    const getPlacesData = () => {
        if(isPlaceRequested || placesData.results) {
            return;
        }

        const fetchData = () => {
            const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${GOOGLE_MAP_API_KEY}`;
            const proxy = `https://cors-anywhere.herokuapp.com/`;
        
            fetch(proxy + endpoint)
                .then(res => res.json())
                .then(data => {
                    setPlaces(data)   
                })
                .catch(error => console.log(error));
            console.log('Place fetched');
        }
        fetchData();
        setPlaceRequested(true);
    };

    const formatData = data => {
        let newArray = [];
        data.map(restaurant => newArray.push(new ShopDataItem(
            restaurant.place_id, 
            restaurant.name, 
            restaurant.types[0], 
            restaurant.vicinity, 
            restaurant.geometry.location.lat,
            restaurant.geometry.location.lng,
            restaurant.rating,
            [],
            'GOOGLE',
        )));

        setPlaces(newArray);
        setFormat(true);
        console.log('Formatted')
    };

    useEffect(() => {
        if(placesData.results) {
            formatData(placesData.results);
        } 
    }, [placesData]);

    //formatChanged && console.log(placesData);

    //latitude && longitude && console.log('usePlace ready. Lat: ' + latitude)
    //if(store != null && store.userLocation.lat !== undefined)  {console.log('ready to fetch')};
    //latitude && longitude && !isPlaceRequested && getPlacesData();
    latitude !== undefined && longitude !== undefined && !isPlaceRequested && getPlacesData();
    //!isPlaceRequested && getPlacesData();
    
    return { placesData, formatChanged };
}

const StoreProvider = ({children}) => {
    //const { ...position } = usePosition();
    //const { placesData, formatChanged } = usePlaces();
    const { latitude, longitude } = usePosition();

    const [ isPlaceStored, setPlaceStore ] = useState(false);

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


    const { placesData, formatChanged } = usePlaces(store.userLocation.lat, store.userLocation.lng);

    if(formatChanged && !isPlaceStored) {
        placesData.map(shop => store.addNewShop(shop));
        setPlaceStore(true);
        console.log(store.ShopDataItem);
    }
    //console.log(placesData);

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
}

export default StoreProvider;