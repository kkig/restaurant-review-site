import React from 'react';
import './App.css';

import Navbar from './components/Navbar';
import RestaurantMap from './components/RestaurantMap';
import StoreLists from './components/StoreLists';

function App() {
  return (
    <div className="App">
      <Navbar />
      <RestaurantMap />
      <StoreLists />
    </div>
  );
}

export default App;
