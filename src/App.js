import React from 'react';

import './App.css';

import Navbar from './components/Navbar';
import RestaurantMap from './components/RestaurantMap';
import StoreListContainer from './components/StoreListContainer';
//import NewStoreProvider from './APIs/StoreDataContext';
//import StoreLists from './components/StoreLists';

function App() {

  return (
    <div className="App">
      <Navbar />
      <RestaurantMap />
      <StoreListContainer />
    </div>
  );
}

export default App;
