import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import ReduxStore from './store/ReduxStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={ReduxStore}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
);

