import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LandingPage from './frontend/landing_page.tsx';


import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>
);

reportWebVitals();
