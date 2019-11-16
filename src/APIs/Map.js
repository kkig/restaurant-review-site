import React from 'react';
import { 
    withScriptjs,
    withGoogleMap,
    GoogleMap, 
    Circle 
} from 'react-google-maps';

import mapStyle from '../APIs/mapStyle.js';

const MapWithMarker = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap
            className={'map-section'}
            style={{ width: '100%', height: '100%' }}
            defaultZoom={15}
            defaultCenter={props.center}
            defaultOptions={{
                styles: mapStyle,
                disableDefaultUI: true,
            }}
        >   
            <Circle
                center={props.center}
                radius={30}
                options={{
                    strokeColor: "royalblue",
                    strokeOpacity: 0.25,
                    strokeWeight: 7,
                    fillColor: "royalblue",
                    fillOpacity: 1
                }}
            />
        </GoogleMap>
    ))
)

export default MapWithMarker;