import React from 'react';

// Components
import AppContainer from './components/AppContainer';

// CSS
import './App.css';

// Store
import StoreProvider from './stores/RestourantStores';

const App = () => {

  return (
    <div className="app">
      <StoreProvider>

        <AppContainer />

      </StoreProvider>
    </div>
  );

};

export default App;
