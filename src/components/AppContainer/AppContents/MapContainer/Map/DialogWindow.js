import React, { useState, useContext, useEffect } from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

// Component
import DialogContentInfo from './DialogWindow/DialogContentInfo';

// Google Map API key
import GOOGLE_MAP_API_KEY from '../../../../../APIs/GoogleMapKey';

// Class
import ShopDataItem from '../../../../../classes/ShopDataItemClass';

// Store
import StoreContext from '../../../../../stores/StoreContext';

const DialogWindow = ({ open, clickedPosition, handleClose }) => {
    const [ clickedDetail, setClickedDetail ] = useState(null);

    const store = useContext(StoreContext);

    const handleSubmit = () => {
        const addToStore = () => {
            store.addNewShop(clickedDetail);
            handleClose();
            console.log('New shop stored');
            setClickedDetail(null);
        }

        !!clickedDetail.name && !!clickedDetail.address && addToStore();

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

    /*
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
            //setClickedPosition(null);

        console.log('Geocode Fetched');
    };
    */

    useEffect(() => {
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
                //setClickedPosition(null);
    
            console.log('Geocode Fetched');
        };

        !!clickedPosition && !clickedDetail && fetchPositionInfo();
    }, [clickedPosition, clickedDetail, store.ShopDataItem.length]);

    // Reset clickedDetail value if clickedPosition is null
    useEffect(() => {
        !clickedPosition && setClickedDetail(null);
    }, [clickedPosition])

    return (
        <Dialog
            className="dialog-rating"
            style={{ margin: '.5em 0'}}
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
            Add New restaurant?
            </DialogTitle>
            {
            <DialogContentInfo 
                clickedDetail={clickedDetail}
                handleDialogNameChange={handleDialogNameChange}
                handleDialogTypeChange={handleDialogTypeChange}
                handleDialogAddressChange={handleDialogAddressChange}
                handleDialogRatingChange={handleDialogRatingChange}
            />}

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>

                <Button onClick={handleSubmit} color="primary">
                    Add
                </Button>
            </DialogActions>

        </Dialog>
    );
};

export default DialogWindow;