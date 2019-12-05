import React, { useEffect, useState } from 'react';

import CircularProgress from '../UIComponents/CircularIndeterminate';

import GOOGLE_MAP_API_KEY from '../APIs/GoogleMapKey';
import userReview from './UserReviewClass';

import ReviewComment from './ReviewComment';

const GoogleReviews = props => {
    const [ selectedStore, setSelected ] = useState([]);
    const [ commentArray, setComments ] = useState([]);
    const [ isDetailFetching, setDetailFetch ] = useState(true);

    useEffect(() => {
        if(!isDetailFetching) {
            return;
        }

        const endpoint = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${props.placeId}&fields=name,rating,reviews&key=${GOOGLE_MAP_API_KEY}`;
        const proxy = `https://cors-anywhere.herokuapp.com/`;
        fetch(proxy + endpoint)
            .then(res => res.json())
            .then(data => data.status === 'OK' ? setSelected(data.result) : alert('Error with Google API'))
            .catch(error => console.log(error));
        setDetailFetch(false);
    }, [props.placeId, isDetailFetching]);

    useEffect(() => {
        const createCommentArray = () => {
            let count = 0;
            const newArray = selectedStore.reviews.map(review => {
                count++;
                return new userReview(count, review.rating, review.text);
            })
            setComments(newArray);
        }
        selectedStore.reviews && createCommentArray();
    }, [selectedStore]);

    return (
        <ul className="reviews-list">
            
            {
                !selectedStore.reviews ?
                <CircularProgress /> :
                <div>            
                    <h4>Review:</h4>
                    {selectedStore.reviews && commentArray.map(review => (
                        <ReviewComment 
                            key={review.commentId} ratings={review}
                        />
                    ))}
                </div>
            }

        </ul>
    );

};

export default GoogleReviews;