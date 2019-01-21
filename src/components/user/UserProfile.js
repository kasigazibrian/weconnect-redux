import React from 'react';
import { Redirect, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {Container, Col,
  Button, Modal, ModalHeader, ModalBody,
  ModalFooter, FormGroup,
  FormFeedback, Table, Input
} from 'reactstrap';
import { connect } from 'react-redux'
import BusinessCards from '../business/BusinessCards';
import { getUserProfile, changePassword } from "../../actions/userActions";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      password: '',
      confirmPassword: '',
      valid: false,
      invalid: false,
      isAuthenticated: true,
      token: ''
    };
  }
  componentDidMount(){
    // Check for user authentication
    // if (localStorage.getItem('token') !== null){
    //   this.setState({ isAuthenticated: true });
      this.props.getUserProfile(localStorage.getItem('token'))
    // }
    // else( this.setState({isAuthenticated: false}) )
  };

  // Display password reset modal when the reset password button is selected
  togglePasswordResetModal= ()=> {
    this.setState({
      modal: !this.state.modal
    });
  };
  // function to help give user feedback to ensure the passwords match
  handleConfirmPasswordChange= event => {
    if(event.target.value !== this.state.password){
      this.setState({invalid: true, valid: false})
    }
    else{
      this.setState({[event.target.name]: event.target.value, invalid: false, valid: true})
    }
  };
  // Get content input into the password field and save it in the state
  handlePasswordChange = event =>{
    this.setState({[event.target.name]: event.target.value})

  };
  // Handle submission of the reset password modal form
  handleSubmit = event =>{
    event.preventDefault();
    if(this.state.valid){
      const newPassword = {new_password: this.state.password};

      // make post request to the API with the new password
      this.props.changePassword(newPassword, localStorage.getItem('token'))
    }
    else{
      toast.error("The passwords must match", {position: toast.POSITION.BOTTOM_CENTER});
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.data.passwordChanged){
      return { modal: !prevState.modal }
    }
    else{
      return null
    }
  };
  render() {
    // Check if user is authenticated and redirect them if false
    if(this.state.isAuthenticated === false){
      toast.error("Please login to view this page", {position: toast.POSITION.BOTTOM_CENTER});
      return (<Redirect to={{
        pathname: '/login'
      }} />);
    }

    let { User, Businesses } = this.props.data;
    // const businesses = { businesses: Businesses };
    return (
      <div className="user-profile-background-image">
        <Container><br/>
          <div className="row">
            <div className="col-6 ">
              <h1 id="userprofile"> User Profile </h1><br/>
              <Table striped>
                <thead>
                <tr>
                  <th>First Name: </th>
                  <td>{User.first_name}</td>

                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row">Last Name: </th>
                  <td>{User.last_name}</td>

                </tr>
                <tr>
                  <th scope="row">Username: </th>
                  <td>{User.username}</td>

                </tr>
                <tr>
                  <th scope="row">Email: </th>
                  <td>{User.email}</td>

                </tr>
                <tr>
                  <th scope="row">Gender: </th>
                  <td>{User.gender}</td>


                </tr>
                </tbody>
              </Table>
            </div>
            <div className="col-6 bg-info">
              <div className="my-buttons">
                <Button className={"btn btn-lg btn-secondary btn-block"} onClick={this.togglePasswordResetModal}>Change Password</Button>
                <Link to="/register" className={"btn btn-lg btn-secondary btn-block"}>Register Business</Link>
              </div>

            </div>
          </div><br/><br/>
          <h1 id="registered_businesses">Your Registered Businesses</h1>
          <hr/>
          <BusinessCards businesses={Businesses}/>
        </Container>
        <div>
          <form onSubmit={this.handleSubmit}>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.togglePasswordResetModal}>Change Password</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Col sm={"12"}>
                    <label className="font-weight-light font-italic" id="information"> You are trying to change your password. If you CANCEL, your password will not be changed.</label>
                  </Col>
                </FormGroup>
                <FormGroup >
                  <Col sm={"8"}>
                    <label id="new_password_label" >New Password:</label>
                    <input name="password" onChange={this.handlePasswordChange} type="password" id="new_password"
                           style={{borderRadius: "20px"}} className="form-control" required>

                    </input>
                  </Col>
                </FormGroup>
                <FormGroup >
                  <Col sm={"8"}>
                    <label id="confirm_password"  >Confirm Password:</label>
                    <Input valid={this.state.valid} invalid={this.state.invalid} name="confirmPassword" onChange={this.handleConfirmPasswordChange} type="password" id="confirm_password_input"
                           style={{borderRadius: "20px"}} className="form-control" required>

                    </Input>
                    <FormFeedback valid={this.state.valid}>Please Ensure Passwords are matching</FormFeedback>
                  </Col>
                </FormGroup>
              </ModalBody>
              <ModalFooter>

                <Button color="primary" onClick={this.handleSubmit}>Change Password</Button>
                <Button color="secondary" onClick={this.togglePasswordResetModal}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
            console.log(state.userReducer.data);
     return {
       data: state.userReducer.data
     }
};
export default connect(mapStateToProps, { getUserProfile, changePassword })(UserProfile)