import React from 'react';
import { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BicycleStore from './store/BicycleStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    bicycle: new BicycleStore(),
  }}>
    <App />
  </Context.Provider>,
);
