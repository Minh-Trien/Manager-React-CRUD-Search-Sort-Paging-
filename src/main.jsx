import React from 'react'
import ReactDOM from 'react-dom'; // Sử dụng ReactDOM thay vì ReactDOM.createRoot
import App from './App.jsx'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
ReactDOM.render( // Sử dụng ReactDOM.render
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
