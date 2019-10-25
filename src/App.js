import React from 'react';
import './App.css';
import OverviewBets from './OverviewBets';
import GroupBets from './GroupBets';
import NewBet from './NewBet';
import NewGroupBet from './NewGroupBet';
import insurance from './insurance.svg'
import { Provider } from 'react-redux';
import { createStore, bindActionCreators } from 'redux';
import produce from "immer"

const initialState = {
  bets:{},
  showCompleteForm:false,
  currCompleteBet:{},
  currGroupCompleteBet:{}
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
    case 'ADD_BET':
      return produce(state, draft => {
        draft.bets[action.bet.id] = action.bet
      });
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
        <NewGroupBet/>
        <GroupBets/>
      </div>
    </Provider>
  );
}

export default App;
