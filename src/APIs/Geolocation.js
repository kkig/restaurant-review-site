import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const style = {
    width: '100%',
    height: '100%',
}

class Geolocation extends Component {
    render() {
        return (
            <div className='mapStyles'>
                <Map
                    google={ this.props.google }
                    zoom={ 16 }
                    style={ style }
                    initialCenter={{ lat: 47.444, lng: -122.176 }}
                />
            </div>
        );
    }

}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDT31IFFNWQK8iFmEvrynwlk4GuyQcCgyw'
})(Geolocation);