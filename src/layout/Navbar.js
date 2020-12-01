import React, { useEffect, useState } from 'react';

// Material UI
import { AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// CSS
import './Navbar.css';

const Navbar = ({ isMobileView, isMapView, handleClick }) => {
  const showBtnText = 'Show List';
  const hideBtnText = 'Show Map';

  const [btnText, setBtnText] = useState(showBtnText);

  // Switch btn text
  useEffect(() => {
    isMapView ? setBtnText(showBtnText) : setBtnText(hideBtnText);
  }, [isMapView]);

  return (
    <header className='navbar'>
      <h2>Gastro Review</h2>
      {
        // Only display button when mobile view
        isMobileView && (
          <Button variant='contained' size='small' onClick={handleClick}>
            {btnText}
          </Button>
        )
      }
    </header>
  );
};

export default Navbar;
