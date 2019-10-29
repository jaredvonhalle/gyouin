import React, { Component } from 'react';
import './Historical.css';
import { connect } from 'react-redux';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const testData = [{
	"date" : "Jan 2019",
	"Andrew": 50,
  "Ben": 10,
  "Jared": -19,
  "Marc": 0,
  "Matt":9,
  "Max":-3,
  "Zach":7
}, {
	"date": "Feb 2019",
	"Andrew": 60,
  "Ben": -20,
  "Jared": 20.5,
  "Marc": 30,
  "Matt":13,
  "Max":-8,
  "Zach":70
}, {
	"date": "Mar 2019",
	"Andrew": 90,
  "Ben": -29,
  "Jared": 20.5,
  "Marc": 90,
  "Matt":5,
  "Max":-23,
  "Zach":70
}, {
	"date": "Apr 2019",
	"Andrew": 100,
  "Ben": -10,
  "Jared": -4,
  "Marc": 80,
  "Matt":-40,
  "Max":-19,
  "Zach":77
}, {
	"date": "May 2019",
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
  }

	render() {

    
    return (
      <div className="historical-container">
        <div className="historical-winnings-title">Historical Winnings</div>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            width={500}
            height={300}
            data={testData}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <ReferenceLine y={0} stroke="black" strokeDasharray="5 5" />
            <Tooltip />
            <Legend />
            <Line type="linear" dataKey="Andrew" stroke="#E74C3C" />
            <Line type="linear" dataKey="Ben" stroke="#8E44AD" />
            <Line type="linear" dataKey="Jared" stroke="#E67E22" />
            <Line type="linear" dataKey="Marc" stroke="#008000" />
            <Line type="linear" dataKey="Matt" stroke="#FF00FF" />
            <Line type="linear" dataKey="Max" stroke="#808080" />
            <Line type="linear" dataKey="Zach" stroke="#0000FF" />
          </LineChart>
        </ResponsiveContainer>
        
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    bets: state.bets,
    stats: state.stats
  };
}

export default connect(mapStateToProps)(Historical);