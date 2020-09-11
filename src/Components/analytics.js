import React, { useState, useLayoutEffect, useEffect } from 'react';
import dashboardStore from '../store/index.js';
import { Navbar, Container, Row, Col, Card } from 'react-bootstrap';
import _ from 'lodash';
const Analytics = () => {
  const [dashboardState, setDashboardState] = useState(dashboardStore.initialState);
  useLayoutEffect(()=> {
    const subs = dashboardStore.subscribe(setDashboardState);
    dashboardStore.init();
    return () => subs.unsubscribe();
  },[]);

  useEffect(() => {
    // Taking time between 100 - 2000 ms
    const timeRange = Math.random() * (2000 - 100) + 100;
    const { send } = dashboardStore;
    const interval = setInterval(()=>{
      send();
    }, timeRange)
    return () => clearInterval(interval);
  },[])

  return (
    <div className="App">
     <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#">
        Analytics Dashboard
      </Navbar.Brand>
     </Navbar>
        <Container>
        <Row>
          <Col sm={6}>
            <Card className="mt-5 justify-content-center">
              <Card.Body>
                <Container className="text-align-center">
                  <Row>
                    <Col sm="4">Temperature</Col>
                    <Col sm="8">{dashboardState.system.temperature}</Col>
                  </Row>
                  <Row>
                    <Col sm="4">Air pressure</Col>
                    <Col sm="8">{dashboardState.system.airPressure}</Col>
                  </Row>
                  <Row>
                    <Col sm="4">Humidity</Col>
                    <Col sm="8">{dashboardState.system.humidity}</Col>
                  </Row>
                </Container>
              </Card.Body>
          </Card>
        </Col>
        
      </Row>
        </Container>
    
    </div>
  );
}

export default Analytics;
