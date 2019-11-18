import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function ContainedButtons() {
    const classes = useStyles();
  
    return (
      <div>
        <Button size="small" variant="contained" className={classes.button} id="add-new-btn">
          Add New
        </Button>
      </div>
    );
}