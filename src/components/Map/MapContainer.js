import React, { useContext }  from 'react';


// Components
import Map from './Map';

// Material UI
import CircularProgress from '../../UIComponents/Loading';

// CSS
import './MapContainer.css';

// Store
import StoreContext from '../../stores/StoreContext';

// react-google-maps
import { withGoogleMap, withScriptjs } from 'react-google-maps';

// MobX
import { useObserver } from 'mobx-react'; 

const MapContent = withScriptjs(withGoogleMap(Map));


function MapContainer() {
    const store = useContext(StoreContext);

    // Google API Key
    const GOOGLE_API_KEY = process.env.NODE_ENV === 'production' ? 
        process.env.REACT_APP_PROD_GOOGLE_KEY : 
        process.env.REACT_APP_DEV_GOOGLE_KEY;


    const endpoint = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;

    return useObserver(() => (
        <div className='map-section' >    
        
            {   
                !!store.userLocation.lat && !!store.userLocation.lng ? 
                    <MapContent 
                        googleMapURL={endpoint}
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