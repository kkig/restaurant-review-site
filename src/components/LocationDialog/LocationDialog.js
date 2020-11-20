import React, { useContext, useState } from "react";

// Component
import SelectLocation from "./SelectLocation";
import NoLocation from "./NoLocationContent";

// Material UI
import Dialog from "@material-ui/core/Dialog";

// Store
import StoreContext from "../../stores/StoreContext";

// Tools
import { usePlaces } from "./usePlaces";
import { usePosition } from "./usePosition";

// Default location is Vienna
const defLocation = {
  lat: 48.2088475,
  lng: 16.371284,
};

const LocationDialog = ({ isLocationAvailable }) => {
  const [open, setOpen] = useState(true);
  const [isPlaceStored, setPlaceStore] = useState(false);

  const store = useContext(StoreContext);

  const { latitude, longitude } = usePosition();
  const { placesData, formatChanged } = usePlaces(
    store.userLocation.lat,
    store.userLocation.lng
  );

  if (formatChanged && !isPlaceStored) {
    placesData.map((shop) => store.addNewShop(shop));
    setPlaceStore(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    // Add user location
    !!latitude &&
      !!longitude &&
      store.userLocation.length === 0 &&
      store.addUserLocation(latitude, longitude);
    handleClose();
  };

  const handleDisagree = () => {
    store.userLocation.length === 0 &&
      store.addUserLocation(defLocation.lat, defLocation.lng);
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleDisagree}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        {!!isLocationAvailable ? (
          <SelectLocation
            handleDisagree={handleDisagree}
            handleAgree={handleAgree}
          />
        ) : (
          <NoLocation handleDisagree={handleDisagree} />
        )}
      </Dialog>
    </div>
  );
};

export default LocationDialog;
