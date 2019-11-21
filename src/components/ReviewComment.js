import React from 'react';
import ReadOnlyRating from '../UIComponents/ReadOnlyRating';

function ReviewComment(props) {
    const ratings = props.ratings;

    return (
        <li style={{marginBottom: '.5em'}}>        
            <div style={{ color: 'var(--star-color)' }}>{ratings.stars}<ReadOnlyRating value={ratings.stars}/></div>
            <div>{ratings.comment}</div>
        </li>        
    );
}

export default ReviewComment;