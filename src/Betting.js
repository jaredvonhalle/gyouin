import React, { Component } from 'react';
import OverviewBets from './OverviewBets';
import GroupBets from './GroupBets';
import NewBet from './NewBet';
import NewGroupBet from './NewGroupBet';
import Statistics from './Statistics';
import Historical from './Historical';
import { connect } from 'react-redux';
import Config from './Config';
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
    let baseObject = {
      "name":"",
      "winnings":0,
      "exposure":0,
      "totalBet":0,
      "numberComplete":0,
      "numberOngoing":0,
      "challenges":0,
      "acceptances":0
    }

    let stats = {}

    let a = Config;
    a.players.forEach(function(player) {
      stats[player] = {...baseObject};
      stats[player].name = player;
    })
    
    Object.values(this.props.bets).forEach(function(bet) {

      if (bet.isComplete) {
        bet.results.forEach(function(result) {
          let currPlayer = result.player;
          let currAmount = result.amount;
            //winnings
            stats[currPlayer].winnings += currAmount;
            //number complete
            stats[currPlayer].numberComplete += 1;
        })
        if(bet.type == "PERSONAL") {
          stats[bet.challenger].totalBet += bet.amount;
          stats[bet.accepter].totalBet += bet.amount;
        } else {
          bet.players.forEach(function(player) {
            stats[player].totalBet += bet.amount;
          })
        }
      } else {
        //exposure
        if (bet.type == "PERSONAL") {
          let oddsSplit = bet.odds.split(":");
          let giving = oddsSplit[0];
          let getting = oddsSplit[1];
          
          if (giving > getting) {
            let oddsRatio = parseFloat(giving)/parseFloat(getting);
            stats[bet.accepter].exposure += (bet.amount * oddsRatio);
            stats[bet.challenger].exposure += bet.amount;
          } else if (getting > giving) {
            let oddsRatio = parseFloat(getting)/parseFloat(giving);
            stats[bet.challenger].exposure += (bet.amount * oddsRatio);
            stats[bet.accepter].exposure += bet.amount;
          } else {
            stats[bet.challenger].exposure += bet.amount;
            stats[bet.accepter].exposure += bet.amount;
          }

          stats[bet.challenger].numberOngoing += 1;
          stats[bet.accepter].numberOngoing += 1;
          
        } else {
          bet.players.forEach(function(player) {
            stats[player].exposure += bet.amount;
            stats[player].numberOngoing += 1;
          })
        }
      }
      if(bet.type == "PERSONAL") {
        //challenges
        stats[bet.challenger].challenges += 1
        //acceptances
        stats[bet.accepter].acceptances += 1
      }
    })

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
