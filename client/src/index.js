import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import WindowDimensionsProvider from './api/windowDimensions';
import { setStore } from './api/socket';

setStore(store);

ReactDOM.render(
  <WindowDimensionsProvider>
  <Provider store={store}>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </Provider>
  </WindowDimensionsProvider>,
  document.getElementById('root')
);
