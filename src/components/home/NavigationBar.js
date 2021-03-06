import React from "react";
import logo from "../../images/logo.png";
import { Link, withRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle
} from "reactstrap";
import AuthButtons from "./AuthButtons";
import UnauthButtons from "./UnauthButtons";
import { FaBriefcase, FaSearch, FaUser } from "react-icons/fa";
import { connect } from "react-redux";
import { logOut } from "../../actions/userActions";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      loggedOut: false
    };
  }

  componentDidMount() {
    // this.props.getAuthentication();
  }

  handleLogOut = event => {
    event.preventDefault();
    this.props.logOut();
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    if (this.state.loggedOut) {
      this.props.history.push("/");
    }
    let navBarButtons = this.props.data.authenticationStatus ? (
      <AuthButtons handleLogOut={this.handleLogOut} />
    ) : (
      <UnauthButtons />
    );

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="We Connect!" height="42px" width="42px" />
            We Connect!
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <Link to="/businesses" className="nav-link">
                  <FaBriefcase style={{ marginBottom: "1px" }} /> Businesses
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/search" className="nav-link">
                  <FaSearch style={{ marginBottom: "2px" }} /> Search
                </Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <FaUser style={{ marginBottom: "1px" }} /> Account
                </DropdownToggle>
                {navBarButtons}
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.userReducer.data
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { logOut }
  )(NavigationBar)
);
