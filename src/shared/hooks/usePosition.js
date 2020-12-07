import { useState, useEffect } from 'react';

export const usePosition = () => {
  const [position, setPosition] = useState({}); // callback
  const [error, setError] = useState(null);
  const [isSuccess, setSuccess] = useState(null);
  const [isLocationFetched, setLocationFetched] = useState(false);

  const onChange = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    setLocationFetched(true);
    setSuccess(true);
  };

  const onError = (error) => {
    setError(error.message);
    setLocationFetched(true);
    setSuccess(false);
    console.log(error.message);
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

  return { ...position, error, isSuccess, isLocationFetched };
};
