import { useState, useEffect } from 'react';
import { usePosition } from './usePosition';

import GOOGLE_MAP_API_KEY from './GoogleMapKey';
//import StoreContext from '../stores/StoreContext';

class shopData {
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
    //const [ isPlaceRequested, setPlaceRequested ] = useState(false);

    //const store = useContext(StoreContext);

    useEffect(() => {
        if(!latitude || !longitude) {
            return;
        } 
        
        //const geo = navigator.geolocation;

        const fetchData = () => {
            const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${GOOGLE_MAP_API_KEY}`;
            const proxy = `https://cors-anywhere.herokuapp.com/`;
        
            fetch(proxy + endpoint)
                .then(res => res.json())
                .then(data => {
                    setPlaces(data)
                    //console.log(placesData);
                    /*
                    const newData = formatData(data.results);
                    setPlaces(newData);
                    console.log(placesData);
                    placesData.map(restaurant => store.addNewShop(restaurant));
                    
                    //store.addNewShop(placesData);
                    console.log(store.shopData);
                    */
                    
                })
                .catch(error => console.log(error));
            console.log('Place fetched');
        }
        fetchData();
        /*
        const watcher = geo.watchPosition(fetchData, console.log('Geolocation error'));

        return () => geo.clearWatch(watcher);
        */

    }, [latitude, longitude]);
    
    const formatData = data => {
        let newArray = [];
        data.map(restaurant => newArray.push(new shopData(
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
        
        //console.log(placesData);
    };

    /*
    if(placesData.results && !isPlaceRequested) {
        formatData(placesData.results);
        setPlaceRequested(true);
    } else {
        return;
    }
    */

    useEffect(() => {

        if(placesData.results) {
            formatData(placesData.results);
            //console.log(placesData);
        } else {
            if(placesData.length > 0) {
                /*
                placesData.map(restaurant => store.addNewShop(restaurant));
                store.countData > 0 && console.log(store.shopData);
                */
                //console.log(placesData);
                //console.log(formatChanged);
            };
        }
    }, [placesData])

    
    /*
    if(placesData.results) {
        formatData(placesData.results);
        console.log(placesData.results);
        //store.shopData = [...store.shopData, ...placesData.results];
        //store.countData > 0 && console.log(store.shopData);
        //store.addNewShop(placesData);
        //console.log(store.countData);
    }
    */
    
    
    return { placesData, formatChanged };
}
