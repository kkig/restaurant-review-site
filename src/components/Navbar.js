import React from 'react';

import './Navbar.css';
import AddNewButton from './AddNewButton';

function Navbar() {
    return (
        <header className='navbar'>
            <h2>Restaurant Review</h2>
            <AddNewButton />
        </header>
    );
}

export default Navbar;