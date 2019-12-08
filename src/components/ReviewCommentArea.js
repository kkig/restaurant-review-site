import React, { useState, useContext } from 'react';

import Button from '@material-ui/core/Button';

import ReviewComment from './ReviewComment';
import './StoreLists.css';
import userReview from './UserReviewClass';

import ReviewInput from './ReviewInput';
import StoreContext from '../stores/StoreContext';
//import { useObserver } from 'mobx-react';

//const userReviewArray = [];

function ReviewCommentArea(props) {
    const [ isInputMode, setInputMode ] = useState(false);
    const [ textValue, setTextValue ] = useState('');
    const [ ratingValue, setRatingValue ] = useState(2.5);

    const store = useContext(StoreContext);

    const createReview = (newRating, newValue) => {
        const newReview = new userReview(props.ratings.length + 1, newRating, newValue);
        //userReviewArray.push(newReview);
        
        store.addNewComment(props.id, newReview);
        //console.log(store.shopData.filter(shop => shop.id === props.id))
        console.log(store.shopData);
        
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

                <Button size="small" variant="outlined" onClick={() => setInputMode(!isInputMode)}>
                    Add Review
                </Button> :

                <ReviewInput 
                    id={props.id}
                    ratingValue={ratingValue}
                    handleRatingChange={(e, newValue) => setRatingValue(newValue)}
                    textValue={textValue}
                    handleTextChange={e => setTextValue(e.target.value)}
                    handleClick={() => 
                        textValue && ratingValue && 
                        createReview(ratingValue, textValue)
                    }
                />
            }

            {   
                props.ratings.map(review => 
                    <ReviewComment key={review.commentId} ratings={review} />)
            }

        </ul>
    );
}

export default ReviewCommentArea;