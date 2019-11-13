import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";


class ProfileNavBar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };
  render() {
    let { plans } = ""
    const { user } = this.props.auth;
    if (user.subscription_plan_name == null)
      plans = "You have not Subscribed to any Plans"
    else
      plans = user.subscription_plan_name
    return (
      <React.Fragment>

        <div style={{ fontSize: "18px" }}>
          <div className="profile-tab-items" >
            <span className="ptn-1">
              <Link className="profile1" to="/changeprofile">
                Profile
              </Link>
            </span>
            <span className="ptn-1">

              <a href="/profile/change_password/" className="profile1">Password</a>
            </span>
            <span className="ptn-1">

              <a href="/checkout/new/" className="profile1">Billing</a>
            </span>
            <div className="ptn-2 mt-4 mb-4 ml-auto">
              Do you need help? Visit customer support
            </div>
          </div>
          <div className="plan-main">
            <div className="plan-block">
              <span className="Plan-name">
                <span>Your Current Plan</span>
              </span>
              <p className="billing-label-1">{plans}</p>

              <p> Upgrate to yearly $79 per year and save 30%</p>
              <p>
                <button className="profile-upgrade-btn"> <Link className="Link-upgrade-btn" to="/profile/plans">UPGRADE PLAN</Link></button>
                <button className="upgrade-can-btn"><Link className="Link-can-btn" to="/" >Cancel Plan</Link></button>
              </p>
              <p>Your next billing date is: January 21, 2020 for $79</p>
            </div>
            <div className="plan-block-2">
              <p>Paypal Account</p>
              <p className="billing-label-1">{user.username}</p>
              <p className="billing-label-2">{user.email}</p>
              <p>
                <button className="change-acc-btn">Change Account</button>
              </p>
            </div>
            <div className="plan-block-3">
              <p>Invoice History</p>
              <p>Item 1</p>
              <p>Item 2</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(ProfileNavBar);