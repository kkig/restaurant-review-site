import React from 'react';
import StarIcon from '@material-ui/icons/Star';

const styleDetail = {
    fontSize: 14, 
    verticalAlign: 'text-top',
}

function ReviewComment(props) {
    const ratings = props.ratings;

    return (
        <li style={{marginBottom: '.5em' }}>        
            <div>{ratings.stars}<StarIcon style={styleDetail}/></div>
            <div>{ratings.comment}</div>
        </li>        
    );
}

export default ReviewComment;