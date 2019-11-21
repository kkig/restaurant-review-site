import React, { useState } from 'react';
import ReadOnlyRating from '../UIComponents/ReadOnlyRating';

import ReviewComment from './ReviewComment';
import YOUR_API_KEY from '../APIs/GoogleMapKey';

const commentStyle = {
    listStyleType: 'none', 
    margin: 0,
    padding: 'var(--container-padding)'
}

function StoreItem(props) {
    const [ isDetailView, setDetailView ] = useState(false);
  
    const handleClick = () => setDetailView(!isDetailView);
    const source = `https://maps.googleapis.com/maps/api/streetview?size=130x90&location=${props.lat},${props.lng}&key=${YOUR_API_KEY}`;

    return(
        <div className='list-item' onClick={handleClick}>
            <div className='store-container'>
                <div className='restaurant-image' style={{ paddingRight: '1em', margin: 'auto 0' }}>
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
            {isDetailView && 
                <ul className="reviews-list" style={commentStyle}>
                    <h4 style={{ marginBottom: 0 }}>Review:</h4>        
                    {props.value.map(review => <ReviewComment key={review.commentId} ratings={review}/>)}
                </ul>
            }
            <hr />
        </div>
    );
}

export default StoreItem;