import React, { useState, useContext } from 'react';

// Material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ReadOnlyRating from '../../shared/elements/ReadOnlyRating';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import Loading from '../../shared/elements/Loading';

import { makeStyles } from '@material-ui/core/styles';

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

const useStyles = makeStyles((theme) => ({
  infoWrapper: {
    padding: 'var(--container-padding)',
    display: 'flex',

    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  infoImage: {
    paddingRight: '.75em',
    display: 'flex',
    alignItems: 'center',
  },

  infoItem: {
    padding: 0,
    alignItems: 'normal',
  },

  infoName: {
    fontSize: '1rem',
  },
  infoTextLight: {
    color: theme.palette.text.secondary,
  },

  startsContainer: {
    color: 'var(--star-color)',
    paddingRight: '.25rem',
  },

  loadingWrapper: {
    padding: '.25rem 0',
  },

  commentInputWrapper: {
    padding: '1rem 0',
  },

  commentWrapper: {
    padding: '0 var(--container-padding-x)',
  },

  btnCloseDetail: {
    width: '100%',
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

  const store = useContext(AppContext);
  const classes = useStyles();

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

  const source = `https://maps.googleapis.com/maps/api/streetview?size=130x90&location=${restaurant.lat},${restaurant.long}&key=${GOOGLE_MAP_API_KEY}`;

  return (
    <>
      <div className={classes.infoWrapper} onClick={handleCloseClick}>
        {/* <div className={classes.infoImage}>
          <img src={source} alt='street view of restaurant'></img>
        </div> */}

        <List disablePadding={true}>
          <ListItem className={classes.infoItem}>
            <Typography variant='h6' className={classes.infoName}>
              {restaurant.name}
            </Typography>
          </ListItem>
          <ListItem className={classes.infoItem}>
            <span className={classes.infoTextLight}>{restaurant.type}</span>
          </ListItem>
          <ListItem className={classes.infoItem}>{restaurant.address}</ListItem>
          <ListItem className={classes.infoItem}>
            <span className={classes.startsContainer}>
              {avgValue.toFixed(2)}
            </span>
            <ReadOnlyRating value={avgValue} />
          </ListItem>
        </List>
      </div>

      {isDetailView && (
        <>
          <div className={classes.commentWrapper}>
            {isCommentLoading ? (
              <div className={classes.loadingWrapper}>
                <Loading />
              </div>
            ) : (
              <>
                <div className={classes.commentInputWrapper}>
                  <ReviewInput
                    id={restaurant.id}
                    ratingValue={ratingValue}
                    isInputMode={isInputMode}
                    handleRatingChange={(e, newValue) =>
                      setRatingValue(newValue)
                    }
                    handleInputMode={handleInputMode}
                    textValue={textValue}
                    handleTextChange={(e) => setTextValue(e.target.value)}
                    handleClick={() =>
                      textValue &&
                      ratingValue &&
                      createReview(ratingValue, textValue)
                    }
                  />
                </div>
                <ReviewComment ratings={restaurant.ratings} />
              </>
            )}
          </div>

          <Button
            className={classes.btnCloseDetail}
            color='primary'
            onClick={handleCloseClick}
          >
            Close
          </Button>
        </>
      )}
    </>
  );
};

export default RestaurantListItem;
