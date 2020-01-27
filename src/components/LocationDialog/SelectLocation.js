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
                    Gastro Review need location to display map and restaurants. 
                    <span style={{display: 'block', fontWeight: 'bold'}}>If you don't want to use your current location, we will use default location: Vienna.</span>
                    <span style={{display: 'block'}}>Would you like to use your location?</span>
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