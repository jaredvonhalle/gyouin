import React, { Component } from 'react';
import OverviewBets from './OverviewBets';
import GroupBets from './GroupBets';
import NewBet from './NewBet';
import NewGroupBet from './NewGroupBet';
import Statistics from './Statistics';
import Historical from './Historical';
import { connect } from 'react-redux';
import {getUpdatedStats} from './BetUtils';
import './Betting.css';

class Betting extends Component {

  constructor(props) {
    super(props);
    this.setBets = this.setBets.bind(this);
    this.setStats = this.setStats.bind(this);
    this.setExchangeRates = this.setExchangeRates.bind(this);
  }

  componentWillMount() {
    this.setBets()
  }

  componentDidMount() {
    this.setExchangeRates()
  }

  setExchangeRates() {
    const url = 'https://api.exchangeratesapi.io/latest?base=AUD&symbols=USD';
    fetch(
      url
    )
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.props.dispatch({type:'SET_RATE', rate:data.rates.USD})
      this.setStats();
    })
  }

  setBets() {
    const url = '/api/Bets';
    fetch(
      url
    )
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.props.dispatch({type:'GET_BETS', bets:data})
      this.setStats();
    })
  }

  setStats() {
    let stats = getUpdatedStats(this.props.bets);
    this.props.dispatch({type:'SET_STATISTICS', stats:stats})
  }

	render() {
    return (
      <div className="betting-container">
        <NewBet/>
        <OverviewBets/>
        <NewGroupBet/>
        <GroupBets/>
        <Statistics/>
        <Historical/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    stats:state.stats,
    bets: state.bets
  };
}

export default connect(mapStateToProps)(Betting);
