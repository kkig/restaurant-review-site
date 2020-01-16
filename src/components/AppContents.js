import React from 'react';

import MapContainer from './AppContents/MapContainer';
import StoreListContainer from './AppContents/StoreListContainer';

// CSS
import './AppContents.css';

const AppContents = ({ isMobileView, isMapView }) => {

    return (
        <main>
            {   
                !isMobileView || (!!isMobileView && isMapView) ?

                <MapContainer /> :

                null

            }
            {
                !isMobileView || (!!isMobileView && !isMapView) ?

                <StoreListContainer /> :

                null
            }
        </main>
    );
};

export default AppContents;