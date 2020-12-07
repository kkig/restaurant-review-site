import React from 'react';

import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    padding: 'var(--container-padding)',
    display: 'flex',
    justifyContent: 'space-between',
  },

  image: {
    width: '35%',
    height: 100,
  },

  textBlock: {
    width: '60%',
  },

  text: {
    height: 10,
  },
});

const ListItemSkelton = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Skeleton className={classes.image} variant='rect' />
      <div className={classes.textBlock}>
        <Skeleton className={classes.text} variant='text' />
        <Skeleton className={classes.text} variant='text' />
        <Skeleton className={classes.text} variant='text' />
      </div>
    </div>
  );
};

export default ListItemSkelton;
