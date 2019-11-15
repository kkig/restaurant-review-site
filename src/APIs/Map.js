import React from 'react';
import { 
    withScriptjs,
    withGoogleMap,
    GoogleMap, 
    Marker 
} from 'react-google-maps';

import mapStyle from '../APIs/mapStyle.js';

const initLocation = {
    lat: 48.2084114, 
    lng: 16.3734707
};

const MapWithMarker = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap
            className={'map-section'}
            style={{ width: '100%', height: '100%' }}
            defaultZoom={15}
            defaultCenter={initLocation}
            center={props.center}
            defaultOptions={{
                styles: mapStyle,
                disableDefaultUI: true,
                draggable: true,
                scrollwheel: true,
                scaleControl: true
            }}
        >
            <Marker
                position={props.center} 
            />
        </GoogleMap>
    ))
)

export default MapWithMarker;