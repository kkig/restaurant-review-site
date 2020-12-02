import React, { useState, useEffect, useContext } from 'react';

// Material UI
import ReadOnlyRating from '../../shared/elements/ReadOnlyRating';
import Loading from '../../shared/elements/Loading';
import Button from '@material-ui/core/Button';

// Component
import ReviewCommentArea from './ReviewCommentArea';

// CSS
import './StoreItem.css';

// Class
import userReview from '../../shared/classes/UserReviewClass';

// Store
import AppContext from '../../shared/contexts/AppContext';

// MobX
import { useObserver } from 'mobx-react';

const StoreItem = (props) => {
  const [selectedStore, setSelected] = useState([]);
  const [commentArray, setComments] = useState([]);
  const [isDetailFetched, setDetailFetch] = useState(false);

  const store = useContext(AppContext);

  const GOOGLE_MAP_API_KEY =
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_PROD_GOOGLE_KEY
      : process.env.REACT_APP_DEV_GOOGLE_KEY;

  const detailRequest = () => {
    if (!props.id || props.ratings.length > 0 || isDetailFetched) {
      return;
    }

    const endpoint = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${props.id}&fields=name,rating,reviews&key=${GOOGLE_MAP_API_KEY}`;
    const proxy = `https://cors-anywhere.herokuapp.com/`;

    fetch(proxy + endpoint)
      .then((res) => res.json())
      .then((data) => data.status === 'OK' && setSelected(data.result))
      .catch((error) => console.log(error));

    console.log('detail fetched');
    setDetailFetch(true);
  };

  useEffect(() => {
    const createCommentArray = () => {
      let count = 0;
      const newArray = selectedStore.reviews.map((review) => {
        count++;
        return new userReview(count, review.rating, review.text);
      });
      setComments(newArray);
    };
    selectedStore.reviews && createCommentArray();
  }, [selectedStore]);

  const source = `https://maps.googleapis.com/maps/api/streetview?size=130x90&location=${props.lat},${props.lng}&key=${GOOGLE_MAP_API_KEY}`;

  const updateDetail = () => {
    commentArray.map((shop) => store.addNewComment(props.id, shop));
    setComments([]);
  };

  commentArray.length > 0 && updateDetail();

  props.isDetailView &&
    props.ratings.length === 0 &&
    props.dataType === 'GOOGLE' &&
    detailRequest();

  return useObserver(() => (
    <div className='list-item'>
      <div className='store-container' onClick={props.handleCloseClick}>
        {/* <div className='restaurant-image'>
                    <img src={source} alt="street view of restaurant"></img>
                </div> */}

        <div className='restaunrant-info'>
          <h3>{props.name}</h3>
          <ul>
            <li className='restaurant-type'>{props.type}</li>
            <li>{props.address}</li>
            <li>
              <span className='review-score'>{props.avgValue.toFixed(2)}</span>
              <ReadOnlyRating value={props.avgValue} />
            </li>
          </ul>
        </div>
      </div>

      {props.isDetailView &&
        (props.ratings.length === 0 && props.dataType === 'GOOGLE' ? (
          <div className='reviews-list'>
            <Loading />
          </div>
        ) : (
          <ReviewCommentArea
            isInputMode={props.isInputMode}
            id={props.id}
            handleInputMode={props.handleInputMode}
            ratings={props.ratings}
          />
        ))}

      {
        // Close button for store detail
        props.isDetailView && props.ratings.length > 0 && (
          <Button color='primary' onClick={props.handleCloseClick}>
            Close
          </Button>
        )
      }

      <hr />
    </div>
  ));
};

export default StoreItem;
