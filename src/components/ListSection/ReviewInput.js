import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';

// CSS
// import './ReviewInput.css';

function ReviewInput(props) {
  return (
    <form className='review-section'>
      <div>
        <label>
          How many stars?
          <Rating
            className='rating-input'
            name='review-star-input'
            precision={0.5}
            size='small'
            value={props.ratingValue}
            onChange={props.handleRatingChange}
          />
          <span className='review-score' style={{ padding: '0 .5rem' }}>
            {props.ratingValue}
          </span>
        </label>
      </div>

      <TextField
        required
        fullWidth={true}
        size='small'
        className='review-input-area'
        id='outlined-multiline-static'
        label='New Review'
        placeholder='Add comment here.'
        margin='normal'
        variant='outlined'
        value={props.textValue}
        onChange={props.handleTextChange}
        multiline
      />

      <Button
        variant='contained'
        color='primary'
        size='medium'
        fullWidth={true}
        onClick={props.handleClick}
        className='review-save-btn'
      >
        Save
      </Button>
    </form>
  );
}

export default ReviewInput;
