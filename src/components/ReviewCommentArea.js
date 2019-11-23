import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';

import ReviewComment from './ReviewComment';
import './StoreLists.css';

const userReviewArray = [];

class userReview {
    constructor(commentId, stars, comment) {
        this.commentId = commentId;
        this.stars = stars;
        this.comment = comment;
    }
}

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
                !isInputMode ? 
                <Button size="small" variant="outlined" onClick={() => setInputMode(!isInputMode)}>Add Review</Button> :
                <form className="review-section">
                    <div>
                        <label>
                            How many stars?
                            <Rating
                            className="rating-input"
                            name="review-star-input"
                            precision={0.5}
                            size="small"
                            value={ratingValue}
                            onChange={(event, newValue) => {
                                setRatingValue(newValue);
                            }}
                            />
                            <span className="review-score" style={{ padding: '0 .5rem'}}>{ratingValue}</span>
                        </label>
                    </div>

                    <TextField 
                    className="review-input-area"
                    id="outlined-multiline-static"
                    label="New Review"
                    multiline
                    placeholder="Add comment here."
                    margin="normal"
                    variant="outlined"
                    value={textValue}
                    onChange={e => setTextValue(e.target.value)}
                    />

                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => textValue && ratingValue && createReview(ratingValue, textValue)}
                    >
                        Save
                    </Button>
                </form>
            }

            {props.value.map(review => <ReviewComment key={review.commentId} ratings={review} />)}

            {
                // User Input
                userReviewArray.length > 0 && userReviewArray.map(userReview => <ReviewComment key={userReview.commentId} ratings={userReview} />)
            }

        </ul>
    );
}

export default ReviewCommentArea;