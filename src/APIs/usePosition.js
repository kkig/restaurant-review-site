import { useState, useEffect } from 'react';
//import GOOGLE_MAP_API_KEY from './GoogleMapKey';

export const usePosition = () => {
    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);
    /*
    const [ placesSummany, setSummary ] = useState({});
    const src = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.latitude},${position.longitude}&radius=1500&type=restaurant&key=${GOOGLE_MAP_API_KEY}`;
    */
    
    const onChange = ({coords}) => {
        setPosition({
        latitude: coords.latitude,
        longitude: coords.longitude,
        });
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
        /*
        fetch(src)
            .then(res => res.json())
            .then(data => setSummary({data}));
            console.log('running')
        
        console.log(placesSummany);
        */
       //console.log(position.latitude);
        return () => geo.clearWatch(watcher);
    }, []);

    /*
    useEffect(() => {
        position !== undefined && console.log(position.latitude)
    }
    , [position])
    */
    return {...position, error};
}