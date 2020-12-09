import React, { useMemo } from 'react';

import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';

const GOOGLE_MAP_API_KEY =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_GOOGLE_KEY
    : process.env.REACT_APP_DEV_GOOGLE_KEY;

const ImageContainer = styled(Box)({
  paddingRight: '.75em',
  display: 'flex',
  alignItems: 'center',
});

const RestaurantImage = ({ lat, lng }) => {
  const source = `https://maps.googleapis.com/maps/api/streetview?size=130x90&location=${lat},${lng}&key=${GOOGLE_MAP_API_KEY}`;

  return useMemo(
    () => (
      <ImageContainer>
        <img src={source} alt='street view of restaurant'></img>
      </ImageContainer>
    ),
    [source]
  );
};

export default RestaurantImage;
