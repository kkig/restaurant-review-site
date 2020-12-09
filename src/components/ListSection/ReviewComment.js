import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ReadOnlyRating from '../../shared/elements/ReadOnlyRating';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';

// MobX
// import { useObserver } from 'mobx-react';

const ReviewHeading = styled(Typography)({
  fontSize: '1rem',
  marginBottom: '.75rem',
  fontWeight: 500,
});

const CommentList = styled(List)({
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
});

const ReviewComment = ({ ratings }) => {
  React.useEffect(() => {
    ratings.length > 0 && console.log(ratings);
  }, [ratings]);

  // ratings.length > 0 && console.log(ratings);
  return (
    <>
      <ReviewHeading variant='h5'>Review:</ReviewHeading>

      <CommentList>
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
      </CommentList>
    </>
  );
};

export default ReviewComment;
