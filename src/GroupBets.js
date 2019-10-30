import React, { Component } from 'react';
import './GroupBets.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {getPutDataRequest, getDeleteDataRequest } from './ApiRequests';
import CompleteGroupForm from './CompleteGroupForm';
import { connect } from 'react-redux';
import {validateGroupBet} from './BetUtils';


class GroupBets extends Component {

  constructor(props) {
    super(props);
    this.renderEditable = this.renderEditable.bind(this);
    this.renderEditableNumber = this.renderEditableNumber.bind(this);
    this.renderEditableLink = this.renderEditableLink.bind(this);
    this.saveRow = this.saveRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.completeRow = this.completeRow.bind(this);
  }

  saveBet(data) {
    let checkObj = validateGroupBet(data)
    if(checkObj.isValid) {
      let putRequest = getPutDataRequest(data);
      putRequest().then(response => {
        console.log(response);
        if (response.ok) {
          this.props.dispatch({type:'SET_BET_SAVE_IND_FALSE', id:data.id});
          alert("Save Successful");
        } else {
          alert("Failed to save. Don't blame Jared");
        }
      });
    } else {
      alert(checkObj.msg);
    }

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
            let currBet = JSON.parse(JSON.stringify(this.props.bets[cellInfo.original.id]));
            currBet[cellInfo.column.id] = parseFloat(e.target.innerHTML);
            if(!currBet.isComplete) {
              this.props.dispatch({type:'SAVE_BET', bet:currBet});
              this.props.dispatch({type:'SET_BET_SAVE_IND_TRUE', id:cellInfo.original.id})
            }
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
            let currBet = JSON.parse(JSON.stringify(this.props.bets[cellInfo.original.id]));
            currBet[cellInfo.column.id] = e.target.innerHTML;
            if(!currBet.isComplete) {
              this.props.dispatch({type:'SAVE_BET', bet:currBet});
              this.props.dispatch({type:'SET_BET_SAVE_IND_TRUE', id:cellInfo.original.id})
            }
          }
        }}
        dangerouslySetInnerHTML={{
          __html: this.props.bets[cellInfo.original.id][cellInfo.column.id]
        }}
      />
    );
  }

  renderEditableLink(cellInfo) {
    return (
      <a href={cellInfo.value}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          var changedInd = (this.props.bets[cellInfo.original.id][cellInfo.column.id] == e.target.innerHTML) ? false : true
          if (changedInd) {
            let currBet = JSON.parse(JSON.stringify(this.props.bets[cellInfo.original.id]));
            currBet[cellInfo.column.id] = e.target.innerHTML;
            if(!currBet.isComplete) {
              this.props.dispatch({type:'SAVE_BET', bet:currBet});
              this.props.dispatch({type:'SET_BET_SAVE_IND_TRUE', id:cellInfo.original.id})
            }
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
      Header: 'Players',
      accessor: 'playersHtml',
      Cell: props => {
        return(
          <div
            dangerouslySetInnerHTML={{
              __html: props.value
            }}
          />
        )
      }
    },{
      Header: 'Description',
      accessor: 'description',
      Cell: this.renderEditable
    },{
      Header: 'Base Amount',
      accessor: 'amount',
      Cell: this.renderEditableNumber,
      defaultSortDesc: true
    },{
      Header: 'Create Date',
      accessor: 'createDate',
      Cell: this.renderEditable,
      defaultSortDesc: true
    },{
      Header: 'End Date',
      accessor: 'endDate',
      Cell: this.renderEditable
    },{
      Header: 'Result',
      accessor: 'resultString',
      Cell: props => {
        return(
          <div
            dangerouslySetInnerHTML={{
              __html: props.value
            }}
          />
        )
      }
    },{
      Header: 'Link',
      accessor: 'link',
      Cell: this.renderEditableLink
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
      <div className="group-bets">
        <div className="complete-form-container">
          {completeGroupForm}
        </div>
        <ReactTable
          className="-striped"
          data={groupBets}
          columns={columns}
          defaultPageSize = {5}
          filterable
          multiSort={true}
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