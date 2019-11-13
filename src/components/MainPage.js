import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Dashboard from "./Dashboard";
import Card from "./SubscriptionPlans";
import Placeholder from "./Placeholder";
import ContractDisplay from "./domain/Contracts";
import Profile1 from "./ChangeProfile";
import FooterPage from "./Footer";
import Navbar from "./NavBar";
import TenderDisplay from "./domain/Tenders";
import ProfileNavBar from "./ProfileNavBar";
import SocialDisplay from "./domain/Social";
import Check from "./domain/Social";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Payment from "../components/Payment/Payment";
import { Forgotpassword } from "./accounts/Forgotpassword";

const cookies = new Cookies();

class Home extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { user } = this.props.auth;
    let id = user.id;
    cookies.set("userid", id, { path: "/" });
    console.log(cookies.get("userid"));
    return (
      <React.Fragment>
        <div className="mainpage123">
          <Router>
            <div>
              <Navbar></Navbar>
              <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/contracts" component={ContractDisplay} />
                <Route exact path="/tenders" component={TenderDisplay} />
                <Route exact path="/social" component={SocialDisplay} />
                <Route exact path="/resources" component={Check} />
                <Route exact path="/profile" component={ProfileNavBar} />
                <Route exact path="/recommended" component={Placeholder} />
                <Route exact path="/profile/plans" component={Card} />
                <Route exact path="/changeprofile" component={Profile1} />
                <Route
                  exact
                  path="/profile/plans/payment"
                  component={Payment}
                />
                <Route
                  exact
                  path="/forgotpassword"
                  component={Forgotpassword}
                />

                {/*        <Route exact path="/register" component={Register} />

                <Route exact path="/changepassword" component={ChangePassword} /> 
                <Route exact path="/billing" component={MakePayment} />
                <Route exact path="/facebook" component={Face} /> */}
                {/* <Route component={Default} /> */}
              </Switch>
            </div>
          </Router>
          <FooterPage />
          {/* <div >
            <FooterPage />
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Home);
