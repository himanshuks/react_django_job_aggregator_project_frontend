import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import "../stylesheets/subscriptionPlan.css"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPlans } from "../actions/planAction";

class Card extends Component {
  static propTypes = {
    plan: PropTypes.array.isRequired,
    getPlans: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getPlans();
  }

  render() {
    const plans = this.props.plan;


    return (
      <React.Fragment>
        <div>
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
            <span className="mt-4 mb-4 ml-auto">
              Do you need help? Visit customer support
            </span>
          </div>
          <span className="cardTitle"><center>Upgrade Your Plan </center></span>
          <h5><center style={{ color: "grey" }}>Choose the One from our plans to Upgrade.</center> </h5>
          <center>

            <div className="mainCard">
              <div className="FreeCard">
                <center className="cardContent">
                  <h1>Free</h1>
                  <div></div>
                  <span>Forever</span><br></br><br></br>
                  <p>Dummy text</p><br></br><br></br><br></br>
                  <div>
                    <p></p>
                    <p></p>
                  </div><br />
                  <Link to="/profile/" className="upgradebutton1"><b>Free Account</b></Link></center>

              </div>
              {plans.map(x => (
                <div className="mainCardDynamic">
                  <div className={x.plan_name} key={x.id}>
                    <center className="cardContent">

                      <h1>${x.cost_per_transaction}</h1>
                      <span>{x.plan_name}</span><br></br><br></br>
                      <p>Dummy text</p><br /><br /><br />
                      <div>
                        <p></p>
                        <p></p>
                      </div>
                      <button className="upgradebutton3"><b>
                        <Link className="Upgrade-Dynamic-button" to={{ pathname: '/profile/plans/payment', state: { idvalue: x.id, idamount: x.cost_per_transaction } }}> Upgrade Account</Link>

                      </b></button></center>

                  </div>
                </div>
              ))}


            </div>

          </center>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  plan: state.plansReducers.plans
});

export default connect(
  mapStateToProps, { getPlans }
)(Card);