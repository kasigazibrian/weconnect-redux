import React from 'react'
import {Col, Container, FormGroup, Input, Label} from "reactstrap";

const BusinessForm = (props) => {
  return(
    <div>
      <Container>
        <form onSubmit={props.handleSubmit}>
          <FormGroup>
            <Col sm={"6"}>
              <h1 id="heading" style={{fontSize: "28px"}}>Business Form</h1>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={"6"}>
              <Label id="user">Business Name:</Label>
              <input name="businessName" onChange={props.handleChange} type="text" style={{borderRadius: "20px"}} className="form-control" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={"6"}>
              <Label id="user">Business Location:</Label>
              <input name="businessLocation" onChange={props.handleChange} type="text" style={{borderRadius: "20px"}} className="form-control" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={"6"}>
              <Label id="user">Business Email:</Label>
              <input name="businessEmail" onChange={props.handleChange} type="email" style={{borderRadius: "20px"}} className="form-control" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={"6"}>
              <Label for="contact_number">Contact Number:</Label>
              <input name="contactNumber" onChange={props.handleChange} type="text" id="contact_number" style={{borderRadius: "20px"}}
                     className="form-control" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={"6"}>
              <Label>Business Description:</Label>
              <Input name="businessDescription" onChange={props.handleChange} type="textarea" id="business_description" style={{borderRadius: "20px"}}
                     className="form-control" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={"6"}>
              <Label for="categorySelect">Business Category:</Label>
              <Input name="businessCategory" onChange={props.handleChange} type="select" id="business_category">
                <option value="Entertainment">Entertainment</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Education">Education</option>
                <option value="Automobiles">Automobiles</option>
                <option value="Health and Medicine">Health and Medicine</option>
                <option value="Computers & Electronics">Computers & Electronics</option>
                <option value="Food retail and service">Food retail and service.</option>
                <option value="Beauty and fragrances.">Beauty and fragrances.</option>
                <option value="Sports and outdoors.">Sports and outdoors</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={"6"}>
              <button style={{borderRadius: "20px"}}
                      className={"btn btn-lg btn-info btn-block"}>{props.btnText}
              </button>
            </Col>
          </FormGroup>
        </form>
      </Container>
    </div>
  )
};
export default BusinessForm
