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
      accessor: 'name',
      Cell: this.renderEditable
    },{
      Header: 'Winnings',
      accessor: 'winnings',
      Cell: this.renderEditableNumber
    },{
      Header: 'Exposure',
      accessor: 'exposure',
      Cell: this.renderEditableNumber
    },{
      Header: '# Complete',
      accessor: 'numberComplete',
      Cell: this.renderEditable
    },{
      Header: '# Pending',
      accessor: 'numberOngoing',
      Cell: this.renderEditable
    },{
      Header: 'Challenges',
      accessor: 'challenges',
    },{
      Header: 'Acceptances',
      accessor: 'acceptances',
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