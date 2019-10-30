import React from 'react';
import './App.css';
import Betting from './Betting';
import insurance from './insurance.svg'
import { Provider } from 'react-redux';
import { createStore, bindActionCreators } from 'redux';
import produce from "immer"

const initialState = {
  bets:{},
  showCompleteForm:false,
  currCompleteBet:{},
  currGroupCompleteBet:{},
  stats:{},
  rate:"",
  historicalStats:[]
};

function reducer(state = initialState, action) {
  
  console.log('reducer', state, action);

  switch(action.type) {
    case 'GET_BETS':
      let betsJson = {}
      action.bets.forEach(function(part) {
        betsJson[part.id] = part
      })
      return produce(state, draft => {
        draft.bets= betsJson;
      });
    case 'SET_HISTORICAL_STATS':
      return produce(state, draft => {
        draft.historicalStats = action.stats;
      })
    case 'SHOW_COMPLETE_FORM':
      return produce(state, draft => {
        draft.showCompleteForm=true;
        draft.currCompleteBet=action.completeBet
      });  
    case 'HIDE_COMPLETE_FORM':
      return produce(state, draft => {
        draft.showCompleteForm=false;
        draft.currCompleteBet={}
      }); 
    case 'SHOW_GROUP_COMPLETE_FORM':
        return produce(state, draft => {
          draft.showGroupCompleteForm=true;
          draft.currGroupCompleteBet=action.completeBet
        });  
    case 'HIDE_GROUP_COMPLETE_FORM':
      return produce(state, draft => {
        draft.showGroupCompleteForm=false;
        draft.currGroupCompleteBet={}
      });    
    case 'SAVE_BET':
      return produce(state, draft => {
        draft.bets[action.bet.id] = action.bet
        draft.bets[action.bet.id].saveInd = false
      });   
    case 'DELETE_BET':
      return produce(state, draft => {
        delete draft.bets[action.id]
      });   
    case 'SET_BET_SAVE_IND_TRUE':
      return produce(state, draft => {
        draft.bets[action.id].saveInd = true
      });
    case 'SET_BET_SAVE_IND_FALSE':
      return produce(state, draft => {
        draft.bets[action.id].saveInd = false
      });
    case 'ADD_BET':
      return produce(state, draft => {
        draft.bets[action.bet.id] = action.bet
      });
    case 'SET_STATISTICS':
      return produce(state, draft => {
        draft.stats = action.stats;
      })
    case 'SET_RATE':
      return produce(state, draft => {
        draft.rate = action.rate;
      })
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
        <Betting/>
      </div>
    </Provider>
  );
}

export default App;
