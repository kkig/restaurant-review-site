import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Store
import ContextProvider from './shared/contexts/ContextProvider';

import App from './App';

const myTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF6347',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },

  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          boxSizing: 'border-box',
        },
        body: {
          margin: 0,
          width: '100%',
          height: '100%',
          fontSize: 14,
          letterSpacing: '.025em',
          color: '#333333',
          lineHeight: 1.5,
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
      },
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={myTheme}>
    <ContextProvider>
      <CssBaseline />
      <App />
    </ContextProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
