import React from 'react';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: { display: 'inline-block', fontWeight: 'bold' },
});

const NoLocation = ({ handleDisagree }) => {
  const classes = useStyles();

  return (
    <div>
      <DialogTitle id='alert-dialog-title'>{'Location not found.'}</DialogTitle>

      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Your location information is not available. Please check browser
          setting.
          <span className={classes.root}>
            Map will display default location: Vienna
          </span>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleDisagree} color='primary' autoFocus>
          OK
        </Button>
      </DialogActions>
    </div>
  );
};

export default NoLocation;
