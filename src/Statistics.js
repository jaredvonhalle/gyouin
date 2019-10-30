import React, { Component } from 'react';
import './Statistics.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from 'react-redux';

class Statistics extends Component {

  constructor(props) {
    super(props);
  }

	render() {

    const columns = [{
      Header: 'Player',
      accessor: 'name'
    },{
      Header: 'Winnings',
      accessor: 'winnings',
      defaultSortDesc: true
    },{
      Header: 'Current Exposure',
      accessor: 'exposure',
      defaultSortDesc: true
    },{
      Header: 'Total Bet',
      accessor: 'totalBet',
      defaultSortDesc: true
    },{
      Header: '# Complete',
      accessor: 'numberComplete',
      defaultSortDesc: true
    },{
      Header: '# Pending',
      accessor: 'numberOngoing',
      defaultSortDesc: true
    },{
      Header: 'Challenges',
      accessor: 'challenges',
      defaultSortDesc: true
    },{
      Header: 'Acceptances',
      accessor: 'acceptances',
      defaultSortDesc: true
    }]

    let renderStats = Object.values(this.props.stats);

    return (
      <div className="stats-container">
        <div className="stats-title">Statistics</div>
        <ReactTable
          className="-striped"
          data={renderStats}
          columns={columns}
          defaultPageSize = {7}
          showPagination={false}
          multiSort={true}
          defaultSorted={[
            {
              id: "winnings",
              desc:true
            }
          ]}
        />
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

export default connect(mapStateToProps)(Statistics);