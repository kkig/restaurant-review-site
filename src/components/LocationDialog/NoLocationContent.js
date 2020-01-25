import React from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// CSS
import './NoLocationContent.css';

const NoLocation = ({ handleDisagree }) => {
    return (
        <div>
            <DialogTitle id="alert-dialog-title">{"Location data not found."}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Location service is not available. Please check browser setting. 
                    <span className="dialog-default-city">Map will display default location: Vienna</span>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDisagree} color="primary" autoFocus>
                    OK
                </Button>
            </DialogActions>                        
        </div>
    );
};

export default NoLocation;