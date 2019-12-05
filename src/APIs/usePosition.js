import { useState, useEffect } from 'react';
//import GOOGLE_MAP_API_KEY from './GoogleMapKey';

export const usePosition = () => {
    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);
    const [ isLocationReady, setLocationReady ] = useState(false);
    /*
    const [ placesSummany, setSummary ] = useState({});
    const src = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.latitude},${position.longitude}&radius=1500&type=restaurant&key=${GOOGLE_MAP_API_KEY}`;
    */
    
    const onChange = ({coords}) => {
        setPosition({
        latitude: coords.latitude,
        longitude: coords.longitude,
        });
        setLocationReady(true);
  //    position.latitude && position.longitude && console.log(position);
    };

    const onError = (error) => {
        setError(error.message);
    };

    useEffect(() => {
        const geo = navigator.geolocation;
        if (!geo) {
            setError('Geolocation is not supported');
            return;
        }
        const watcher = geo.watchPosition(onChange, onError);
        
        return () => geo.clearWatch(watcher);
    }, []);

    return {...position, error, isLocationReady};
}