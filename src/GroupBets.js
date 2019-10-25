import React, { Component } from 'react';
import './GroupBets.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {getPutDataRequest, getDeleteDataRequest } from './ApiRequests';
import CompleteGroupForm from './CompleteGroupForm';
import { connect } from 'react-redux';


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
    let data = this.props.bets[cellInfo.original.id]
    this.saveBet(data);
  }

  getBetString(bet) {
    return `${bet.challenger} challenges ${bet.accepter} with ${bet.odds} odds to: ${bet.description}`
  }

  deleteRow(cellInfo) {
    if (window.confirm('Are you sure you wish to delete the following bet: ' + cellInfo.original.description)) {
      let data = this.props.bets[cellInfo.original.id]
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
    let data = this.props.bets[cellInfo.original.id]
    this.props.dispatch({type:'SHOW_GROUP_COMPLETE_FORM', completeBet:data})
  }

  renderEditableNumber(cellInfo) {
    return (
      <div
        type="number"
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          var changedInd = (this.props.bets[cellInfo.original.id][cellInfo.column.id] == parseFloat(e.target.innerHTML)) ? false : true
          if (changedInd) {
            this.props.dispatch({type:'SET_BET_SAVE_IND_TRUE', id:cellInfo.original.id})
          }
        }}
        dangerouslySetInnerHTML={{
          __html: this.props.bets[cellInfo.original.id][cellInfo.column.id]
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
          var changedInd = (this.props.bets[cellInfo.original.id][cellInfo.column.id] == e.target.innerHTML) ? false : true
          if (changedInd) {
            this.props.dispatch({type:'SET_BET_SAVE_IND_TRUE', id:cellInfo.original.id})
          }
        }}
        dangerouslySetInnerHTML={{
          __html: this.props.bets[cellInfo.original.id][cellInfo.column.id]
        }}
      />
    );
  }

	render() {

    const columns = [{
      Header: 'Description',
      accessor: 'description',
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
          <button disabled={(this.props.bets[props.original.id].saveInd ? '' : true)} 
                  className={(this.props.bets[props.original.id].saveInd ? 'save-highlight' : '')} 
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
          <button disabled={(this.props.bets[props.original.id].isComplete ? true : '')}
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

    const showGroupCompleteForm = this.props.showGroupCompleteForm;
    let completeGroupForm;

    if(showGroupCompleteForm) {
      completeGroupForm = <CompleteGroupForm/>
    } else {
      completeGroupForm = <div></div>
    }

    let groupBets = Object.values(this.props.bets).filter(function(el) {
      return el.type == "GROUP";
    })

    return (
      <div className="group-bets container-fluid">
        <div className="complete-form-container">
          {completeGroupForm}
        </div>
        <ReactTable
          className="-striped"
          data={groupBets}
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
    showGroupCompleteForm: state.showGroupCompleteForm,
    currGroupCompleteBet: state.currGroupCompleteBet,
    betsJson: state.betsJson
  };
}

export default connect(mapStateToProps)(GroupBets);