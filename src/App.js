import React from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Map from './components/Map';
import StoreLists from './components/StoreLists';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Map />
      <StoreLists />
    </div>
  );
}

export default App;
