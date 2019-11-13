import React, { Component } from "react";
import { Link } from "react-router-dom";
import PageTitle from "./PageTitle";

export default class Dashboard extends Component {
  render() {
    return (
      <>
        <PageTitle title="Dreamsgate-Dashboard" />
        <div className="dashboard-one" style={{ height: "800px" }}>
          <center style={{ fontSize: "40px" }}>
            Welcome To DreamsGate of First Project of React JS where you can
            find best jobs OFFER one click of a button
            <Link to="/profile/plans/payment">payment</Link>
          </center>
        </div>
      </>
    );
  }
}
