import React from 'react';
import './App.css';
import OverviewBets from './OverviewBets';
import NewBet from './NewBet';
import insurance from './insurance.svg'
import { Provider } from 'react-redux';
import { createStore, bindActionCreators } from 'redux';

const initialState = {
  bets:[],
  showCompleteForm:false,
  currCompleteBet:{}
};

function reducer(state = initialState, action) {
  
  console.log('reducer', state, action);

  switch(action.type) {
    case 'GET_BETS':
      return {
        ...state, 
        bets:action.bets
      };
    case 'SHOW_COMPLETE_FORM':
      return {
        ...state,
        showCompleteForm:true,
        currCompleteBet:action.completeBet
      }
    case 'HIDE_COMPLETE_FORM':
      return {
        ...state,
        showCompleteForm:false,
        currCompleteBet:{}
      }
    case 'SAVE_BET':
      var successInd = false
      var currBets = [...state.bets]
      currBets.forEach(function(part, index, theArray) {
        if (part.id === action.bet.id) {
          theArray[index] = action.bet;
          theArray[index].saveInd = false;
          successInd = true
        }
      })
      if(!successInd) {
        alert("Not able to save bet. Don't blam Jared");
      }
      return {bets:currBets};
    case 'DELETE_BET':
      var newBets = state.bets.filter(function( obj ) {
        return obj.id !== action.id;
      });
      return {bets:newBets};
    case 'SET_BET_SAVE_IND_TRUE':
      var currBets = [...state.bets]
      currBets.forEach(function(part, index, theArray) {
        if (part.id === action.id) {
          theArray[index]['saveInd'] = true;
        }
      })
      return {bets:currBets};
    case 'ADD_BET':
      return {bets:[...state.bets, action.bet]}
    default:
      return state;
  }
}

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
