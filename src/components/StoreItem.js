import React from 'react';
import ReadOnlyRating from '../UIComponents/ReadOnlyRating';

function StoreItem(props) {
    const ratingArray = props.value.map(review => review.stars);
    const avgReview = ratingArray.reduce((a, b) => a + b, 0) / ratingArray.length;

    return(
        <div className='list-container'>
            <div className='restaunrant-info'>
                <h3>{props.name}</h3>
                <ul>
                    <li className='restaurant-type'>{props.type}</li>
                    <li>{props.address}</li>
    <li><span className='review-score'>{avgReview}</span><ReadOnlyRating value={avgReview}/></li>
                </ul>
            </div>
            <hr />
        </div>
    );
}

export default StoreItem;