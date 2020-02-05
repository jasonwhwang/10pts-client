import React from 'react';
import './App.css';
import Logo from './img/logo.svg'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={Logo}
          className="image"
          alt="10pts - Find the best food in the world. Food reviews by chefs & food lovers."/>
        <div className="heading">App Start</div>
      </header>
    </div>
  );
}

export default App;
