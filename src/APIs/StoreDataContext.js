import React from 'react';

const initialState = {
    clickedLat: null,
    clickedLng: null
};

const NewStoreContext = React.createContext(initialState);

const NewStoreProvider = (props) => {

    return (
        <NewStoreContext.Provider value={initialState}>
            {props.children}
        </NewStoreContext.Provider>
    );
}

export default { NewStoreContext, NewStoreProvider };