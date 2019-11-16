import React from 'react';

function StoreItem(props) {
    return(
        <div className='list-container'>
            <h3>{props.name}</h3>
            <ul>
                <li>{props.type}</li>
                <li>{props.address}</li>
            </ul>
            <hr />
        </div>
    );
}

export default StoreItem;