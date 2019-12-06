import React, { Component } from 'react';
import './Historical.css';
import { connect } from 'react-redux';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const testData = [{
  "timePeriod" : "Jan 2019",
  "type":"winnings",
	"Andrew": 50,
  "Ben": 10,
  "Jared": -19,
  "Marc": 0,
  "Matt":9,
  "Max":-3,
  "Zach":7
}, {
	"timePeriod": "Feb 2019",
  "type":"winnings",
	"Andrew": 60,
  "Ben": -20,
  "Jared": 20.5,
  "Marc": 30,
  "Matt":13,
  "Max":-8,
  "Zach":70
}, {
	"timePeriod": "Mar 2019",
  "type":"winnings",
	"Andrew": 90,
  "Ben": -29,
  "Jared": 20.5,
  "Marc": 90,
  "Matt":5,
  "Max":-23,
  "Zach":70
}, {
	"timePeriod": "Apr 2019",
  "type":"winnings",
	"Andrew": 100,
  "Ben": -10,
  "Jared": -4,
  "Marc": 80,
  "Matt":-40,
  "Max":-19,
  "Zach":77
}, {
	"timePeriod": "May 2019",
  "type":"winnings",
	"Andrew": 10,
  "Ben": -19,
  "Jared": 30,
  "Marc": 80,
  "Matt":-10,
  "Max":-82,
  "Zach":100
}]

class Historical extends Component {

  constructor(props) {
    super(props);
    this.setHistoricalStats = this.setHistoricalStats.bind(this);
  }

  componentWillMount() {
    this.setHistoricalStats()
  }

  setHistoricalStats() {
    const url = process.env.REACT_APP_API_DOMAIN + '/api/BetsStats';
    fetch(
      url
    )
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.props.dispatch({type:'SET_HISTORICAL_STATS', stats:data})
    })
  }

	render() {

    
    return (
      <div className="historical-container">
        <div className="historical-winnings-title">Historical Winnings</div>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            width={500}
            height={300}
            data={this.props.historicalStats}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timePeriod" />
            <YAxis />
            <ReferenceLine y={0} stroke="black" strokeDasharray="5 5" />
            <Tooltip />
            <Legend />
            <Line type="linear" dataKey="andrew" stroke="#E74C3C" />
            <Line type="linear" dataKey="ben" stroke="#8E44AD" />
            <Line type="linear" dataKey="jared" stroke="#E67E22" />
            <Line type="linear" dataKey="marc" stroke="#008000" />
            <Line type="linear" dataKey="matt" stroke="#FF00FF" />
            <Line type="linear" dataKey="max" stroke="#808080" />
            <Line type="linear" dataKey="zach" stroke="#0000FF" />
          </LineChart>
        </ResponsiveContainer>
        
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    historicalStats: state.historicalStats
  };
}

export default connect(mapStateToProps)(Historical);