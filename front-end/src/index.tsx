import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';
import ReactDOMClient from 'react-dom/client';


import store from './redux/store'; //

let root = ReactDOMClient.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <App />
  
  );
