import React from 'react';

import {  Card, CardHeader, CardText, CardBody, Col, Row,
   CardSubtitle, Button, CardTitle } from 'reactstrap';

import { Link } from 'react-router-dom';

const BusinessCards = (props) =>{
  // Function to destructure the business list
  const businessList = props.businesses.length ? props.businesses.map((business)=>{
    return (
      <Col sm={"4"} key={business.business_id}>
        <Card body style={{marginTop: '20px',height: '90%'}} >
          <CardBody>
            <CardHeader tag="h1" >{business.business_name}</CardHeader>
            <CardTitle></CardTitle>
            <CardSubtitle>{business.business_category}</CardSubtitle>
            <CardText>{business.business_description}</CardText>
            <Link to={`/businesses/${business.business_id}`}>
              <Button className="btn-info" >View Details</Button>
            </Link>
          </CardBody>
        </Card>
      </Col>
    );
  }) : (
    <div className="font-weight-light font-italic">
      No businesses registered yet!
    </div>
  );

  return(
    <Row>
      {businessList}
    </Row>
  );
};

export default BusinessCards