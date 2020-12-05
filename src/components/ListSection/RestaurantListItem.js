import React, { useState, useEffect, useContext } from 'react';

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

// Class
import userReview from '../../shared/classes/UserReviewClass';

// Store
import AppContext from '../../shared/contexts/AppContext';

// MobX
import { useObserver } from 'mobx-react';

const useStyles = makeStyles((theme) => ({
  infoWrapper: {
    padding: 'var(--container-padding)',

    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
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
  commentWrapper: {
    padding: '0 var(--container-padding-x)',
  },

  btnCloseDetail: {
    width: '100%',
  },
}));

const StoreItem = (props) => {
  const [selectedStore, setSelected] = useState([]);
  const [commentArray, setComments] = useState([]);
  const [isDetailFetched, setDetailFetch] = useState(false);
  const [isInputMode, setInputMode] = useState(false);

  // const [selectedShop, setSelectedShop] = useState(null);

  const store = useContext(AppContext);

  const classes = useStyles();

  const GOOGLE_MAP_API_KEY =
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_PROD_GOOGLE_KEY
      : process.env.REACT_APP_DEV_GOOGLE_KEY;

  // Handle close button click
  // const handleCloseClick = (id) => {
  //   selectedShop !== id ? setSelectedShop(id) : setSelectedShop(null);
  //   setInputMode(false);
  // };

  const handleInputMode = () => {
    setInputMode(true);
  };

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
    <>
      <div className={classes.infoWrapper} onClick={props.handleCloseClick}>
        {/* <div className='restaurant-image'>
                    <img src={source} alt="street view of restaurant"></img>
                </div> */}

        <List disablePadding={true}>
          <ListItem className={classes.infoItem}>
            <Typography variant='h6' className={classes.infoName}>
              {props.name}
            </Typography>
          </ListItem>
          <ListItem className={classes.infoItem}>
            <span className={classes.infoTextLight}>{props.type}</span>
          </ListItem>
          <ListItem className={classes.infoItem}>{props.address}</ListItem>
          <ListItem className={classes.infoItem}>
            <span className={classes.startsContainer}>
              {props.avgValue.toFixed(2)}
            </span>
            <ReadOnlyRating value={props.avgValue} />
          </ListItem>
        </List>

        {/* <div className='restaunrant-info'>
          <h3>{props.name}</h3>
          <ul>
            <li className='restaurant-type'>{props.type}</li>
            <li>{props.address}</li>
            <li>
              <span className='review-score'>{props.avgValue.toFixed(2)}</span>
              <ReadOnlyRating value={props.avgValue} />
            </li>
          </ul>
        </div> */}
      </div>

      {props.isDetailView && (
        <>
          <div className={classes.commentWrapper}>
            {props.ratings.length === 0 ? (
              <div className={classes.loadingWrapper}>
                <Loading />
              </div>
            ) : (
              <ReviewComment
                isInputMode={props.isInputMode}
                id={props.id}
                handleInputMode={props.handleInputMode}
                ratings={props.ratings}
              />
            )}
          </div>

          <Button
            className={classes.btnCloseDetail}
            color='primary'
            onClick={props.handleCloseClick}
          >
            Close
          </Button>
        </>
      )}
    </>
  ));
};

export default StoreItem;
