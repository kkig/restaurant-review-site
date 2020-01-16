import React from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

// Component
import DialogContent from './DialogWindow/DialogContent';

const DialogWindow = (props) => {

    return (
        <Dialog
        className="dialog-rating"
        style={{ margin: '.5em 0'}}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
            Add New restaurant?
            </DialogTitle>

            <DialogContent 
                clickedDetail={props.clickedDetail}
                isNewShopInput={props.isNewShopInput}
                handleDialogNameChange={props.handleDialogNameChange}
                handleDialogTypeChange={props.handleDialogTypeChange}
                handleDialogAddressChange={props.handleDialogAddressChange}
                handleDialogRatingChange={props.handleDialogRatingChange}
                handleSubmit={props.handleSubmit}

            />

            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>

                <Button onClick={props.handleSubmit} color="primary">
                    Add
                </Button>
            </DialogActions>

        </Dialog>
    );
};

export default DialogWindow;