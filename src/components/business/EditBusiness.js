import React from 'react';
import {toast} from "react-toastify";
import { connect } from "react-redux"
import {Redirect} from 'react-router-dom'
import { updateBusiness } from "../../actions/businessActions";
import BusinessForm from "./BusinessForm";


class EditBusiness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessName: "",
      businessCategory: "",
      businessLocation: "",
      businessEmail: "",
      contactNumber: "",
      businessDescription: "",
      addedSuccessfully: false
    }
  }
  // Function to handle user input change and set state
  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  // Function to handle form submission for registering a new business
  handleSubmit = event => {
    event.preventDefault();
    const business = {
      business_name: this.state.businessName,
      business_category: this.state.businessCategory,
      business_location: this.state.businessLocation,
      business_email: this.state.businessEmail,
      contact_number: this.state.contactNumber,
      business_description: this.state.businessDescription
    };
    this.props.createBusiness(business)

  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.data.Status === "Success") {
      return { updatedSuccessfully: true };
    } else {
      return null;
    }
  }


  render(){
    // Check for user authentication and restrict page access if not authenticated
    if(this.props.data.authenticationStatus === false){
      toast.error("Please login to view this page", {position: toast.POSITION.BOTTOM_CENTER});
      return (<Redirect to={{
        pathname: '/login'
      }} />);
    }
    // Check if business registered successfully and redirect to business catalog page
    if(this.state.addedSuccessfully) {
      return (<Redirect to={{
        pathname: '/businesses'
      }} />);
    }
    return (
      <BusinessForm handleSubmit={this.handleSubmit} handleChange={this.handleChange}
                    btnText={"Update Business"} business={this.props.data.business}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.businessReducer.data
  }
};

export default connect(mapStateToProps, { updateBusiness })(EditBusiness)
