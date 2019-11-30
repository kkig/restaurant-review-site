import { useState, useEffect } from 'react';
import { usePosition } from './usePosition';

import GOOGLE_MAP_API_KEY from './GoogleMapKey';

export const usePlaces = () => {
    const { latitude, longitude } = usePosition();
    const [ placesData, setPlaces ] = useState({});


    useEffect(() => {
        
        const fetchData = () => {
            const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${GOOGLE_MAP_API_KEY}`;
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            fetch(proxy + endpoint)
                .then(res => res.json())
                .then(data => setPlaces(data));
            //console.log(endpoint)

        }

        latitude !== undefined && fetchData();
        
        //console.log(placesSummany);
       //latitude && longitude && alert(`lat: ${latitude}, lng: ${longitude}`);
    }, [latitude, longitude]);

    /*
    useEffect(() => {
        const fetchData = () => {
            const src = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${GOOGLE_MAP_API_KEY}`;
            fetch(src)
                .then(res => res.json())
                .then(data => setSummary({data}));
                console.log('running')
        }
        
        fetchData();
    }, [])
    */

    //placesSummany.length > 0 && console.log(placesSummany);        
    return {placesData};
}
