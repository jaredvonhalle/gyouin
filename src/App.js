import React from 'react';
import './App.css';
import OverviewBets from './OverviewBets';
import NewBet from './NewBet';
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
      <NewBet/>
      <OverviewBets/>
    </div>
  );
}

export default App;
