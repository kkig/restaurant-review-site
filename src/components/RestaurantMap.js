import React, { useState, useEffect } from 'react';
import {
    withGoogleMap,
    withScriptjs
} from 'react-google-maps';
import { usePosition } from '../APIs/usePosition';

import MapWithMarker from '../APIs/Map';
import CircularProgress from '../UIComponents/CircularIndeterminate';

import GOOGLE_MAP_API_KEY from '../APIs/GoogleMapKey';

import './RestaurantMap.css';

const MapContainer = withScriptjs(withGoogleMap(MapWithMarker));

function RestaurantMap() {
    const [ [userLat, userLng], setPosition ] = useState([]);
    const {latitude, longitude} = usePosition();

    useEffect(() => {
        return setPosition([latitude, longitude]);
    }, [latitude, longitude]);

    return (
        <div className='map-section' >              
            {userLat && userLng ? 
            <MapContainer 
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`}
                center={{ lat: userLat, lng: userLng }}
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '100%', width: '100%' }} />}
                mapElement={<div style={{ height: '100%', width: '100%' }} />}
            /> :
            <CircularProgress size={ '5rem' } style={{ justifyContent: 'center' }} />}
        </div>
    );

}

export default RestaurantMap;