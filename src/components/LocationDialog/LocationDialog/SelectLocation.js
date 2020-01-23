import React from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const SelectLocation = ({ handleDisagree, handleAgree }) => {
    return (
        <div>
            <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Gastroview use location data to display map and restaurants around your location.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleDisagree} color="primary">
                Disagree
            </Button>
            <Button onClick={handleAgree} color="primary" autoFocus>
                Agree
            </Button>
            </DialogActions>            
        </div>
    );
}

export default SelectLocation;