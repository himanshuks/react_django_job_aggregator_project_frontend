import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Upload from "./upload";



class Profile1 extends Component {
  static navigationOptions = {
    //To hide the ActionBar/NavigationBar
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      businessname: "",
      email1: "",
      password: "",
      country: ""
    };

    this.update = this.update.bind(this);

    this.displayLogin = this.displayLogin.bind(this);
  }

  update(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  displayLogin(e) {
    e.preventDefault();
    // window.alert('You have successfully registered');
    console.log("You have successfully Updated");
    console.log(this.state);
    this.setState({
      firstname: "",
      lastname: "",
      businessname: "",
      email1: "",
      password: "",
      country: ""
    });
  }

  render() {
    return (
      <>
        <div className="profile-tab-items" id="navigation">
          <span className="ptn-1">
            <a className="profile1" href="/change_profile">
              Profile
            </a>
          </span>
          <span className="ptn-1">
            <a href="/profile/change_password/" className="profile1">
              Password
            </a>
          </span>
          <span className="ptn-1">
            <a href="/checkout/new/" className="profile1">
              Billing
            </a>
          </span>
          <span className="mt-4 mb-4 ml-auto">
            Do you need help? Visit customer support
          </span>
        </div>
        <div className="register1">
          <form onSubmit={this.displayLogin}>
            <h3>
              <u>
                <center>Profile Update</center>
              </u>
            </h3>

            <Upload />
            <div className="profileupdate">
              <span style={{ color: "black" }}>First Name</span>
              <div className="fname">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.update}
                  required
                />
              </div>
              <span style={{ color: "black" }}>Last Name</span>
              <div className="lname">
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.update}
                  required
                />
              </div>
              <span style={{ color: "black" }}>Business Name</span>
              <div className="bname">
                <input
                  type="text"
                  placeholder="Business Name"
                  name="businessname"
                  value={this.state.businessname}
                  onChange={this.update}
                  required
                />
              </div>
              <span style={{ color: "black" }}>Email Address</span>
              <div className="email">
                <input
                  type="email"
                  placeholder="Email"
                  name="email1"
                  value={this.state.email}
                  onChange={this.update}
                  required
                />
              </div>

              {/* <div className="flexform1">
                <div className="drop123">
                  <div>
                    <span style={{ color: "black" }}> Location</span>
                  </div>
                  <DropdownExampleSearchSelectionTwo />
                </div>

                <div className="notification">
                  <div>Notification Frequency</div>
                  <div>
                    <Notification />
                  </div>
                </div>
              </div> */}

              <input type="submit" value="Save Settings" />
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Profile1;
