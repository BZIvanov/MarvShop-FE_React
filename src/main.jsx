import React from 'react';
import ReactDOM from 'react-dom/client';

import StoreProvider from '@/store/StoreProvider';
import BrowserRouterProvider from '@/router/BrowserRouterProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouterProvider />
    </StoreProvider>
  </React.StrictMode>
);
