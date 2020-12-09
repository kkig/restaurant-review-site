import React, { useState, useContext, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';

// Components
import DialogWindow from './DialogWindow';

// Material UI
import LoadingIcon from '../../shared/elements/Loading';

// Store
import AppContext from '../../shared/contexts/AppContext';

// MobX
import { useObserver } from 'mobx-react';

// react-google-maps
import {
  GoogleMap,
  Circle,
  Marker,
  InfoWindow,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';

// Style for map
import mapStyle from './mapStyle.json';

// Google API Key
const GOOGLE_API_KEY =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_GOOGLE_KEY
    : process.env.REACT_APP_DEV_GOOGLE_KEY;

const endpoint = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;

const MapWrapper = styled(Box)({
  background: '#f7f7f7;',
  height: '100%',
});

const Map = withScriptjs(
  withGoogleMap((props) => {
    const [clickedPosition, setClickedPosition] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const [open, setOpen] = useState(false);

    const store = useContext(AppContext);

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

    return (
      <>
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
      </>
    );
  })
);

function MapContainer() {
  const store = useContext(AppContext);

  return useObserver(() => (
    <>
      {!store.userLocation.lat || !store.userLocation.lng ? (
        <LoadingIcon />
      ) : (
        <MapWrapper>
          <Map
            googleMapURL={endpoint}
            center={{
              lat: store.userLocation.lat,
              lng: store.userLocation.lng,
            }}
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '100%', width: '100%' }} />}
            mapElement={<div style={{ height: '100%', width: '100%' }} />}
            className='map-content'
          />
        </MapWrapper>
      )}
    </>
  ));
}

export default MapContainer;
