import React from 'react';

class CurrentLocation extends React.component {
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

export default CurrentLocation;