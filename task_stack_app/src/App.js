import React, { useState, useEffect } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Navbar from './Components/Navbar.js'
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory } from 'react-router-dom';


function App() {
  const history = useHistory();
  return (
    <div className="App">
      <Navbar/>
    </div>
  );
}

export default App;
