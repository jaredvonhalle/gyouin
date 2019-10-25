import React, { Component } from 'react';
import { Form, Button, Row, Col, Dropdown } from 'react-bootstrap';
import './NewGroupBet.css';
import { getPostDataRequest } from './ApiRequests';
import { connect } from 'react-redux';

class NewGroupBet extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formRef = React.createRef();
  }

  buildNewBet(players, amount, description, endDate) {
    let newBetObj = {};
    newBetObj.id = (Math.random() * 100000000000000000000).toString() + Date.now().toString();
    newBetObj.players = players;
    newBetObj.amount = parseFloat(amount);
    newBetObj.description = description;
    newBetObj.endDate = endDate;
    newBetObj.resultString = "Pending";
    newBetObj.type = "GROUP";
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
    let players = []
    if (event.target.elements.Andrew.checked) {players.push("Andrew")}
    if (event.target.elements.Ben.checked) {players.push("Ben")}
    if (event.target.elements.Jared.checked) {players.push("Jared")}
    if (event.target.elements.Mark.checked) {players.push("Mark")}
    if (event.target.elements.Matt.checked) {players.push("Matt")}
    if (event.target.elements.Max.checked) {players.push("Max")}
    if (event.target.elements.Zach.checked) {players.push("Zach")}
    this.buildNewBet(
      players,
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
        <div className="group-bets-title">Group Bets</div>
        <Dropdown className="new-bet-dropdown">
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Add New Group Bet
          </Dropdown.Toggle>
            <Dropdown.Menu ref={this.formRef}>
              <Form className="new-bet-form" onSubmit={this.handleSubmit}>
              <Row>
                <Col>
                <Form.Check 
                  type='checkbox'
                  id='Andrew'
                  label='Andrew'
                />
                <Form.Check 
                  type='checkbox'
                  id='Ben'
                  label='Ben'
                />
                <Form.Check 
                  type='checkbox'
                  id='Jared'
                  label='Jared'
                />
                <Form.Check 
                  type='checkbox'
                  id='Mark'
                  label='Mark'
                />
                <Form.Check 
                  type='checkbox'
                  id='Matt'
                  label='Matt'
                />
                <Form.Check 
                  type='checkbox'
                  id='Max'
                  label='Max'
                />
                <Form.Check 
                  type='checkbox'
                  id='Zach'
                  label='Zach'
                />
                </Col>
                <Col>
                  <Form.Group controlId="newBetAmount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" placeholder="0.00"/>
                  </Form.Group>
                  <Form.Group controlId="newBetEndDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date"/>
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

export default connect(mapStateToProps)(NewGroupBet);