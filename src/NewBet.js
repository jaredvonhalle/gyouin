import React, { Component } from 'react';
import { Form, Button, Row, Col, Dropdown } from 'react-bootstrap';
import './NewBet.css';
import { getPostDataRequest } from './ApiRequests';
import { connect } from 'react-redux';

class NewBet extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formRef = React.createRef();
  }

  buildNewBet(accepter, challenger, odds, amount, description, endDate) {
    let newBetObj = {};
    newBetObj.id = (Math.random() * 100000000000000000000).toString() + Date.now().toString();
    newBetObj.accepter = accepter;
    newBetObj.challenger = challenger;
    newBetObj.players = [accepter,challenger];
    newBetObj.odds = odds;
    newBetObj.amount = parseFloat(amount);
    newBetObj.description = description;
    newBetObj.endDate = endDate;
    newBetObj.resultString = "Pending";
    newBetObj.type = "PERSONAL";
    newBetObj.result = [];
    var date = new Date();
    var stringDate = date.toISOString(); 
    var formattedDate = stringDate.substring(0, stringDate.indexOf('T'))
    newBetObj.createDate = formattedDate;
    let jsonData = JSON.stringify(newBetObj);

    let postRequest = getPostDataRequest(jsonData);
    postRequest().then(response => {
      console.log(response);
      if (response.ok) {
        this.props.dispatch({type:'ADD_BET', bet:newBetObj})
      } 
    })

    
  }

  handleSubmit = event => {
    event.preventDefault();
    this.buildNewBet(
      event.target.elements.newBetAccepter.value,
      event.target.elements.newBetChallenger.value,
      event.target.elements.newBetOdds.value,
      event.target.elements.newBetAmount.value,
      event.target.elements.newBetDescription.value,
      event.target.elements.newBetEndDate.value
    );
    var form = this.formRef.current;
    form.handleClose();
  };

	render() {
    return (
      <div className="new-bet-form-container">
        <div className="personal-bets-title">Personal Bets</div>
        <Dropdown className="new-bet-dropdown">
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Add New Personal Bet
          </Dropdown.Toggle>
            <Dropdown.Menu ref={this.formRef}>
              <Form className="new-bet-form" onSubmit={this.handleSubmit}>
              <Row>
                <Col>
                  <Form.Group controlId="newBetChallenger">
                    <Form.Label>Challenger</Form.Label>
                    <Form.Control as="select">
                      <option>Andrew</option>
                      <option>Ben</option>
                      <option>Jared</option>
                      <option>Mark</option>
                      <option>Matt</option>
                      <option>Max</option>
                      <option>Zach</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="newBetOdds">
                    <Form.Label>Odds</Form.Label>
                    <Form.Control type="text" placeholder="x:y" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="newBetAccepter">
                    <Form.Label>Accepter</Form.Label>
                    <Form.Control as="select">
                      <option>Andrew</option>
                      <option>Ben</option>
                      <option>Jared</option>
                      <option>Mark</option>
                      <option>Matt</option>
                      <option>Max</option>
                      <option>Zach</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="newBetDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter Description" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="newBetAmount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" placeholder="0.00"/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="newBetEndDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date"/>
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="success" type="submit">
                Submit
              </Button>
            </Form>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bets: state.bets
  };
}

export default connect(mapStateToProps)(NewBet);