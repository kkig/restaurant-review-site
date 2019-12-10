import React, { useRef } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';

function ReviewInput(props) {
    const textInput = useRef(null);

    return (
        <form className="review-section">
            <div>
                <label>
                    How many stars?
                    <Rating
                        className="rating-input"
                        name="review-star-input"
                        precision={0.5}
                        size="small"
                        value={props.ratingValue}
                        onChange={props.handleRatingChange}
                        onClick={() => textInput.current.focus()}
                    />
                    <span className="review-score" style={{ padding: '0 .5rem'}}>{props.ratingValue}</span>
                </label>
            </div>

            <TextField 
                required
                ref={textInput}
                className="review-input-area"
                id="outlined-multiline-static"
                label="New Review"
                multiline
                placeholder="Add comment here."
                margin="normal"
                variant="outlined"
                value={props.textValue}
                onChange={props.handleTextChange}
            />

            <Button 
                variant="contained" 
                color="primary" 
                onClick={props.handleClick}
            >
                Save
            </Button>
        </form>
    );
}

export default ReviewInput;