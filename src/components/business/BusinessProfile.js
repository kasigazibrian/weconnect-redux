import React from 'react';
import {  FormGroup, Container, Col, Row, Label, Button } from 'reactstrap';
import {  Redirect, Link } from 'react-router-dom'
import { toast } from "react-toastify"
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import ReviewForm from "./ReviewForm";
import DeleteBusinessModal from "./DeleteBusinessModal";
import { connect } from 'react-redux';
import { deleteBusiness, getBusiness, getReviews, addReview } from "../../actions/businessActions";

class BusinessProfile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      modal: false,
      review: '',
      disabled: false,
      deletedSuccessfully: false,
      businessId: this.props.match.params.businessId,
    }
  }

  componentDidMount(){
    // Function to return a specific business
   this.props.getBusiness(this.props.match.params.businessId);
   this.props.getReviews(this.props.match.params.businessId)
  }

  // Function to toggle modal view option
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  //Function to obtain review changes
  handleReviewChange = (e) =>{
    console.log(e.target.getContent());
    this.setState({review: e.target.getContent()});
  };

  // Function to handle adding a review permission
  handleAddReviewPermissions = (businessOwnerID) =>{
    return parseInt(localStorage.getItem('user_id'), 10) === businessOwnerID ? "collapse" : "show";
  };

  // Function to handle create and edit permissions
  handleCreateEditPermissions = (businessOwnerID) =>{
    return parseInt(localStorage.getItem('user_id'), 10) === businessOwnerID ? "show" : "collapse"
  };

  // Function to handle deleting of a business
  handleDelete = (e)=>{
    e.preventDefault();
   this.props.deleteBusiness(this.state.businessId)
  };

  // Function to handle adding a review to a business
  handleSubmit = e =>{
    e.preventDefault();
    const review = {review: this.state.review};
    this.props.addReview(this.state.businessId, review)
  };

  render(){
    const {reviews, business } =  this.props.data;

    // check if user is logged in or route them to the login page
    if(!this.props.userData.authenticationStatus){
      toast.error("Please login to view this page", {position: toast.POSITION.BOTTOM_CENTER});
      return (<Redirect to={{
        pathname: '/login'
      }} />);
    }
    // Check if business has been deleted successfully and redirect the user
    if(this.state.deletedSuccessfully === true){
      return (<Redirect push=
                          {true} to={{
        pathname: '/businesses'
      }} />);
    }
    // Get adding a review permission
    let addReviewPermission = this.handleAddReviewPermissions(business.business_owner_id);
    // Get create and delete permission
    let createEditPermission = this.handleCreateEditPermissions(business.business_owner_id);

    return(
      <div>
        <div className="background-profile-image">
          <Container style={{color: "white"}}>
            <Row>
              <Col xs="6" className="bg-secondary">
                <div className="content-left">
                  <FormGroup >
                    <h1 id="profile-heading" style={{fontSize: "40px"}}>Business Profile </h1>
                    <div className={createEditPermission} >
                      <Link to={`/edit/${business.business_id}`} className="btn btn-info"><FaEdit/></Link>
                      <Button style={{marginLeft: "5px"}} onClick={this.toggle} className="btn btn-danger"> <FaTrash/></Button>
                    </div>
                  </FormGroup>
                  <FormGroup >
                    <b><label id="businessName" >Business Name:</label></b><br/>
                    <Label className="profile-labels">{business.business_name}</Label>
                  </FormGroup>
                  <FormGroup >
                    <b><label id="businessLocation"  >Business Location:</label></b><br/>
                    <Label className="profile-labels"> {business.business_location}</Label>
                  </FormGroup>
                  <FormGroup >
                    <b><label id="businessEmail" >Business Email:</label></b><br/>
                    <Label className="profile-labels">{business.business_email}</Label>
                  </FormGroup>
                  <FormGroup >
                    <b><label >Contact Number:</label></b><br/>
                    <Label className="profile-labels">{business.contact_number}</Label>
                  </FormGroup>
                  <FormGroup >
                    <b><label   >Business Description:</label></b><br/>
                    <Label className="profile-labels"> {business.business_description}</Label>
                  </FormGroup>
                  <FormGroup>
                    <b><Label >Business Category:</Label></b><br/>
                    <Label className="profile-labels">{business.business_category}</Label>
                  </FormGroup>
                </div>
              </Col>
              <Col xs="6" className="bg-secondary">
                <ReviewForm handleSubmit={this.handleSubmit} addReviewPermission={addReviewPermission}
                            reviews={reviews} handleReviewChange={this.handleReviewChange}/>
              </Col>

            </Row>
          </Container>
        <DeleteBusinessModal businessName={business.business_name} isOpen={this.state.modal}
                             toggle={this.toggle} handleDlete={this.handleDelete}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.businessReducer.data, userData: state.userReducer.data
  };
};

export default connect(mapStateToProps, { getBusiness, deleteBusiness, getReviews, addReview })(BusinessProfile);

