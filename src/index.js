import React from 'react';
import ReactDOM from 'react-dom/client';  // Import createRoot from react-dom/client
import App from './App';
import './index.css';
import { Amplify } from 'aws-amplify'; // Import Amplify as a named import
import awsconfig from './aws-exports';

// Configure Amplify with the configuration from aws-exports
Amplify.configure(awsconfig);

// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));  // Create a root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
