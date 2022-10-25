import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//4
import { BrowserRouter } from 'react-router-dom';

//9
import { UserContextProvider } from './context/userContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <BrowserRouter>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BrowserRouter>
  </div>
);