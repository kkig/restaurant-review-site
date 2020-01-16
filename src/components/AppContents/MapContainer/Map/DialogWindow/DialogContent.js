import React from 'react';

// Material UI
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Rating from '@material-ui/lab/Rating';

import Loading from '../../../../../UIComponents/Loading';

const DialogContent = props => {
    return (
        <DialogContent>
            {
                props.clickedDetail && props.isNewShopInput ? 
                <div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Restaurant Name"
                        value={props.clickedDetail.name}
                        onChange={e => props.handleDialogNameChange(e, e.target.value)}
                        fullWidth
                    />

                    <FormControl className="inputSelect">
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            margin="dense"
                            labelId="shop-type-select-label"
                            id="shop-type-select"
                            value={props.clickedDetail.type}
                            onChange={e => props.handleDialogTypeChange(e, e.target.value)}
                        >
                            <MenuItem value={"Restaurant"}>Restaurant</MenuItem>
                            <MenuItem value={"Austrian"}>Austrian</MenuItem>
                            <MenuItem value={"Italian"}>Italian</MenuItem>
                            <MenuItem value={"Japanese"}>Japanese</MenuItem>
                            <MenuItem value={"Chinese"}>Chinese</MenuItem>
                            <MenuItem value={"Indian"}>Indian</MenuItem>
                            <MenuItem value={"Bakery"}>Bakery</MenuItem>
                            <MenuItem value={"Cafe"}>Cafe</MenuItem>
                            <MenuItem value={"Bar"}>Bar</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        margin="dense"
                        id="address"
                        label="Address"
                        defaultValue={props.clickedDetail.address}
                        onChange={e => props.handleDialogAddressChange(e, e.target.value) }
                        fullWidth
                    />

                    <label>
                        How many stars?
                        <Rating
                            className="rating-input"
                            name="review-star-input"
                            size="small"
                            value={props.clickedDetail.avgRating}
                            precision={0.5}
                            onChange={e => props.handleDialogRatingChange(e, e.target.value)}
                        />
                        <span
                            className="review-score"
                            style={{ padding: "0 .5rem" }}
                        >
                            {props.clickedDetail.avgRating}
                        </span>
                    </label>

                </div>  :

                <Loading />

            }
        </DialogContent>
    );
};

export default DialogContent;