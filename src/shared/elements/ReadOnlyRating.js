import React from 'react';
import Rating from '@material-ui/lab/Rating';

export default function ReadOnlyRating(props) {
  return (
    <Rating
      name='read-only'
      value={props.value}
      precision={0.25}
      size='small'
      readOnly
    />
  );
}
