import React, { useState, useEffect } from 'react';

import { 
    GoogleMap, 
    Circle,
    Marker,
    InfoWindow
} from 'react-google-maps';

import restaurantData from '../APIs/restaurantData.json';
import mapStyle from '../APIs/mapStyle.json';
import { usePlaces } from './usePlaces';

function MapWithMarker(props) {
    const [ selectedPlace, setSelectedPlace ] = useState(null);
    const [ isLoading, setLoading ] = useState(true);

    const { placesData } = usePlaces();

    useEffect(() => {
        placesData.status === 'OK' && setLoading(false);
    }, [placesData]);

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
                    onClick={() => { setSelectedPlace(restaurant) }}
                />
            ))}

            {!isLoading &&
                placesData.results.map(restaurant => (
                <Marker 
                    key={restaurant.id}
                    position={{
                        lat: restaurant.geometry.location.lat,
                        lng: restaurant.geometry.location.lng
                    }}
                    onClick={() => { setSelectedPlace({ ...selectedPlace, 
                        lat: restaurant.geometry.location.lat, 
                        long: restaurant.geometry.location.lng,
                        restaurantName: restaurant.name,
                        address: restaurant.vicinity }) }}
                />
            ))}

            {selectedPlace && (
                <InfoWindow
                    onCloseClick={() => { setSelectedPlace(null) }} 
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

export default MapWithMarker;