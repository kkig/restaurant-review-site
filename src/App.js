import React from 'react';

import './App.css';

import Navbar from './components/Navbar';
import RestaurantMap from './components/RestaurantMap';
import StoreListContainer from './components/StoreListContainer';

import StoreProvider from './stores/RestourantStores';

//import { usePlaces } from './APIs/usePlaces';

const App = () => {

  return (
    <div className="App">
      <StoreProvider>
        <Navbar />
        <RestaurantMap />
        <StoreListContainer />
      </StoreProvider>
    </div>
  );
};

export default App;
