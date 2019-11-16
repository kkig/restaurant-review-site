import React, { useState } from 'react';
import { 
//    withScriptjs,
//    withGoogleMap,
    GoogleMap, 
    Circle,
    Marker,
    InfoWindow
} from 'react-google-maps';

import restaurantData from '../APIs/restaurantData.json';
import mapStyle from '../APIs/mapStyle.json';

function MapWithMarker(props) {
    const [ selectedPlace, setSelectedPlace ] = useState(null);

    return (
        <GoogleMap
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

            {restaurantData.map(restaurant => (
                <Marker 
                    key={restaurant.id}
                    position={{
                        lat: restaurant.lat,
                        lng: restaurant.long
                    }}
                    onClick={() => { setSelectedPlace(restaurant); }}
                />
            ))}

            {selectedPlace && (
                <InfoWindow
                    onCloseClick={() => { setSelectedPlace(null); }} 
                    position={{
                        lat: selectedPlace.lat,
                        lng: selectedPlace.long
                    }}
                >
                    <div>
                        <h2>{selectedPlace.restaurantName}</h2>
                        <p>{selectedPlace.address}</p>
                    </div>    
                </InfoWindow>
            )}
        </GoogleMap>        
    );
}
/*
const MapWithMarker = withScriptjs(
    cosnt [ selectedPlace, setSelectedPlace] = useState(null);
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
            {restaurantData.map(restaurant => (
                <Marker 
                    key={restaurant.id}
                    position={{
                        lat: restaurant.lat,
                        lng: restaurant.long
                    }}
                    
                />
            ))}
        </GoogleMap>
    ))
)
*/
export default MapWithMarker;