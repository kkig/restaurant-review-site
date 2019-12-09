import { useState, useEffect, useContext } from 'react';
import { usePosition } from './usePosition';

import StoreContext from '../stores/StoreContext';
import GOOGLE_MAP_API_KEY from './GoogleMapKey';


//import StoreContext from '../stores/StoreContext';

class storeData {
    constructor(id, name, type, address, lat, long, avgRating, ratings, dataSrc) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.address = address;
        this.lat = lat;
        this.long = long;
        this.avgRating = avgRating;
        this.ratings = ratings;
        this.dataSrc = dataSrc;
    }
}

export const usePlaces = () => {
    const { latitude, longitude } = usePosition();
    const [ placesData, setPlaces ] = useState({});
    const [ formatChanged, setFormat ] = useState(false);
    const [ isPlaceRequested, setPlaceRequested ] = useState(false);

    const store = useContext(StoreContext);

    const getPlacesData = () => {
        if(!latitude || !longitude) {
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
        data.map(restaurant => newArray.push(new storeData(
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

    };

    store && latitude && longitude && store.addUserLocation(latitude, longitude);

    useEffect(() => {
        if(placesData.results) {
            formatData(placesData.results);
        } 
    }, [placesData])

    store && store.userLocation.lat && console.log(store.userLocation);

    latitude && longitude && !isPlaceRequested && getPlacesData();
    
    return { placesData, formatChanged };
}