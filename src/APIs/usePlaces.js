import { useState, useEffect } from 'react';
import { usePosition } from './usePosition';

import GOOGLE_MAP_API_KEY from './GoogleMapKey';

export const usePlaces = () => {
    const { latitude, longitude, isLocationReady } = usePosition();
    const [ placesData, setPlaces ] = useState({});
    //const [ isPlaceFetching, setPlaceFetch ] = useState(true);

    //const [ isLocationReady, setLocationReady ] = useState(false);
    //const [ isPlacesFetched, setPlacesFetch ] = useState(false);
    /*
    useEffect(() => {
        typeof latitude == 'number' && typeof longitude == 'number' && setLocationReady(true);
    }, [latitude, longitude]);
    */

   useEffect(() => {
        if(!isLocationReady) {
            return;
        } 

        const fetchData = () => {
            const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${GOOGLE_MAP_API_KEY}`;
            const proxy = `https://cors-anywhere.herokuapp.com/`;
        
            fetch(proxy + endpoint)
                .then(res => res.json())
                .then(data => setPlaces(data))
                .catch(error => console.log(error));

            console.log(endpoint)
            //setPlaceFetch(false);
        }

        fetchData();
        
        //console.log(placesSummany);
        //latitude && longitude && alert(`lat: ${latitude}, lng: ${longitude}`);
    }, [isLocationReady, latitude, longitude]);

    return {placesData};
}
