import React from "react";
import { FormGroup, Label, Container, Col, Input } from "reactstrap";
import { toast } from "react-toastify";
import zxcvbn from "zxcvbn";
import { Redirect } from "react-router-dom";
import checkPasswordStrength from "./CheckPasswordStrength";
import { signUp } from "../../actions/userActions";
import { connect } from "react-redux";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      gender: "",
      confirmPassword: "",
      suggestions: [],
      score: "",
      addedSuccessfully: false
    };
  }

  // componentWillMount(){
  //   // Check for user authentication
  //   if (localStorage.getItem('token') === null){
  //     this.setState({isAuthenticated: false})
  //   }
  //   else( this.setState({isAuthenticated: true}) )
  // }

  // Function to handle password change
  handlePasswordChange = e => {
    let evaluation = zxcvbn(e.target.value);
    this.setState({
      password: e.target.value,
      score: evaluation.score,
      suggestions: evaluation.feedback.suggestions,
      message: ""
    });
  };
  // Function to handle user input change and set state
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Function to handle the sign up form submission and post the user data to the API
  handleSubmit = event => {
    event.preventDefault();

    if (this.state.password !== this.state.confirmPassword) {
      toast.error("Passwords must match", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      console.log(this.props, "Passwords not matching");
    } else {
      const user = {
        username: this.state.username,
        password: this.state.password,
        last_name: this.state.lastName,
        first_name: this.state.firstName,
        gender: this.state.gender,
        email: this.state.email
      };

      // Make post request to register new user
      this.props.signUp(user);
    }
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.data.Status === "Success") {
      return { addedSuccessfully: true };
    } else {
      return null;
    }
  }

  render() {
    // Check if user is already logged in and redirect them to home page
    if (this.props.data.authenticationStatus) {
      toast.warn(
        "You are already logged in!! Please log out to view this page",
        { position: toast.POSITION.TOP_RIGHT }
      );
      return (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      );
    }

    // Check if user has been registered successfully and redirect them
    if (this.state.addedSuccessfully) {
      return (
        <div>
          <Redirect
            to={{
              pathname: "/login",
              state: { isAuthenticated: true }
            }}
          />
        </div>
      );
    }
    const { suggestions, score } = this.state;

    const passwordStrength = checkPasswordStrength(score);

    return (
      <div className="signup-background-image">
        <div className={"signup-wrapping"}>
          <Container>
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Col sm={"9"}>
                  <h1 className="my-h1">Please Sign up</h1>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={"9"}>
                  <label id="first-name" className="label-fontcolor">
                    First Name:
                  </label>
                  <input
                    onChange={this.handleChange}
                    name="firstName"
                    type="text"
                    id="first_name"
                    style={{ borderRadius: "20px" }}
                    className="form-control"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={"9"}>
                  <label
                    id="last-name"
                    name="last_name"
                    className="label-fontcolor"
                  >
                    Last Name:
                  </label>
                  <input
                    name="lastName"
                    onChange={this.handleChange}
                    type="text"
                    id="last_name"
                    style={{ borderRadius: "20px" }}
                    className="form-control"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={"9"}>
                  <label id="username_label" className="label-fontcolor">
                    Username:
                  </label>
                  <input
                    name="username"
                    onChange={this.handleChange}
                    type="text"
                    id="username"
                    style={{ borderRadius: "20px" }}
                    className="form-control"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={"9"}>
                  <label id="password" className="label-fontcolor">
                    Password:
                  </label>
                  <Input
                    name="password"
                    onChange={this.handlePasswordChange}
                    type="password"
                    id="password-input"
                    style={{ borderRadius: "20px" }}
                    className="form-control"
                    required
                  />{" "}
                  <span
                    id="passwordStrength"
                    className={passwordStrength.cssClass}
                  >
                    {passwordStrength.message}
                  </span>
                  <ul>
                    {suggestions.map((suggestion, index) => (
                      <li className="label-fontcolor" key={index}>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={"9"}>
                  <label className="label-fontcolor">Confirm Password:</label>
                  <input
                    name="confirmPassword"
                    type="password"
                    onChange={this.handleChange}
                    id="confirm-password"
                    style={{ borderRadius: "20px" }}
                    className="form-control"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={"9"}>
                  <label id="email" className="label-fontcolor">
                    Email:
                  </label>
                  <input
                    name="email"
                    id="email-input"
                    onChange={this.handleChange}
                    type="text"
                    style={{ borderRadius: "20px" }}
                    className="form-control"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup check>
                <label id="gender" className="label-fontcolor">
                  Gender:
                </label>

                <Col sm={"9"}>
                  <Label check className={"label-fontcolor"}>
                    <Input
                      onChange={this.handleChange}
                      type="radio"
                      value={"male"}
                      name="gender"
                    />
                    Male
                  </Label>
                </Col>
                <Col sm={"9"}>
                  <Label check className={"label-fontcolor"}>
                    <Input
                      type="radio"
                      onChange={this.handleChange}
                      value={"female"}
                      name="gender"
                    />
                    Female
                  </Label>
                </Col>
              </FormGroup>
              <br />
              <FormGroup>
                <Col sm={"9"}>
                  <button
                    style={{ borderRadius: "20px" }}
                    className={"btn btn-lg btn-info btn-block"}
                  >
                    Sign up
                  </button>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={"10"}>
                  <Label className={"label-fontcolor"}>
                    Already have an account? Click
                    <Label tag={"a"} href={"/login"}>
                      {" "}
                      here
                    </Label>{" "}
                    to Login
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

const mapStateToProps = state => ({ data: state.userReducer.data });

export default connect(
  mapStateToProps,
  { signUp }
)(SignUpForm);
