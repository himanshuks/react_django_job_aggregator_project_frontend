import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authAction";
import { createMessage } from "../../actions/messageAction";
import "../../stylesheets/login_signup.css";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    re_password: "",
    country: "",
    countryList: {}
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, email, password, re_password, country } = this.state;
    if (password !== re_password) {
      this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
    } else {
      const newUser = {
        username,
        password,
        re_password,
        email,
        country
      };
      this.props.register(newUser);
    }
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/v1/countries/")
      .then(res => res.json())
      .then(json => {
        this.setState({
          countryList: json
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    // console.log("the counrties" + countryData);
    const { username, email, password, re_password, countryList } = this.state;
    return (
      <div className="container-fluidmain">
        <div className="container-fluid1">
          <div>
            <center> <h1 className="text-centerlogin">Register</h1> </center>

            <div className="containerlogin1">
              <form onSubmit={this.onSubmit}>
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
                  <label className="formLabel">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={this.onChange}
                    value={email}
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
                <div className="form-group">
                  <label className="formLabel">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="re_password"
                    onChange={this.onChange}
                    value={re_password}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="formLabel">Country</label>
                  <select
                    className="form-control"
                    onChange={this.onChange}
                    name="country"
                    required
                  >
                    <option className="form-control country" value="">
                      Select Your Country
                  </option>
                    {Object.keys(countryList).map((key, index) => (
                      <option value={key} key={index}>
                        {countryList[key]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Register
                </button>
                </div>
                <p>
                  <Link className="registerlink" to="/login">
                    Already have an account? Login
                </Link>
                </p>
              </form>
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
  { register, createMessage }
)(Register);
