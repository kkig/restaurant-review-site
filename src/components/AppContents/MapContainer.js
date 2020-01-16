import React, { useContext }  from 'react';
import { withGoogleMap, withScriptjs } from 'react-google-maps';
import { useObserver } from 'mobx-react'; 

import Map from './MapContainer/Map';
import CircularProgress from '../../UIComponents/Loading';

import GOOGLE_MAP_API_KEY from '../../APIs/GoogleMapKey';
import StoreContext from '../../stores/StoreContext';

import './MapContainer.css';

const MapContent = withScriptjs(withGoogleMap(Map));

function MapContainer() {
    const store = useContext(StoreContext);
    const apiKey = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;

    return useObserver(() => (
        <div className='map-section' >    
        
            {   
                !!store.userLocation.lat && !!store.userLocation.lng ? 
                    <MapContent 
                        googleMapURL={apiKey}
                        center={{ lat: store.userLocation.lat, lng: store.userLocation.lng }}
                        loadingElement={<div style={{ height: '100%' }} />}
                        containerElement={<div style={{ height: '100%', width: '100%' }} />}
                        mapElement={<div style={{ height: '100%', width: '100%' }} />}
                        className='map-content'
                    /> :

                    <CircularProgress />
            }

        </div>
    ));

}

export default MapContainer;