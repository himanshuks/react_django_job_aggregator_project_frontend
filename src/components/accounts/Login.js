import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser, login } from "../../actions/authAction";
import "../../stylesheets/login_signup.css";
// import CSRFToken from "./csrftoken";

// import axios from "axios";

// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.xsrfCookieName = "csrftoken";

// import { FacebookLoginButton } from "react-social-login-buttons";
// import { GoogleLoginButton } from "react-social-login-buttons";
// import { LinkedInLoginButton } from "react-social-login-buttons";

export class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      this.props.loadUser();
      return <Redirect to="/" />;
    }

    const { username, password } = this.state;
    return (
      <div className="container-fluidmain">
        <div className="container-fluid1">
          <div className="loginmain">
            <center><h1 className="text-centerlogin">Login</h1> </center>
            <div className="containerlogin">
              <div className="social-container">
                <button className="btn btn-info mb-2 linkedin">
                  <a href="#">
                    <i className="fa fa-linkedin"> &nbsp;&nbsp;&nbsp; </i>
                    <span>Login With LinkedIn</span>{" "}
                  </a>{" "}
                </button>

                <button className="btn btn-danger mb-2 google">
                  <a href="#">
                    <i className="fa fa-google">&nbsp;&nbsp;&nbsp;&nbsp;</i>
                    <span>Login With Google</span>{" "}
                  </a>{" "}
                </button>

                <button className="btn btn-primary mb-2 facebook">
                  <a href="#">
                    <i className="fa fa-facebook">&nbsp;&nbsp;&nbsp;</i>
                    <span>Login With Facebok</span>{" "}
                  </a>{" "}
                </button>
              </div>
              <div className="containerlogin1">
                <form onSubmit={this.onSubmit}>
                  {/* <CSRFToken /> */}
                  <div className="form-group">
                    <label className="formLabel">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      onChange={this.onChange}
                      value={username}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="formLabel">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={this.onChange}
                      value={password}
                      required
                    />
                  </div>
                  <div className="forgotpassword">
                    {" "}
                    <Link className="forgotpassword" to="/forgotpassword">
                      Forgot Password?
                  </Link>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                      Login
                  </button>
                  </div>
                  <p>
                    <Link className="registerlink" to="/register">
                      Don't have an account? Register
                  </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login, loadUser }
)(Login);
