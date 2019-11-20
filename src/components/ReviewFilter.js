import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const PrettoSlider = withStyles({
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

const marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5'
    }
];

function valuetext(value) {
  return `${value} Stars`;
}

function valueLabelFormat(value) {
    return marks.findIndex(mark => mark.value === value) + 1;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState([0, 5]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="review-filter">
        <span className="filter-label">Filter by rating</span>
        <PrettoSlider
            value={value}
            valueLabelFormat={valueLabelFormat}
            onChange={handleChange}
            aria-labelledby="pretto range-slider"
            getAriaValueText={valuetext}
            valueLabelDisplay="off"
            marks
            min={1}
            max={5}
        />
        {console.log(value)}
    </div>
  );
}