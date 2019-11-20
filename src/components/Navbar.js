import React from 'react';

import './Navbar.css';

function Navbar() {
    return (
        <header className='navbar'>
            <h2>Restaurant Review</h2>
            <small className="navbar-note">Please click map to add new restaurant.</small>
        </header>
    );
}

export default Navbar;