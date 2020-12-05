import React from 'react';

import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import { withStyles, styled } from '@material-ui/core/styles';

// Store
import RestaurantListContent from './RestaurantList';

const ListContainer = styled(Box)({
  '--star-color': '#ffb400',
  '--line-color': 'lightgray',
  '--container-padding-x': '1rem',
  '--container-padding-y': '.5rem',
  '--container-padding':
    'var(--container-padding-y) var(--container-padding-x)',

  height: '100%',
  overflow: 'auto',
  backgroundColor: '#ffffff',
  zIndex: 1,
  borderLeft: '1px solid var(--line-color)',
});

const SliderWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  padding: '.25rem var(--container-padding-x)',
  marginTop: '.25em',
  borderBottom: '0.25px solid var(--line-color)',
  alignItems: 'center',
});

const SliderLabel = styled(Box)({
  paddingRight: '1.5rem',
  textTransform: 'uppercase',
  fontSize: '0.75rem',
});

const ReviewSlider = withStyles({
  root: {
    color: 'var(--star-color)',
    height: 8,
    marginRight: '1rem',
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const RestaurantList = () => {
  const [value, setValue] = React.useState([0, 5]);

  const valuetext = (value) => `${value} Stars`;

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <ListContainer>
      <SliderWrapper>
        <SliderLabel component='span'>Filter by rating</SliderLabel>
        <ReviewSlider
          value={value}
          onChange={handleChange}
          aria-labelledby='range-slider'
          getAriaValueText={valuetext}
          valueLabelDisplay='off'
          min={0}
          max={5}
        />
      </SliderWrapper>

      <RestaurantListContent minValue={value[0]} maxValue={value[1]} />
    </ListContainer>
  );
};

export default RestaurantList;
