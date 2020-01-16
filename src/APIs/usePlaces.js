import { useState, useEffect } from 'react';

import GOOGLE_MAP_API_KEY from './GoogleMapKey';

import ShopDataItem from '../classes/ShopDataItemClass';

export const usePlaces = (latitude, longitude) => {
    const [ placesData, setPlaces ] = useState({});
    const [ formatChanged, setFormat ] = useState(false);
    const [ isPlaceRequested, setPlaceRequested ] = useState(false);

    const getPlacesData = () => {
        if(!!isPlaceRequested || placesData.results) {
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
        data.map(restaurant => newArray.push(
            new ShopDataItem(

            restaurant.place_id, 
            restaurant.name, 
            restaurant.types[0], 
            restaurant.vicinity, 
            restaurant.geometry.location.lat,
            restaurant.geometry.location.lng,
            restaurant.rating,
            [],
            'GOOGLE',
        )
        ));

        setPlaces(newArray);
        setFormat(true);
        console.log('Formatted')
    };

    useEffect(() => {
        if(placesData.results) {
            formatData(placesData.results);
        } 
    }, [placesData]);

    latitude !== undefined && longitude !== undefined && !isPlaceRequested && getPlacesData();
    
    return { placesData, formatChanged };
}