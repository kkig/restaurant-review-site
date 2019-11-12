import React, { Component, createRef } from 'react';

import mapStyle from '../APIs/mapStyle.js';
import GOOGLE_MAP_API_KEY from '../APIs/GoogleMapKey';

import './RestaurantMap.css';

const initPosition = {
    lat: 48.2084114, 
    lng: 16.3734707  
};

class RestaurantMap extends Component {
    googleMapRef = createRef();
    componentDidMount() {
        const googleMapScript = document.createElement('script');

        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
        window.document.body.appendChild(googleMapScript);

        googleMapScript.addEventListener('load', () => {
            this.googleMap = this.createGoogleMap();
            this.marker = this.createMarker();
        });
    }

    createGoogleMap = () => {
        new window.google.maps.Map(this.googleMapRef.current, {
            zoom: 15,
            center: initPosition,
            styles: mapStyle,
        });
        new window.google.maps.InfoWindow();
    }

    createMarker = () => {
        new window.google.maps.Marker({
            position: initPosition,
            map: this.googleMap,
        });
    }

    render() {
        return (
            <div 
                className='map-section'
                ref={this.googleMapRef}
                style={{ width: '100%', height: '100%' }}
            >                
            </div>
        );
    }
}

export default RestaurantMap;