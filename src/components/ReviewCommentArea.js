import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

import ReviewComment from './ReviewComment';
import './StoreLists.css';
import userReview from './UserReviewClass';

import ReviewInput from './ReviewInput';

const userReviewArray = [];

function ReviewCommentArea(props) {
    const [ isInputMode, setInputMode ] = useState(false);
    const [ textValue, setTextValue ] = useState('');
    const [ ratingValue, setRatingValue ] = useState(2.5);

    const createReview = (newRating, newValue) => {
        const newReview = new userReview(userReviewArray.length + 1, newRating, newValue);
        userReviewArray.push(newReview);
        
        // Reset Form Values
        setTextValue('');
        setRatingValue(2.5);

    };

    return (
        <ul className="reviews-list">
            <h4>Review:</h4>   
            {   
                // Input Field
                !isInputMode ? 
                <Button size="small" variant="outlined" onClick={() => setInputMode(!isInputMode)}>Add Review</Button> :
                <ReviewInput 
                    ratingValue={ratingValue}
                    handleRatingChange={(event, newValue) => setRatingValue(newValue)}
                    textValue={textValue}
                    handleTextChange={e => setTextValue(e.target.value)}
                    handleClick={() => textValue && ratingValue && createReview(ratingValue, textValue)}
                />
            }

            {
                // User Input
                userReviewArray.length > 0 && userReviewArray.map(userReview => <ReviewComment key={userReview.commentId} ratings={userReview} />)
            }

            {props.value.map(review => <ReviewComment key={review.commentId} ratings={review} />)}

        </ul>
    );
}

export default ReviewCommentArea;