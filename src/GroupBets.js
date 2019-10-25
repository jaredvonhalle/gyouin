import React, { Component } from 'react';
import './GroupBets.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {getPutDataRequest, getDeleteDataRequest } from './ApiRequests';
import { connect } from 'react-redux';
import CompleteForm from './CompleteForm';

class GroupBets extends Component {

  constructor(props) {
    super(props);
    this.renderEditable = this.renderEditable.bind(this);
    this.renderEditableNumber = this.renderEditableNumber.bind(this);
    this.saveRow = this.saveRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.completeRow = this.completeRow.bind(this);
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

  saveBet(data) {
    let putRequest = getPutDataRequest(data);
    putRequest().then(response => {
      console.log(response);
      if (response.ok) {
        this.props.dispatch({type:'SAVE_BET', bet:data})
        alert("Save Successful");
      } else {
        alert("Failed to save. Don't blame Jared");
      }
      
    });
  }

  saveRow(cellInfo) {
    let data = this.props.bets[cellInfo.index]
    this.saveBet(data);
  }

  getBetString(bet) {
    return `${bet.challenger} challenges ${bet.accepter} with ${bet.odds} odds to: ${bet.description}`
  }

  deleteRow(cellInfo) {
    if (window.confirm('Are you sure you wish to delete the following bet...\n\n' + this.getBetString(this.props.bets[cellInfo.index]))) {
      let data = this.props.bets[cellInfo.index]
      let deleteRequest = getDeleteDataRequest(data);
      deleteRequest().then(response => {
        console.log(response);
        if (response.ok) {
          this.props.dispatch({type:'DELETE_BET', id:data.id})
        }
      })
    }
  }

  completeRow(cellInfo) {
    let data = this.props.bets[cellInfo.index]
    this.props.dispatch({type:'SHOW_COMPLETE_FORM', completeBet:data})
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
      accessor: 'createDate',
      Cell: this.renderEditable
    },{
      Header: 'End Date',
      accessor: 'endDate',
      Cell: this.renderEditable
    },{
      Header: 'Result',
      accessor: 'resultString',
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
      Header: 'Complete',
      Cell: props => {
        return(
          <button disabled={(this.props.bets[props.index].isComplete ? true : '')}
                  onClick={() => this.completeRow(props)}>
            Complete
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
    }]

    const showCompleteForm = this.props.showCompleteForm;
    let completeForm

    if(showCompleteForm) {
      completeForm = <CompleteForm/>
    } else {
      completeForm = <div></div>
    }
    return (
      <div className="group-bets container-fluid">
        <div className="complete-form-container">
          {completeForm}
        </div>
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
    bets: state.bets,
    showCompleteForm: state.showCompleteForm,
    currCompleteBet: state.currCompleteBet
  };
}

export default connect(mapStateToProps)(GroupBets);