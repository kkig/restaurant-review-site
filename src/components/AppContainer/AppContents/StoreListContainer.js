import React from 'react';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

// CSS
import './StoreListContainer.css';

// Store
import StoreList from './StoreListContainer/StoreList';

// Style for slider
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

const valuetext = (value) => {
  return `${value} Stars`;
}


const StoreListContainer = () => {
  const [ value, setValue ] = React.useState([0, 5]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="store-section">

      <div className="filter-slider-section">
        <span className="filter-label">Filter by rating</span>
        <ReviewSlider
            value={value}
            onChange={handleChange}
            aria-labelledby="pretto range-slider"
            getAriaValueText={valuetext}
            valueLabelDisplay="off"
            min={0}
            max={5}
        />
      </div>
      
      <StoreList minValue={value[0]} maxValue={value[1]} />

    </div>
  );
};

export default StoreListContainer;