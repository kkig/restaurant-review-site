import React from 'react';
import ReadOnlyRating from '../UIComponents/ReadOnlyRating';

function ReviewComment(props) {
    const ratings = props.ratings;

    return (
        <li style={{marginTop: '.75em'}}>        
            <div style={{ color: 'var(--star-color)' }}>
                {ratings.stars.toFixed(1)}
                <ReadOnlyRating value={ratings.stars}/></div>
            <div>{ratings.comment}</div>
        </li>        
    );
    
}

export default ReviewComment;