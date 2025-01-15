import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App';

// Create a root for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap your app inside <BrowserRouter>
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
