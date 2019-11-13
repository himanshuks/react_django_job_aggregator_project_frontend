import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/authAction";
import "../stylesheets/navbar.css";

class ProfileDropdown extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
          >
            <i style={{ color: "white" }} className="fa fa-user"></i>
            &nbsp;&nbsp; <b className="username">{user.username} </b> &nbsp;
          </button>
          <ul className="dropdown-menu">
            <li className="dropdownmenu">
              <Link to="/profile/">My Account</Link>
            </li>
            <li className="dropdownmenu">
              <a href="/help">Help</a>
            </li>
            <li className="dropdownmenu">
              <span style={{ marginLeft: "12%", cursor: "pointer" }} onClick={this.props.logout}>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(ProfileDropdown);
