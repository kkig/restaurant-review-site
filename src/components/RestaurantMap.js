import React, { Component } from 'react';

import './RestaurantMap.css';
import MapContainer from '../APIs/MapContainer';

class RestaurantMap extends Component {
    render() {
        return (
            <div className='map-section'>
                <MapContainer />
            </div>
        );
    }
}

export default RestaurantMap;