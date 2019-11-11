import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const style = {
    width: '100%',
    height: '100%',
}

class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });
    
    onClose = props => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          });
        }
      };

    render() {
        return (
            <div className='mapStyles'>
                <Map
                    google={ this.props.google }
                    zoom={ 16 }
                    style={ style }
                    initialCenter={{ lat: 48.1776413, lng: 16.3555129 }}
                >
                    <Marker
                        onClick={this.onMarkerClick}
                        name={'OBI'}
                    />
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                        <div>
                            <h4>{this.state.selectedPlace.name}</h4>
                        </div>
                    </InfoWindow>
                </ Map>
            </div>
        );
    }

}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDT31IFFNWQK8iFmEvrynwlk4GuyQcCgyw'
})(MapContainer);