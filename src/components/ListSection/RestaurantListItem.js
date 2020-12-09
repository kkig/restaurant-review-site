import React, { useState, useRef, useContext } from 'react';

// Material UI
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ReadOnlyRating from '../../shared/elements/ReadOnlyRating';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import Loading from '../../shared/elements/Loading';

import { styled } from '@material-ui/core/styles';

import { useObserver } from 'mobx-react';

// Component
import ReviewComment from './ReviewComment';
import ReviewInput from './ReviewInput';

// Class
import userReview from '../../shared/classes/UserReviewClass';

// Store
import AppContext from '../../shared/contexts/AppContext';

// MobX
// import { useObserver } from 'mobx-react';

const GOOGLE_MAP_API_KEY =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_GOOGLE_KEY
    : process.env.REACT_APP_DEV_GOOGLE_KEY;

const InfoList = styled(List)(({ theme }) => ({
  '& li': {
    padding: 0,
    alignItems: 'normal',
  },

  '& .info-name': {
    fontSize: '1rem',
  },

  '& .text-light': {
    color: theme.palette.text.secondary,
  },

  '& .rating-text': {
    color: 'var(--star-color)',
    paddingRight: '.25rem',
  },
}));

const CommentContainer = styled(Box)({
  padding: '0 var(--container-padding-x)',

  '& .loading-icon': {
    padding: '.25rem 0',
  },

  '& .new-comment-section': {
    padding: '1rem 0',
  },

  '& .info-image': {
    paddingRight: '.75em',
    display: 'flex',
    alignItems: 'center',
  },
});

const InfoContainer = styled(Box)(({ theme }) => ({
  padding: 'var(--container-padding)',
  display: 'flex',

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const RestaurantListItem = ({
  restaurant,
  isCommentLoading,
  avgValue,
  isDetailView,
  handleCloseClick,
}) => {
  const [isInputMode, setInputMode] = React.useState(false);
  const [textValue, setTextValue] = useState('');
  const [ratingValue, setRatingValue] = useState(2.5);

  const listItemRef = useRef(null);

  const store = useContext(AppContext);

  const createReview = (newRating, newValue) => {
    const newReview = new userReview(
      restaurant.ratings.length + 1,
      newRating,
      newValue
    );

    store.addNewComment(restaurant.id, newReview);

    setTextValue('');
    setRatingValue(2.5);
  };

  const handleInputMode = () => {
    setInputMode(true);
  };

  const handleTextChange = (e) => setTextValue(e.target.value);

  const handleRatingChange = (e, newValue) => setRatingValue(newValue);

  const handleClick = () => {
    if (!textValue) {
      return;
    }
    createReview(ratingValue, textValue);
  };

  const source = `https://maps.googleapis.com/maps/api/streetview?size=130x90&location=${restaurant.lat},${restaurant.long}&key=${GOOGLE_MAP_API_KEY}`;

  return useObserver(() => (
    <>
      <InfoContainer onClick={handleCloseClick}>
        {/* <div className='info-image'>
          <img src={source} alt='street view of restaurant'></img>
        </div> */}

        <InfoList disablePadding={true}>
          <ListItem>
            <Typography className='info-name' variant='h6'>
              {restaurant.name}
            </Typography>
          </ListItem>

          <ListItem>
            <Typography className='text-light' variant='body2'>
              {restaurant.type}
            </Typography>
          </ListItem>

          <ListItem>{restaurant.address}</ListItem>

          <ListItem>
            <Typography className='rating-text' variant='body2'>
              {avgValue.toFixed(2)}
            </Typography>
            <ReadOnlyRating value={avgValue} />
          </ListItem>
        </InfoList>
      </InfoContainer>

      {isDetailView && (
        <>
          <CommentContainer>
            {!isCommentLoading ? (
              <>
                <div className='new-comment-section'>
                  <ReviewInput
                    isInputMode={isInputMode}
                    handleInputMode={handleInputMode}
                    ratingValue={ratingValue}
                    textValue={textValue}
                    handleRatingChange={handleRatingChange}
                    handleTextChange={handleTextChange}
                    handleClick={handleClick}
                  />
                </div>
                <ReviewComment ratings={restaurant.ratings} />
              </>
            ) : (
              <div className='loading-icon'>
                <Loading />
              </div>
            )}
          </CommentContainer>

          <Button fullWidth={true} color='primary' onClick={handleCloseClick}>
            Close
          </Button>
        </>
      )}
    </>
  ));
};

export default RestaurantListItem;
