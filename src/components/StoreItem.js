import React, { useState } from 'react';

import ReadOnlyRating from '../UIComponents/ReadOnlyRating';

import ReviewCommentArea from './ReviewCommentArea';
import GoogleReviews from './GoogleReviews';
import YOUR_API_KEY from '../APIs/GoogleMapKey';

import './StoreLists.css';

function StoreItem(props) {
    const [ isDetailView, setDetailView ] = useState(false);
  
    const handleClick = () => setDetailView(!isDetailView);
    const source = `https://maps.googleapis.com/maps/api/streetview?size=130x90&location=${props.lat},${props.lng}&key=${YOUR_API_KEY}`;

    return(
        <div className='list-item'>
            <div className='store-container' onClick={handleClick}>
                <div className='restaurant-image'>
                    <img src={source} alt="street view of restaurant"></img>
                </div>
                <div className='restaunrant-info'>
                    <h3>{props.name}</h3>
                    <ul>
                        <li className='restaurant-type'>{props.type}</li>
                        <li>{props.address}</li>
                        <li><span className='review-score'>{props.avgValue}</span><ReadOnlyRating value={props.avgValue}/></li>
                    </ul>
                </div>
            </div>
            {isDetailView && props.value &&
                // Json data review
                <ReviewCommentArea value={props.value}/>
            }

            {isDetailView && props.dataType === 'GOOGLE' && <GoogleReviews placeId={props.id}/>}
            <hr />
        </div>
    );
}

export default StoreItem;