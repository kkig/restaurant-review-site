import React from 'react';

import './Map.css';
import Geolocation from '../APIs/Geolocation';

function Map() {
    return (
        <div className='map-section'>
            <Geolocation />
        </div>
    );
}

export default Map;