import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'normalize.css'; // Normalize.css to reset browser styles
import './index.css';   // Your custom styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
