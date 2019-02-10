import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Input,
  Container
} from "reactstrap";
import { Redirect } from "react-router-dom";
import logo from "../../images/logo.png";
import { connect } from "react-redux";
import { getBusinesses } from "../../actions/businessActions";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isAuthenticated: false,
      category: "",
      location: "",
      businessName: "",
      perPage: 6,
      isActive: 1,
      count: 0,
      businesses: []
    };
  }

  handleSearchInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    // console.log(this.state)
  };
  // Function to handle submit of the search input values
  handleSubmit = event => {
    let { businessName, category, location } = this.state;
    event.preventDefault();
    this.props.getBusinesses(
      this.state.isActive,
      this.state.perPage,
      businessName,
      category,
      location
    );
  };

  render() {
    const { count, searchComplete } = this.props.data;
    if ((count > 0) && searchComplete) {
      return (
        <div>
          <Redirect
            to={{
              pathname: "/search_results"
            }}
          />
        </div>
      );
    }

    return (
      <div>
        <div className="search-bar">
          <Container>
            <div className="my-logo" />
            <form onSubmit={this.handleSubmit}>
              <Navbar color="dark" light expand="md">
                <NavbarBrand href="/search" className="text-light">
                  <img
                    src={logo}
                    alt="We Connect!"
                    height="45px"
                    width="42px"
                  />
                  Search for Businesses
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem className="nav-item-name-properties">
                      <input
                        onChange={this.handleSearchInputChange}
                        name="businessName"
                        placeholder="Enter Business Name"
                        className="my-input"
                        type="text"
                        id="components"
                      />
                    </NavItem>
                    <NavItem className="nav-item-name-properties">
                      <label className="my-labels">Filter By:</label>
                    </NavItem>
                    <NavItem className="nav-item-name-properties">
                      <Input
                        style={{ marginTop: "12px" }}
                        onChange={this.handleSearchInputChange}
                        type="select"
                        name="category"
                        id="exampleSelect"
                        value={this.state.category}
                      >
                        <option value="" disabled>
                          Select Category..
                        </option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Education">Education</option>
                        <option value="Automobiles">Automobiles</option>
                        <option value="Health and Medicine">
                          Health and Medicine
                        </option>
                        <option value="Computers & Electronics">
                          Computers & Electronics
                        </option>
                      </Input>
                    </NavItem>
                    <NavItem className="nav-item-name-properties">
                      <Input
                        style={{ marginTop: "12px" }}
                        onChange={this.handleSearchInputChange}
                        type="select"
                        name="location"
                        id="exampleSelect"
                        value={this.state.location}
                      >
                        <option
                          value=""
                          style={{ color: "blue" }}
                          disabled
                        >
                          Select Location ..
                        </option>
                        <option value="wakiso">Wakiso</option>
                        <option value="kabale">Kabale</option>
                        <option value="mbarara">Mbarara</option>
                        <option value="kampala">Kampala</option>
                        <option value="rukungiri">Rukungiri</option>
                      </Input>
                    </NavItem>
                    <NavItem style={{ marginRight: "20px", marginTop: "12px" }}>
                      <Button color="primary">Search</Button>
                    </NavItem>
                    <NavItem style={{ marginRight: "20px" }} />
                  </Nav>
                </Collapse>
              </Navbar>
            </form>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.businessReducer.data
  };
};

export default connect(
  mapStateToProps,
  { getBusinesses }
)(SearchPage);
