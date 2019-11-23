import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';

import './Navbar.css';

function Navbar() {
    const showBtnText = 'Show List';
    const hideBtnText = 'Hide List';

    const [ windowValue, setValue ] = useState(window.innerWidth);
    const [ btnText, setBtnText ] = useState(showBtnText);
    const [ isMapVisible, setMapVisible ] = useState(true);

    const hideMap = () => {
        document.querySelector('.map-section').style.display = 'none';
        document.querySelector('.store-section').style.display = 'initial';
        setBtnText(hideBtnText);
        setMapVisible(false);
    }

    const showMap = () => {
        document.querySelector('.map-section').style.display = 'initial';
        document.querySelector('.store-section').style.display = 'none';
        setBtnText(showBtnText);
        setMapVisible(true);
    }

    
    const resetView = () => {
        document.querySelector('.map-section').style.display = 'initial';
        document.querySelector('.store-section').style.display = 'initial';
        setBtnText(showBtnText);
        //windowValue <= 768 && showMap();
        //setMapVisible(true);
    }

    const handleClick = () => {
        isMapVisible ? hideMap() : showMap();
    }

    useEffect(() => {

        const handleResize = () => {
            setValue(window.innerWidth);
            resetView();
        }
        window.addEventListener('resize', handleResize);
        windowValue < 768 && isMapVisible && showMap();
    });

    //window.onload(windowValue < 768 && showMap())

    //resetView();
    console.log(windowValue);

    return (
        <header className='navbar'>
            <h2>Gastro Review</h2>
            {
                windowValue <= 768 &&
                <Button 
                    variant="contained"
                    size="small"
                    onClick={handleClick}
                >
                    { btnText }
                </Button>
            }
        </header>
    );
}

export default Navbar;