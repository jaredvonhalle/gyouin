import React, { Component } from 'react';
import './CompleteForm.css';
import { connect } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import {getPutDataRequest} from './ApiRequests';

class CompleteForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    let bet = this.props.currCompleteBet
    bet.results = [
      {
        player:this.props.currCompleteBet.challenger,
        amount:parseFloat(event.target.elements.completeBetChallengerAmount.value)
      },
      {
        player:this.props.currCompleteBet.accepter,
        amount:parseFloat(event.target.elements.completeBetAccepterAmount.value)
      }
    ]
    let resultString = "";
    bet.results.forEach(function(result) {
      resultString += result.player + "  " + result.amount + "\r\n";
    })
    bet.resultString = resultString;
    bet.isComplete = true;
    this.saveBet(bet);
    this.props.dispatch({type:'HIDE_COMPLETE_FORM'})
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
    this.props.dispatch({type:'HIDE_COMPLETE_FORM'})
  };


	render() {
    return (
      <div className="complete-form">
        <Form className="new-bet-form" onSubmit={this.handleSubmit} onReset={this.handleCancel}>
          <div className="complete-form-title">Complete Form</div>
          <div className="complete-form-bet">{this.props.currCompleteBet.description}</div>
          <div className="complete-form-note">*Note, use negative numbers for losses*</div>
          <Row>
            <Col>
              <Form.Label>Challenger</Form.Label>
              <Form.Control className="complete-bet-form-plaintext" plaintext readOnly defaultValue={this.props.currCompleteBet.challenger} />
            </Col>
            <Col>
              <Form.Group controlId="completeBetChallengerAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" placeholder="0.00"/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
            <Form.Label>Accepter</Form.Label>
              <Form.Control className="complete-bet-form-plaintext" plaintext readOnly defaultValue={this.props.currCompleteBet.accepter} />
            </Col>
            <Col>
              <Form.Group controlId="completeBetAccepterAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" placeholder="0.00"/>
              </Form.Group>
            </Col>
          </Row>
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
    showCompleteForm: state.showCompleteForm,
    currCompleteBet: state.currCompleteBet
  };
}

export default connect(mapStateToProps)(CompleteForm);