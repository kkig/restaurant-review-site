import React, { useState, useContext } from 'react';

import { 
    GoogleMap, 
    Circle,
    Marker,
    InfoWindow
} from 'react-google-maps';

import mapStyle from '../APIs/mapStyle.json';

import StoreContext from '../stores/StoreContext';
//import { useObserver } from 'mobx-react'; 

function MapWithMarker(props) {
    const [ selectedPlace, setSelectedPlace ] = useState(null);
    
    const [ clickedPosition, setClicked ] = useState(null);

    const store = useContext(StoreContext);

    clickedPosition && console.log(clickedPosition);
    
    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={props.center}
            defaultOptions={{
                styles: mapStyle,
                disableDefaultUI: true,
            }}
            onClick={e => 
                setClicked({...clickedPosition, 
                lat: e.latLng.lat(), 
                lng: e.latLng.lng()})
            }
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

            {store.shopData.map(restaurant => (
                <Marker 
                    key={restaurant.id}
                    position={{
                        lat: restaurant.lat,
                        lng: restaurant.long
                    }}
                    onClick={() => { setSelectedPlace(restaurant) }}
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
                        <h2>{selectedPlace.name}</h2>
                        <p>{selectedPlace.address}</p>
                    </div>    
                </InfoWindow>
            )}
        </GoogleMap>        
    );
}

export default MapWithMarker;