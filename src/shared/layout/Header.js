import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Title from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'tomato',
    color: 'white',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    padding: '0.5em 1em',
    boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 
      0px 1px 10px 0px rgba(0, 0, 0, 0.12)`,
    zIndex: 2,
  },
  title: {
    fontSize: '1.5em',
    margin: '0.25em 0',
  },
});

const Header = ({ isMapView, handleClick }) => {
  const classes = useStyles();
  const btnText = isMapView ? 'show list' : 'show map';

  return (
    <header className={classes.root}>
      <Title variant='h6' className={classes.title}>
        Gastro Review
      </Title>

      <Hidden smUp>
        <Button variant='contained' size='small' onClick={handleClick}>
          {btnText}
        </Button>
      </Hidden>
    </header>
  );
};

export default Header;
