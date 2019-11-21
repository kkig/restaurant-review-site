import React from 'react';
import './App.css';

import Navbar from './components/Navbar';
import RestaurantMap from './components/RestaurantMap';
import StoreListSection from './UIComponents/FilterButton';
//import StoreLists from './components/StoreLists';

function App() {
  return (
    <div className="App">
      <Navbar />
      <RestaurantMap />
      <StoreListSection />
    </div>
  );
}

export default App;
