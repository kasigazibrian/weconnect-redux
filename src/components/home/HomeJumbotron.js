import React from "react";
import { Jumbotron } from "reactstrap";
import { Link } from "react-router-dom";

class HomeJumbotron extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">
            Welcome {localStorage.getItem("username")}!!
          </h1>
          <p className="lead">
            This is a simple business advertising company. You can register your
            business with us by simply creating an{" "}
            <Link to="/signup">account.</Link>
          </p>
          <hr className="my-2" />
          <p>
            You can view registered businesses by simply clicking the button
            below.
          </p>
          <p className="lead">
            <Link to="/businesses" className="btn btn-info">
              View Registered Businesses
            </Link>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default HomeJumbotron;
