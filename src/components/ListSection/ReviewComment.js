import React, { useState, useContext } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Component
import Button from '@material-ui/core/Button';
// import ReviewComment from './ReviewComment';
import ReviewInput from './ReviewInput';

import ReadOnlyRating from '../../shared/elements/ReadOnlyRating';

// CSS
// import './ReviewCommentArea.css';

// Class
import userReview from '../../shared/classes/UserReviewClass';

// Store
import AppContext from '../../shared/contexts/AppContext';

// MobX
import { useObserver } from 'mobx-react';

const useStyles = makeStyles({
  btnAddNew: {
    width: '100%',
    margin: '1rem 0',
  },
  inputAddNew: {
    width: '100%',
  },

  reviewTitle: {
    fontSize: '1rem',
    marginBottom: '.75rem',
    fontWeight: 500,
  },

  commentList: {
    padding: 0,

    '& li': {
      padding: 0,
      margin: '1rem 0',

      '&:first-child': {
        marginTop: 0,
      },

      '& div.cmt-item-container': {
        display: 'flex',
        flexDirection: 'column',
      },

      '& .rating-text': {
        color: 'var(--star-color)',
        verticalAlign: 'text-bottom',
        paddingRight: '.25rem',
      },
    },
  },
});

function ReviewComment(props) {
  const [textValue, setTextValue] = useState('');
  const [ratingValue, setRatingValue] = useState(2.5);

  const store = useContext(AppContext);

  const classes = useStyles();

  const createReview = (newRating, newValue) => {
    const newReview = new userReview(
      props.ratings.length + 1,
      newRating,
      newValue
    );

    store.addNewComment(props.id, newReview);

    setTextValue('');
    setRatingValue(2.5);
  };

  return useObserver(() => (
    <div className='reviews-list'>
      {props.isInputMode ? (
        <ReviewInput
          className={classes.inputAddNew}
          id={props.id}
          ratingValue={ratingValue}
          handleRatingChange={(e, newValue) => setRatingValue(newValue)}
          textValue={textValue}
          handleTextChange={(e) => setTextValue(e.target.value)}
          handleClick={() =>
            textValue && ratingValue && createReview(ratingValue, textValue)
          }
        />
      ) : (
        <Button
          size='small'
          variant='outlined'
          className={classes.btnAddNew}
          onClick={() => props.handleInputMode()}
        >
          Add Review
        </Button>
      )}

      {props.ratings.length > 0 && (
        <>
          <Typography className={classes.reviewTitle} variant='h5'>
            Review:
          </Typography>
          <List className={classes.commentList}>
            {props.ratings.map((review) => (
              <ListItem key={review.commentId}>
                <div className='cmt-item-container'>
                  <div>
                    <span className='rating-text'>
                      {review.stars.toFixed(1)}
                    </span>
                    <ReadOnlyRating value={review.stars} />
                  </div>
                  <div>{review.comment}</div>
                </div>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </div>
  ));
}

export default ReviewComment;
