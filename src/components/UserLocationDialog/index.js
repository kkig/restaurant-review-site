import React, { useContext, useState } from 'react';

// Component
import SelectLocation from './SelectLocation';
import NoLocation from './NoLocationContent';

// Material UI
import Dialog from '@material-ui/core/Dialog';

// Store
import AppContext from '../../shared/contexts/AppContext';

// Tools
import { usePlaces } from './usePlaces';

// Default location is Vienna
const defLocation = {
  lat: 48.2088475,
  lng: 16.371284,
};

const UserLocationDialog = ({ userLocation }) => {
  const store = useContext(AppContext);
  const [open, setOpen] = useState(true);
  // const [isPlaceStored, setPlaceStore] = useState(false);

  // const { placesData, formatChanged } = usePlaces(
  //   store.userLocation.lat,
  //   store.userLocation.lng
  // );

  // if (formatChanged && !isPlaceStored) {
  //   placesData.map((shop) => store.addNewShop(shop));
  //   setPlaceStore(true);
  // }

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    // Add user location
    store.addUserLocation(userLocation.lat, userLocation.lng);
    handleClose();
  };

  const handleDisagree = () => {
    store.addUserLocation(defLocation.lat, defLocation.lng);
    handleClose();
  };

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
