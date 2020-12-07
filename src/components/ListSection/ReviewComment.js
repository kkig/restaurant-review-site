import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ReadOnlyRating from '../../shared/elements/ReadOnlyRating';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// // MobX
// import { useObserver } from 'mobx-react';

const useStyles = makeStyles({
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
        paddingRight: '.25rem',
      },
    },
  },
});

const ReviewComment = ({ ratings }) => {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.reviewTitle} variant='h5'>
        Review:
      </Typography>
      <List className={classes.commentList}>
        {ratings.map((review) => (
          <ListItem key={review.commentId}>
            <div className='cmt-item-container'>
              <div>
                <span className='rating-text'>{review.stars.toFixed(1)}</span>
                <ReadOnlyRating value={review.stars} />
              </div>

              <div>{review.comment}</div>
            </div>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ReviewComment;
