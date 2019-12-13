import React, { useState, useContext } from 'react';

import Button from '@material-ui/core/Button';

import ReviewComment from './ReviewComment';
import './StoreLists.css';
import userReview from '../classes/UserReviewClass';

import ReviewInput from './ReviewInput';
import StoreContext from '../stores/StoreContext';
import { useObserver } from 'mobx-react';

function ReviewCommentArea(props) {

    const [ textValue, setTextValue ] = useState('');
    const [ ratingValue, setRatingValue ] = useState(2.5);

    const store = useContext(StoreContext);

    const createReview = (newRating, newValue) => {
        const newReview = new userReview(props.ratings.length + 1, newRating, newValue);
        
        store.addNewComment(props.id, newReview);
        console.log(store.ShopDataItem);
        
        setTextValue('');
        setRatingValue(2.5);
    };

    return useObserver(() => (
        <div className="reviews-list">
                    <h4>Review:</h4> 
                    {   
                        props.isInputMode ?

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
                        /> :

                        <Button 
                            size="small" 
                            variant="outlined" 
                            onClick={() => props.handleInputMode() }
                        >
                            Add Review
                        </Button>                
                    }

                    <ul>
                        {   
                            props.ratings.length > 0 && 
                            props.ratings.map(
                                review => <ReviewComment key={review.commentId} ratings={review} />
                            )
                        }
                    </ul>
                </div>
    ));
}

export default ReviewCommentArea;