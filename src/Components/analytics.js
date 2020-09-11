import React, { useState, useLayoutEffect, useEffect } from 'react';
import dashboardStore from '../store/index.js';
import { Navbar, Container, Row, Col, Card } from 'react-bootstrap';
import _ from 'lodash';
const Analytics = () => {
  const [data, setData] = useState({});
  useLayoutEffect(()=> {
    dashboardStore.init();
  },[]);

  useEffect(() => {
    // Taking time between 100 - 2000 ms
    const timeRange = Math.random() * (2000 - 100) + 100;
    const interval = setInterval(()=>{
      dashboardStore.send.subscribe({
        next(x) { setData(x) },
        error(err) { console.error('something wrong occurred: ' + err); },
        complete() { console.log('done'); }
      });
    }, timeRange);
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
                    <Col sm="8">{data.temperature}</Col>
                  </Row>
                  <Row>
                    <Col sm="4">Air pressure</Col>
                    <Col sm="8">{data.airPressure}</Col>
                  </Row>
                  <Row>
                    <Col sm="4">Humidity</Col>
                    <Col sm="8">{data.humidity}</Col>
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
