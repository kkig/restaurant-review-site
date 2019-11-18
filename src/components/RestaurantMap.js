import React, { Component } from 'react';
import {
    withGoogleMap,
    withScriptjs
} from 'react-google-maps';

import MapWithMarker from '../APIs/Map';
import CircularProgress from '../UIComponents/CircularIndeterminate';

import GOOGLE_MAP_API_KEY from '../APIs/GoogleMapKey';

import './RestaurantMap.css';

const MapContainer = withScriptjs(withGoogleMap(MapWithMarker));

class RestaurantMap extends Component {
    state = {
        loading: true
    }

    componentDidMount(props) {
        navigator.geolocation ? 
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;

                    this.setState({
                        userLocation: {lat: latitude, lng: longitude },
                        isLoading: false
                    });
                },
                () => {
                    this.setState({ isLoading: false });
                }
            )
        : alert('Location service not available');
    }

    render() {
        return (
            <div className='map-section'>
                {this.state.userLocation ? 
                <MapContainer 
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`}
                    center={this.state.userLocation}
                    loadingElement={<div style={{ height: '100%' }} />}
                    containerElement={<div style={{ height: '100%', width: '100%' }} />}
                    mapElement={<div style={{ height: '100%', width: '100%' }} />}
                /> :
                <CircularProgress size={ '5rem' } style={{ justifyContent: 'center' }} />}
            </div>
        );
    }

}

export default RestaurantMap;