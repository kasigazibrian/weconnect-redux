import React from "react";
import { DropdownMenu, DropdownItem } from "reactstrap";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

// Buttons displayed if a user is not logged in
const UnauthButtons = () => {
  return (
    <DropdownMenu>
      <DropdownItem>
        <Link to="/login">
          <FiLogIn style={{ marginBottom: "2px" }} /> Login
        </Link>
      </DropdownItem>
      <DropdownItem>
        <Link to="/signup" className="link-tag">
          <FaUserPlus style={{ marginBottom: "2px" }} /> Signup
        </Link>
      </DropdownItem>
    </DropdownMenu>
  );
};

export default UnauthButtons;
