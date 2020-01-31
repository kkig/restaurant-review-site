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
            <DialogTitle id="alert-dialog-title">{"Use your location?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Would you like to use your location to display map and restaurants?
                    <span style={{display: 'block', fontWeight: 'bold'}}>If denied, we will use default location: Vienna</span>
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleDisagree} color="primary">
                    Deny
                </Button>
                <Button onClick={handleAgree} color="primary" autoFocus>
                    OK
                </Button>
            </DialogActions>            
        </div>
    );
}

export default SelectLocation;