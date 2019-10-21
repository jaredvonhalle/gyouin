import React, { Component } from 'react';
import './OverviewBets.css';

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
    var items = this.state.bets.map(
      it => 
      <tr>
        <td onClick={this.challengerClick} key={it.id}>{it.challenger}</td>
        <td key={it.id}>{it.odds}</td>
        <td key={it.id}>{it.description}</td>
        <td key={it.id}>{it.accepter}</td>
        <td key={it.id}>{it.amount}</td>
        <td key={it.id}>{it.createDate.substr(0,10)}</td>
        <td key={it.id}>{it.endDate.substr(0,10)}</td>
        <td key={it.id}>{it.status}</td>
      </tr>
    );
    return (
      <div className="overview-bets container-fluid">
        <table class="overview-bets-table table table-striped">
          <thead>
            <tr>
              <th>Challenger</th>
              <th>Odds</th>
              <th>Description</th>
              <th>Accepter</th>
              <th>Base Amount</th>
              <th>Create Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
      </div>
    );
  }
}

export default OverviewBets;