import React, { Component } from 'react';
import './CompleteForm.css';
import { connect } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';

class CompleteForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch({type:'HIDE_COMPLETE_FORM'})
  };

  handleCancel = event => {
    event.preventDefault();
    this.props.dispatch({type:'HIDE_COMPLETE_FORM'})
  };


	render() {
    return (
      <div className="complete-form">
        <Form className="new-bet-form" onSubmit={this.handleSubmit} onReset={this.handleCancel}>
          <Row>
            <Col>
              <Form.Label>Challenger</Form.Label>
              <Form.Control className="complete-bet-form-plaintext" plaintext readOnly defaultValue={this.props.currCompleteBet.challenger} />
            </Col>
            <Col>
              <Form.Group controlId="completeBetChallengerWinLose">
                <Form.Label>Wins/Loses</Form.Label>
                <Form.Control as="select">
                  <option>Wins</option>
                  <option>Loses</option>
                </Form.Control>
              </Form.Group>
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
              <Form.Group controlId="completeBetAccepterWinLose">
                <Form.Label>Wins/Loses</Form.Label>
                <Form.Control as="select">
                  <option>Wins</option>
                  <option>Loses</option>
                </Form.Control>
              </Form.Group>
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