import React, { useState, useContext, useEffect } from 'react';

import { GoogleMap, Circle, Marker, InfoWindow } from 'react-google-maps';
import { useObserver } from 'mobx-react'; 

// Style for map
import mapStyle from './mapStyle.json';

// Google Map API key
import GOOGLE_MAP_API_KEY from '../../../APIs/GoogleMapKey';

import './Map.css';

import StoreContext from '../../../stores/StoreContext';
import ShopDataItem from '../../../classes/ShopDataItemClass';
import DialogWindow from './Map/DialogWindow';

function MapWithMarker(props) {
    const [ selectedPlace, setSelectedPlace ] = useState(null);
    const [ clickedPosition, setClicked ] = useState(null); 
    const [ clickedDetail, setClickedDetail ] = useState(null);
    const [ open, setOpen] = useState(false);
    const [ isNewShopInput, setNewShopInput ] = useState(false);
    
    const store = useContext(StoreContext);

    // Dialog handlers
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        setClickedDetail(null);
        setNewShopInput(false);
    };

    const handleSubmit = () => {
        store.addNewShop(clickedDetail);
        handleClose();
        console.log('New shop stored');
        console.log(clickedDetail);
    };

    const handleDialogRatingChange = (e, newValue) =>
        setClickedDetail({
        ...clickedDetail,
        avgRating: parseFloat(newValue)
    });

    const handleDialogNameChange = (e, newValue) =>
        setClickedDetail({
            ...clickedDetail,
            name: newValue
    });

    const handleDialogTypeChange = (e, newValue) =>
        setClickedDetail({
        ...clickedDetail,
        type: newValue
    })

    const handleDialogAddressChange = (e, newValue) => 
        setClickedDetail({
        ...clickedDetail,
        address: newValue
    })

    // Map Handler
    const handleMapClick = e => {
        setClicked({
            ...clickedPosition, 
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
            .then(
                data => data.status === 'OK' ? 
                setClickedDetail(
                        
                    new ShopDataItem(

                        store.ShopDataItem.length + 1, //id
                        '', //name
                        'Restaurant',   //type
                        data.results[0].formatted_address, //address
                        clickedPosition.lat,    //lat
                        clickedPosition.lng,    //long
                        2.5,    //avgRating
                        [], //ratings
                        'userInput' //dataSrc
                    )

                ) : 
                console.log('Error with Geocode API'))

            .catch(err => console.log(`Error with geocode: ${err}`));

            // Reset data 
            setClicked(null);

        console.log('Geocode Fetched');
    };

    // Get Geocode of Clicked position
    clickedPosition && fetchPositionInfo();

    // Enable dialog
    useEffect(() => {
        clickedDetail && clickedDetail.address && open && setNewShopInput(true);
    }, [clickedDetail, open]);

    return useObserver(() => (
        <div>
            <GoogleMap
                defaultZoom={15}
                defaultCenter={props.center}
                defaultOptions={{
                    styles: mapStyle,
                    disableDefaultUI: true
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
                        lng: selectedPlace.long
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
                    clickedDetail={clickedDetail}
                    isNewShopInput={isNewShopInput}
                    
                    handleDialogNameChange={handleDialogNameChange}
                    handleDialogTypeChange={handleDialogTypeChange}
                    handleDialogAddressChange={handleDialogAddressChange}
                    handleDialogRatingChange={handleDialogRatingChange}
                    handleSubmit={handleSubmit}
                />

            </GoogleMap>
        </div>
    ));
}

export default MapWithMarker;