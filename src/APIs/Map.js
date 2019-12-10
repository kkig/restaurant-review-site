import React, { useState, useContext } from 'react';

import { 
    GoogleMap, 
    Circle,
    Marker,
    InfoWindow
} from 'react-google-maps';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import mapStyle from '../APIs/mapStyle.json';
import GOOGLE_MAP_API_KEY from '../APIs/GoogleMapKey';
import '../components/RestaurantMap.css';

import StoreContext from '../stores/StoreContext';
//import ShopDataItem from '../components/ShopDataItemClass';
import { useObserver } from 'mobx-react'; 
//import { usePosition } from './usePosition';

function MapWithMarker(props) {
    const [ selectedPlace, setSelectedPlace ] = useState(null);
    const [ clickedPosition, setClicked ] = useState(null); 
    const [ clickedDetail, setClickedDetail ] = useState(null);
    const [open, setOpen] = useState(false);

    //const { latitude, longitude } = usePosition();

    const [ clickedAddress, setClickedAddress ] = useState('');

    const store = useContext(StoreContext);

    clickedAddress == null && store.clickedLocation.address && setClickedAddress(store.clickedLocation.address);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
        setClickedDetail(null);
    };

    const handleMapClick = e => {
        setClicked({...clickedPosition, 
            lat: e.latLng.lat(), 
            lng: e.latLng.lng()}
        )
        handleClickOpen();
    };

    const fetchPositionInfo = () => {
        const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${clickedPosition.lat},${clickedPosition.lng}&radius=1500&type=restaurant&key=${GOOGLE_MAP_API_KEY}`;
        const proxy = `https://cors-anywhere.herokuapp.com/`;

        fetch(proxy + endpoint)
            .then(res => res.json())
            .then(data => data.status ==='OK' ? 
                setClickedDetail(
                    {
                    ...clickedDetail,
                    id: data.results[0].place_id,
                    lat: clickedPosition.lat,
                    lng: clickedPosition.lng,
                    address: data.results[0].formatted_address
                    }
                ) : 
                console.log('Error with Geocode API'));
            setClicked(null);

        console.log('Geocode Fetched');
    };
    
    clickedPosition && console.log(clickedPosition);
    clickedPosition && fetchPositionInfo();
    clickedDetail && console.log(clickedDetail);

    /*
    useEffect(() => {
        clickedDetail !== null && 
        store.storeClickedLocation(
            clickedDetail.id,   //id
            clickedDetail.lat,    //lat
            clickedDetail.lng,    //lng
            clickedDetail.address,  //address
        );
        
    }, [clickedDetail, store]);

    */
    store.userLocation.length > 0 && console.log(store.userLocation);

    return useObserver(() => (
        <div>
            <GoogleMap
                defaultZoom={15}
                defaultCenter={props.center}
                defaultOptions={{
                    styles: mapStyle,
                    disableDefaultUI: true,
                }}
                onClick={e => handleMapClick(e)}
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

                {store.ShopDataItem.map(restaurant => (
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

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add New restaurant?</DialogTitle>

                    <DialogContent>
                        {clickedDetail && clickedDetail.address ?
                            <div>
                            <DialogContentText>
                                To subscribe to this website, please enter your email address here. We will send updates
                                occasionally.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Restaurant Name"
                                defaultValue="Helloooo"
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                label="Address"
                                defaultValue={clickedDetail.address}
                                onChange={e => setClickedAddress(e.target.value)}
                                fullWidth
                            />
                        </div> : <CircularProgress className='circularProgress' />
                        }
                    </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleClose} color="primary">
                                    Add
                                </Button>
                            </DialogActions>                    
                </Dialog>
            </GoogleMap>

        </div>        
    ));
}

export default MapWithMarker;