import React from 'react';
import './App.css';
import OverviewBets from './OverviewBets';
import insurance from './insurance.svg'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Insurance?
        </p>
        <img className="App-insurance" src={insurance}></img>
      </header>
      <OverviewBets/>
    </div>
  );
}

export default App;
