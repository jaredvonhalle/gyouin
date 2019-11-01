import React, { Component } from 'react';
import './CompleteGroupForm.css';
import { connect } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import {getPutDataRequest} from './ApiRequests';

class CompleteGroupForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();

    let results = [];
    let mattWon = false;

    event.target.elements.player.forEach(function(item, index) {
      results.push({
        player:item.value,
        amount:parseFloat(event.target.elements.amount[index].value)
      })
    })

    let resultString = "";
    results.forEach(function(result) {
      resultString += result.player + "  " + result.amount + "\r\n";
      if(result.player === "Matt" && result.amount > 0) {
        mattWon = true;
      }
    })

    let currBet = JSON.parse(JSON.stringify(this.props.currGroupCompleteBet))

    currBet.results = results;
    currBet.resultString = resultString;
    currBet.isComplete = true;

    this.saveBet(currBet);
    if(mattWon) {
      this.props.dispatch({type:'SET_MATT_WIN_SOUND_PLAYING'})
    }
    this.props.dispatch({type:'HIDE_GROUP_COMPLETE_FORM'})
  };

  saveBet(data) {
    let putRequest = getPutDataRequest(data);
    putRequest().then(response => {
      console.log(response);
      if (response.ok) {
        this.props.dispatch({type:'SAVE_BET', bet:data})
      } else {
        alert("Failed to Complete. Don't blame Jared");
      } 
    });
  }

  handleCancel = event => {
    event.preventDefault();
    this.props.dispatch({type:'HIDE_GROUP_COMPLETE_FORM'})
  };


	render() {

    const formRows = this.props.currGroupCompleteBet.players.map((player) =>
      <Row>
        <Col>
          <Form.Group controlId="player">
            <Form.Label>Player</Form.Label>
            <Form.Control className="complete-bet-form-plaintext" plaintext readOnly defaultValue={player} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" placeholder="0.00"/>
          </Form.Group>
        </Col>
      </Row>
    );

    return (
      <div className="complete-form">
        <Form className="new-bet-form" onSubmit={this.handleSubmit} onReset={this.handleCancel}>
          <div className="complete-form-title">Complete Form</div>
          <div className="complete-form-bet">{this.props.currGroupCompleteBet.description}</div>
          <div className="complete-form-note">*Note, use negative numbers for losses*</div>
          {formRows}
          <Row>
            <Col>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Col>
            <Col>
              <Button variant="danger" type="reset">
                Cancel
              </Button>
            </Col>
          </Row>

        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bets: state.bets,
    showGroupCompleteForm: state.showGroupCompleteForm,
    currGroupCompleteBet: state.currGroupCompleteBet
  };
}

export default connect(mapStateToProps)(CompleteGroupForm);