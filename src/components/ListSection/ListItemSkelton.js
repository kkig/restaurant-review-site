import React from 'react';

import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles, styled } from '@material-ui/core/styles';

const SkeltonTexts = styled(Box)({
  width: '60%',

  '& .MuiSkeleton-text': {
    height: 10,
  },
});

const SkeltonImage = styled(Skeleton)({
  width: '35%',
  height: 100,
});

const useStyles = makeStyles({
  root: {
    padding: 'var(--container-padding)',
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const ListItemSkelton = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SkeltonImage variant='rect' />
      <SkeltonTexts>
        <Skeleton variant='text' />
        <Skeleton variant='text' />
        <Skeleton variant='text' />
        <Skeleton variant='text' />
      </SkeltonTexts>
    </div>
  );
};

export default ListItemSkelton;
