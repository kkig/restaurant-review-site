import { useState, useEffect } from 'react';

export const usePosition = () => {
    const [ position, setPosition ] = useState({}); // callback
    const [ error, setError] = useState(null);
    const [ isLocationReady, setLocationReady ] = useState(false);
    
    const onChange = ({coords}) => {
        setPosition({
        latitude: coords.latitude,
        longitude: coords.longitude,
        });
        setLocationReady(true);
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