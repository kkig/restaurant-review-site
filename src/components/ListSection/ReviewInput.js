import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';

const ReviewInput = ({
  ratingValue,
  textValue,
  isInputMode,
  handleInputMode,
  handleRatingChange,
  handleTextChange,
  handleClick,
}) => {
  if (!isInputMode)
    return (
      <Button
        size='small'
        variant='outlined'
        fullWidth={true}
        onClick={() => handleInputMode()}
      >
        Add Review
      </Button>
    );

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
            value={ratingValue}
            onChange={handleRatingChange}
          />
          <span className='review-score' style={{ padding: '0 .5rem' }}>
            {ratingValue}
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
        value={textValue}
        onChange={handleTextChange}
        multiline
      />

      <Button
        variant='contained'
        color='primary'
        size='medium'
        fullWidth={true}
        onClick={handleClick}
        className='review-save-btn'
      >
        Save
      </Button>
    </form>
  );
};

export default ReviewInput;
