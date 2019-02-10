import React from "react";
import { DropdownMenu, DropdownItem } from "reactstrap";
import { FaBriefcase, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

// Buttons present in the navigation bar if user is authenticated
const AuthButtons = props => {
  return (
    <DropdownMenu>
      <DropdownItem onClick={props.handleLogOut}>
        <FiLogOut style={{ marginBottom: "2px" }} /> Logout
      </DropdownItem>
      <DropdownItem>
      <Link to="/register_business">
        <FaBriefcase /> Register Business
      </Link>
      </DropdownItem>
      <DropdownItem>
        <Link to="/authuser/userprofile">
          {" "}
          <FaUser style={{ marginBottom: "2px" }} /> User Profile{" "}
        </Link>
      </DropdownItem>
    </DropdownMenu>
  );
};
export default AuthButtons;
