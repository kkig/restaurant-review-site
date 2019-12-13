import React, { useContext }  from 'react';
import {
    withGoogleMap,
    withScriptjs
} from 'react-google-maps';
import { useObserver } from 'mobx-react'; 

import MapWithMarker from '../APIs/Map';
import CircularProgress from '../UIComponents/CircularIndeterminate';

import GOOGLE_MAP_API_KEY from '../APIs/GoogleMapKey';
import StoreContext from '../stores/StoreContext';

import './RestaurantMap.css';

const MapContainer = withScriptjs(withGoogleMap(MapWithMarker));

function RestaurantMap() {

    const store = useContext(StoreContext);

    return useObserver(() => (
        <div className='map-section' >    

            {store.userLocation.lat && store.userLocation.lng ? 
            <MapContainer 
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`}
                center={{ lat: store.userLocation.lat, lng: store.userLocation.lng }}
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '100%', width: '100%' }} />}
                mapElement={<div style={{ height: '100%', width: '100%' }} />}
            /> :
            <CircularProgress size={ '5rem' } style={{ justifyContent: 'center' }} />}
        </div>
    ));

}

export default RestaurantMap;