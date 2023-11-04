import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Forms from './components/java script/Form';
import Home from './components/java script/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Forms />} />
          <Route path="/home/:registrationNumber" element={<Home />} />    
              </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
