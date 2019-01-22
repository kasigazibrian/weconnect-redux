import React from "react";
import { FormGroup, Label, Container, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logIn } from "../../actions/userActions";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isAuthenticated: false
    };
  }
  // Function to handle user input and set state
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Function to handle user input on submit
  handleSubmit = event => {
    event.preventDefault();
    const userCredentials = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.logIn(userCredentials);
  };

  render() {
    // Check if a user has been authenticated and redirect them to the user profile page
    if (this.props.data.authenticationStatus) {
      return (
        <div>
          <Redirect
            to={{
              pathname: "/authuser/userprofile"
            }}
          />
        </div>
      );
    }

    return (
      <div className="login-background-image">
        <div className="login-wrapping">
          <Container>
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Col sm={"9"}>
                  <h1 className="my-h1">Please Sign in </h1>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={"9"}>
                  <label
                    id="username"
                    name="username"
                    className="label-fontcolor"
                  >
                    Username:
                  </label>
                  <input
                    name="username"
                    type="text"
                    style={{ borderRadius: "20px" }}
                    onChange={this.handleChange}
                    className="form-control"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={"9"}>
                  <label className="label-fontcolor">Password:</label>
                  <input
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                    id="password"
                    style={{ borderRadius: "20px" }}
                    className="form-control"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={"9"}>
                  <button
                    style={{ borderRadius: "20px" }}
                    className={"btn btn-lg btn-info btn-block"}
                  >
                    Log in
                  </button>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={"10"}>
                  <Label className={"label-fontcolor"}>
                    Don't have an account? Click
                    <Label tag={"a"} href="/signup">
                      {" "}
                      here
                    </Label>{" "}
                    to register
                  </Label>
                </Col>
              </FormGroup>
            </form>
          </Container>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    data: state.userReducer.data
  };
};

export default connect(
  mapStateToProps,
  { logIn }
)(LoginForm);
