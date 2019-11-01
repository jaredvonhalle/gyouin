import React, { Component } from 'react';
import './OverviewBets.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {getPutDataRequest, deleteData } from './ApiRequests';

class BetsChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bets:[]
    };
    this.renderEditable = this.renderEditable.bind(this);
    this.renderEditableNumber = this.renderEditableNumber.bind(this);
    this.saveRow = this.saveRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }

  componentDidMount() {
    const url = process.env.REACT_APP_API_DOMAIN + '/api/Bets';

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
    let data = this.state.bets[cellInfo.index]
    //putData(data);
    let putRequest = getPutDataRequest(data);
    putRequest().then(response => {
      console.log(response);
    });
  }

  deleteRow(cellInfo) {
    let data = this.state.bets[cellInfo.index]
    deleteData(data)
  }

  renderEditableNumber(cellInfo) {
    return (
      <div
        type="number"
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.bets];
          var changedInd = (data[cellInfo.index][cellInfo.column.id] == e.target.innerHTML) ? false : true
          data[cellInfo.index][cellInfo.column.id] = parseFloat(e.target.innerHTML);
          if (changedInd) {
            data[cellInfo.index]["saveInd"] = true;
          }
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.bets[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  renderEditable(cellInfo) {
    return (
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.bets];
          var changedInd = (data[cellInfo.index][cellInfo.column.id] == e.target.innerHTML) ? false : true
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          if (changedInd) {
            data[cellInfo.index]["saveInd"] = true;
          }
          this.setState({ data });
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
      Cell: this.renderEditableNumber
    },{
      Header: 'Create Date',
      accessor: 'createDate'
    },{
      Header: 'End Date',
      accessor: 'endDate',
      Cell: this.renderEditable
    },{
      Header: 'Result',
      accessor: 'result'
    },{
      Header: 'Save',
      Cell: props => {
        return(
          <button disabled={(this.state.bets[props.index].saveInd ? '' : 'true')} 
                  className={(this.state.bets[props.index].saveInd ? 'save-highlight' : '')} 
                  onClick={() => this.saveRow(props)}>
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
          <button onClick={() => this.deleteRow(props)}>
            Delete
          </button>
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
          className="-striped"
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