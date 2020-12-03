import React, { useContext, useState } from 'react';

// Component
import SelectLocation from './SelectLocation';
import NoLocation from './NoLocationContent';

// Material UI
import Dialog from '@material-ui/core/Dialog';

// Store
import AppContext from '../../shared/contexts/AppContext';

// // Tools
// import { useGooglePlaces } from '../../shared/hooks/useGooglePlaces';

// Default location is Vienna
const defLocation = {
  lat: 48.2088475,
  lng: 16.371284,
};

const UserLocationDialog = ({ userLocation }) => {
  const [open, setOpen] = useState(true);
  // const [center, setCenter] = useState(null);
  const store = useContext(AppContext);
  // const [isPlaceStored, setPlaceStore] = useState(false);

  // const { placesData, isRequested, isDataReady } = useGooglePlaces(
  //   center.lat,
  //   center.lng
  // );

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    // Add user location
    store.addUserLocation(userLocation.lat, userLocation.lng);
    // setCenter(userLocation.lat, userLocation.lng);
    // updateContext();

    handleClose();
  };

  const handleDisagree = () => {
    store.addUserLocation(defLocation.lat, defLocation.lng);
    // setCenter(defLocation.lat, defLocation.lng);
    // updateContext();

    handleClose();
  };

  // if (isDataReady) {
  //   placesData.map((shop) => store.addNewShop(shop));
  // }
  // const updateContext = async () => {
  //   const position = await center;

  //   store.addUserLocation(position.lat, position.lng);
  //   placesData.map((shop) => store.addNewShop(shop));
  // };

  return (
    <Dialog
      open={open}
      onClose={handleDisagree}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      {!userLocation ? (
        <NoLocation handleDisagree={handleDisagree} />
      ) : (
        <SelectLocation
          handleDisagree={handleDisagree}
          handleAgree={handleAgree}
        />
      )}
    </Dialog>
  );
};

export default UserLocationDialog;
