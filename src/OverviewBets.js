import React, { Component } from 'react';
import './OverviewBets.css';
import ReactTable from "react-table";
import "react-table/react-table.css";

class OverviewBets extends Component {

  constructor(props) {
    super(props);
    this.state = {bets:[]};
    this.myRef = React.createRef();
    this.challengerClick = this.challengerClick.bind(this);
  }

  challengerClick(e) {
    console.log(e);
  }

  componentDidMount() {
    fetch(
      '/api/Bets'
    )
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState({ bets:data })
    })
    
  }

	render() {

    const columns = [{
      Header: 'challenger',
      accessor: 'challenger'
    },{
      Header: 'odds',
      accessor: 'odds'
    },{
      Header: 'description',
      accessor: 'description'
    },{
      Header: 'accepter',
      accessor: 'accepter'
    },{
      Header: 'amount',
      accessor: 'amount'
    },{
      Header: 'createDate',
      accessor: 'createDate'
    },{
      Header: 'endDate',
      accessor: 'endDate'
    },{
      Header: 'status',
      accessor: 'status'
    }]
    return (
      <div className="overview-bets container-fluid">
        <ReactTable
          data={this.state.bets}
          columns={columns}
          defaultPageSize = {10}
        />
      </div>
    );
  }
}

export default OverviewBets;