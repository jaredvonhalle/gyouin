import React, { Component } from 'react';
import './OverviewBets.css';
import ReactTable from "react-table";
import "react-table/react-table.css";

class OverviewBets extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bets:[],
      changedInd:[]
    };
    this.myRef = React.createRef();
    this.renderEditable = this.renderEditable.bind(this);
    this.saveRow = this.saveRow.bind(this);
  }

  componentDidMount() {
    const url = '/api/Bets';

    fetch(
      url
    )
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState({ bets:data })
    })
    
  }

  saveRow(cellInfo) {
    console.log(cellInfo);
    this.postData(cellInfo);
  }

  postData(cellInfo) {
    let data = this.state.bets[cellInfo.index]
    const url = '/api/Bets/' + data.id;
    // The data we are going to send in our request
    
    let jsonData = JSON.stringify(data)
    // The parameters we are gonna pass to the fetch function
    let fetchData = { 
        method: 'PUT', 
        body: jsonData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
    }
    fetch(url, fetchData)
    .then(response => {
        console.log(response)
    });
  }

  isChanged(cellInfo) {
    var ind = this.state.changedInd.includes(456);
    return ind;
  }

  renderEditable(cellInfo) {
    return (
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.bets];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
          this.setState({changedInd:[456]})
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.bets[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

	render() {

    const columns = [{
      Header: 'Challenger',
      accessor: 'challenger',
      Cell: this.renderEditable
    },{
      Header: 'Odds',
      accessor: 'odds',
      Cell: this.renderEditable
    },{
      Header: 'Description',
      accessor: 'description',
      Cell: this.renderEditable
    },{
      Header: 'Accepter',
      accessor: 'accepter',
      Cell: this.renderEditable
    },{
      Header: 'Base Amount',
      accessor: 'amount',
      Cell: this.renderEditable
    },{
      Header: 'Create Date',
      accessor: 'createDate'
    },{
      Header: 'End Date',
      accessor: 'endDate',
      Cell: this.renderEditable
    },{
      Header: 'Status',
      accessor: 'status'
    },{
      Header: 'Save',
      Cell: props => {
        return(
          <button className={(this.isChanged(props) ? 'editable' : 'not')} onClick={() => this.saveRow(props)}>
            Save
          </button>
        )
      },
      filterable: false,
      sortable: false,
      width:100,
      maxWidth:100,
      minWidth:100
    },{
      Header: 'Delete',
      Cell: props => {
        return(
          <button>Delete</button>
        )
      },
      filterable: false,
      sortable: false,
      width:100,
      maxWidth:100,
      minWidth:100
    }
  ]
    return (
      <div className="overview-bets container-fluid">
        <ReactTable
          data={this.state.bets}
          columns={columns}
          defaultPageSize = {10}
          filterable
          defaultSorted={[
            {
              id: "endDate"
            }
          ]}
        />
      </div>
    );
  }
}

export default OverviewBets;