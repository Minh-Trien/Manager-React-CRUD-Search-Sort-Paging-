import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Mainter from './components/Mainter';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter


function App() {
  return (
    <div className="App">
      <BrowserRouter> {/* Wrap Mainter component in BrowserRouter */}
        <Mainter />
      </BrowserRouter>
    </div>
  )
}

export default App
