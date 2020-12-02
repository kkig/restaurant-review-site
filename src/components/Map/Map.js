import React, { useState, useContext, useEffect } from 'react';

// Component
import DialogWindow from './DialogWindow';

// CSS
import './Map.css';

// react-google-maps
import {
  GoogleMap,
  Circle,
  Marker,
  InfoWindow,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';

// MobX
import { useObserver } from 'mobx-react';

// Style for map
import mapStyle from './mapStyle.json';

// Store
import StoreContext from '../../stores/StoreContext';

const Map = withScriptjs(
  withGoogleMap((props) => {
    const [clickedPosition, setClickedPosition] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const [open, setOpen] = useState(false);

    const store = useContext(StoreContext);

    const handleClose = () => {
      setOpen(false);
      setClickedPosition(null);
    };

    // Map Handler
    const handleMapClick = (e) => {
      setClickedPosition({
        ...clickedPosition,
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
      setOpen(true);
    };

    useEffect(() => {
      !open && setClickedPosition(null);
    }, [open]);

    return useObserver(() => (
      <div>
        <GoogleMap
          defaultZoom={15}
          defaultCenter={props.center}
          defaultOptions={{
            styles: mapStyle,
            disableDefaultUI: true,
          }}
          onClick={(e) => handleMapClick(e)}
        >
          <Circle
            center={props.center}
            radius={30}
            options={{
              strokeColor: 'royalblue',
              strokeOpacity: 0.25,
              strokeWeight: 7,
              fillColor: 'royalblue',
              fillOpacity: 1,
            }}
          />

          {store.ShopDataItem.map((restaurant) => (
            <Marker
              key={restaurant.id}
              position={{
                lat: restaurant.lat,
                lng: restaurant.long,
              }}
              onClick={() => {
                setSelectedPlace(restaurant);
              }}
            />
          ))}

          {selectedPlace && (
            <InfoWindow
              onCloseClick={() => {
                setSelectedPlace(null);
              }}
              position={{
                lat: selectedPlace.lat,
                lng: selectedPlace.long,
              }}
            >
              <div>
                <h2>{selectedPlace.name}</h2>
                <p>{selectedPlace.address}</p>
              </div>
            </InfoWindow>
          )}

          <DialogWindow
            open={open}
            handleClose={handleClose}
            clickedPosition={clickedPosition}
          />
        </GoogleMap>
      </div>
    ));
  })
);

export default Map;
