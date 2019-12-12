import React, { useState, useEffect, useContext } from 'react';

import ReadOnlyRating from '../UIComponents/ReadOnlyRating';

import ReviewCommentArea from './ReviewCommentArea';
import GOOGLE_MAP_API_KEY from '../APIs/GoogleMapKey';
import userReview from '../classes/UserReviewClass';

import './StoreLists.css';
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import StoreContext from '../stores/StoreContext';
import { useObserver } from 'mobx-react';

function StoreItem(props) {
    const [ selectedStore, setSelected ] = useState([]);
    const [ commentArray, setComments ] = useState([]);
    const [ isDetailFetched, setDetailFetch ] = useState(false);

    const [ selectedInputID, setSelectedInputId ] = useState(null);

    const handleInputMode = () => {
        setSelectedInputId(props.id)
    };

    const [ isDetailView, setDetailView ] = useState(false);
    
    const store = useContext(StoreContext);

    const detailRequest = () => {
        if(!props.id || props.ratings.length > 0 || isDetailFetched) {
            return;
        }

        const endpoint = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${props.id}&fields=name,rating,reviews&key=${GOOGLE_MAP_API_KEY}`;
        const proxy = `https://cors-anywhere.herokuapp.com/`;
        fetch(proxy + endpoint)
            .then(res => res.json())
            .then(data => data.status === 'OK' && setSelected(data.result))
            .catch(error => console.log(error));

        console.log('detail fetched');
        setDetailFetch(true);
    };

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

    useEffect(() => {
        console.log(selectedInputID)
        //props.id === selectedInputID ? setInputMode(true) : setInputMode(false)
    }, [selectedInputID])

    const handleClick = () => setDetailView(!isDetailView);
    const source = `https://maps.googleapis.com/maps/api/streetview?size=130x90&location=${props.lat},${props.lng}&key=${GOOGLE_MAP_API_KEY}`;

    const updataDetail = () => {
        console.log(commentArray);
        commentArray.map(shop => store.addNewComment(props.id, shop));
        console.log(store.ShopDataItem);
        setComments([]);
    }

    commentArray.length > 0 && updataDetail();

    isDetailView && props.ratings.length === 0 && props.dataType === 'GOOGLE' && detailRequest();

    //selectedInputID === props.id ? setInputMode(true) : setInputMode(false);

    return useObserver(() => (
        <div className='list-item'>
            <div className='store-container' onClick={handleClick}>
                {/*
                <div className='restaurant-image'>
                    <img src={source} alt="street view of restaurant"></img>
                </div>
                */}
                <div className='restaunrant-info'>
                    <h3>{props.name}</h3>
                    <ul>
                        <li className='restaurant-type'>{props.type}</li>
                        <li>{props.address}</li>
                        <li><span className='review-score'>{props.avgValue.toFixed(2)}</span>
                            <ReadOnlyRating value={props.avgValue}/>
                        </li>
                    </ul>
                </div>
            </div>
            
            { isDetailView && props.ratings.length === 0 && props.dataType === 'GOOGLE' && 
                <div className="reviews-list">
                    <CircularProgress />
                </div>
            }

            { isDetailView && 
              (props.ratings.length > 0 || props.dataType === 'userInput') && 
                <ReviewCommentArea 
                    id={props.id} 
                    ratings={props.ratings}
                    isInputMode={props.id === selectedInputID}
                    selectedInputID={selectedInputID}
                    handleInputMode={handleInputMode}
                /> 
            }

            { isDetailView && props.ratings.length > 0 && 
                <Button 
                    color="primary"
                    onClick={() => setDetailView(!isDetailView)}
                >
                    Close
                </Button>
            }

            <hr />
        </div>
    ));
}

export default StoreItem;