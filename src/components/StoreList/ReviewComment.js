import React from 'react';

import ReadOnlyRating from '../../UIComponents/ReadOnlyRating';
import { styled } from '@material-ui/core/styles';
import { ListItem } from '@material-ui/core';

import './ReviewComment.css';

const CommentItem = styled(ListItem)({
  marginTop: '1.5em',

  '&:first-child': {
    marginTop: '1em',
  },
});

function ReviewComment(props) {
  const ratings = props.ratings;

  return (
    <li className='commentItem'>
      <div style={{ color: 'var(--star-color)' }}>
        {ratings.stars.toFixed(1)}
        <ReadOnlyRating value={ratings.stars} />
      </div>
      <div>{ratings.comment}</div>
    </li>
  );
}

export default ReviewComment;
