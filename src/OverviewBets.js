import React, { Component } from 'react';
import './OverviewBets.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {getPutDataRequest, getDeleteDataRequest } from './ApiRequests';
import { connect } from 'react-redux';

class OverviewBets extends Component {

  constructor(props) {
    super(props);
    this.renderEditable = this.renderEditable.bind(this);
    this.renderEditableNumber = this.renderEditableNumber.bind(this);
    this.saveRow = this.saveRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
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
      this.props.dispatch({type:'GET_BETS', bets:data})
    })
    
  }

  saveRow(cellInfo) {
    let data = this.props.bets[cellInfo.index]
    let putRequest = getPutDataRequest(data);
    putRequest().then(response => {
      console.log(response);
      if (response.ok) {
        this.props.dispatch({type:'SAVE_BET', bet:data})
      }
      
    });
  }

  deleteRow(cellInfo) {
    let data = this.props.bets[cellInfo.index]
    let deleteRequest = getDeleteDataRequest(data);
    deleteRequest().then(response => {
      console.log(response);
      if (response.ok) {
        this.props.dispatch({type:'DELETE_BET', id:data.id})
      }
    })
  }

  renderEditableNumber(cellInfo) {
    return (
      <div
        type="number"
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.bets];
          var changedInd = (data[cellInfo.index][cellInfo.column.id] == e.target.innerHTML) ? false : true
          data[cellInfo.index][cellInfo.column.id] = parseFloat(e.target.innerHTML);
          if (changedInd) {
            this.props.dispatch({type:'SET_BET_SAVE_IND_TRUE', id:data[cellInfo.index].id})
          }
        }}
        dangerouslySetInnerHTML={{
          __html: this.props.bets[cellInfo.index][cellInfo.column.id]
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
          const data = [...this.props.bets];
          var changedInd = (data[cellInfo.index][cellInfo.column.id] == e.target.innerHTML) ? false : true
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          if (changedInd) {
            this.props.dispatch({type:'SET_BET_SAVE_IND_TRUE', id:data[cellInfo.index].id})
          }
        }}
        dangerouslySetInnerHTML={{
          __html: this.props.bets[cellInfo.index][cellInfo.column.id]
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
      Header: 'Status',
      accessor: 'status'
    },{
      Header: 'Save',
      Cell: props => {
        return(
          <button disabled={(this.props.bets[props.index].saveInd ? '' : true)} 
                  className={(this.props.bets[props.index].saveInd ? 'save-highlight' : '')} 
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
          data={this.props.bets}
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

function mapStateToProps(state) {
  return {
    bets: state.bets
  };
}

export default connect(mapStateToProps)(OverviewBets);