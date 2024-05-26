import React from 'react';
import ReactDOM from 'react-dom/client';

import BrowserRouterProvider from './router/BrowserRouterProvider.jsx';
import StoreProvider from './store/StoreProvider.jsx';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouterProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </BrowserRouterProvider>
  </React.StrictMode>
);
