import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo3.jpg";
import "../stylesheets/navbar.css";
import ProfileDropdown from "./ProfileDropdown";

class Navbar extends Component {
  state = {
    isOpen: true
  };
  handleToggle = () => {
    this.setState({ isClose: !this.state.isClose });
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <nav className="navbar navbar-expand py-0 fixed-top">
            <li className="nav-item ml-5 navbar-nav btn-black1">
              <Link to="/home" className="navbar-nav btn-black1">
                <img src={logo} alt="store" className="navbar-brand" />
              </Link>
            </li>
            <ul className="navbar-nav align-items-left ">
              <li className="nav-item ml-5 navbar-nav btn-black1">
                <Link to="/dashboard" className="navbar-nav btn-black1">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item ml-5 ">
                <Link to="/contracts/" className="navbar-nav btn-black1">
                  Contracts
                </Link>
              </li>
              <li className="nav-item ml-5 ">
                <Link to="/tenders/" className="navbar-nav btn-black1">
                  Tenders
                </Link>
              </li>
              <li className="nav-item ml-5">
                <Link to="/social/" className="navbar-nav btn-black1">
                  Social
                </Link>
              </li>
              <li className="nav-item ml-5 ">
                <Link to="/resources/" className="navbar-nav btn-black1">
                  Resources
                </Link>
              </li>
              <li className="nav-item ml-5 ">
                <Link to="/recommended/" className="navbar-nav btn-black1">
                  Recommended
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto ">
              {/* <li className="nav-item">
                <a href="/notifications">
                  <i className="fa fa-bell fa-sm"></i>
                </a>
              </li>
              &emsp;
              <li className="nav-item">
                <a className="mr-0" href="/chats">
                  <i className="fa fa-comment fa-sm"></i>
                </a>
              </li>{" "} */}
              &emsp; &emsp;
              <li className="nav-item">
                <ProfileDropdown />
              </li>
              &emsp;
              <li className="nav-item"></li>
            </ul>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default Navbar;
