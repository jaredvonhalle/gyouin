import React, { Component } from 'react';
import { Form, Button, Row, Col, Dropdown } from 'react-bootstrap';
import './NewBet.css';

class NewBet extends Component {

	render() {
    return (
      <div className="bet-form">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Add New Bet
          </Dropdown.Toggle>
            <Dropdown.Menu>
              <Form>
              <Row>
                <Col>
                  <Form.Group controlId="newBetChallebnger">
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
                  <Form.Group controlId="newEndDate">
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

export default NewBet;