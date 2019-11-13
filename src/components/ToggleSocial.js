import React, { Component } from "react";
import CompleteSocial from "./SocialDisplay";
import PageTitle from "./PageTitle";

export default class ToggleSocial extends Component {
  constructor() {
    super();
    this.state = {
      isTwitterChecked: false,
      isFacebookChecked: false,
      isAllSocialChecked: false,
      filteredSocialURL: "http://127.0.0.1:8000/api/v1/social_feed_posts/"
    };
    this.DisplayAll = this.DisplayAll.bind(this);
    this.SocialTwitter = this.SocialTwitter.bind(this);
    this.SocialFacebook = this.SocialFacebook.bind(this); // set this, because you need get methods from CheckBox
  }

  DisplayAll(displayall) {
    this.setState({
      isAllSocialChecked: true,
      filteredSocialURL: "http://127.0.0.1:8000/api/v1/social_feed_posts/"
    });
    // console.log("Item selected T" + event.target.value);
    console.log("Item selected T2" + this.state.filteredSocialURL);
  }

  SocialTwitter(isTwitterChecked) {
    this.setState({
      isTwitterChecked: true,
      filteredSocialURL: "http://127.0.0.1:8000/api/v1/social_feed_posts/?social_media_type=0"
    });
    // console.log("Item selected T" + event.target.value);
    console.log("Item selected T2" + this.state.filteredSocialURL);
  }

  SocialFacebook(isFacebookChecked) {
    this.setState({
      isFacebookChecked: true,
      filteredSocialURL: "http://127.0.0.1:8000/api/v1/social_feed_posts/?social_media_type=1"
    });
    // console.log("Item selected F" + event.target.value);
    console.log("Item selected F2" + this.state.filteredSocialURL);
  }

  render() {
    return (
      <React.Fragment>
        <PageTitle title="Dreamsgate-Social" />
        <div>
          <div className="Social_main">
            <div
              className="Social_Toggle"
              style={{ borderRight: "1px solid lightgrey" }}
            >
              <div
                style={{
                  marginTop: "2rem",
                  marginLeft: "2rem",
                  marginRight: "0rem",
                  width: "210px"
                }}
              >
                <h3>Sources</h3>
                <br />
                <label className="switch" id="all">
                  <input
                    type="checkbox"
                    value="displayall"
                    onChange={this.DisplayAll}
                  />
                  <span className="slider round"></span>
                </label>
                &nbsp;&nbsp;&nbsp;All
                <br />
                <label className="switch">
                  <input
                    type="checkbox"
                    value="twitter"
                    onChange={this.SocialTwitter}
                  />
                  <span className="slider round"></span>
                </label>
                &nbsp;&nbsp;&nbsp;Twitter
                <br />
                <label className="switch">
                  <input
                    type="checkbox"
                    value="facebook"
                    onChange={this.SocialFacebook}
                  />
                  <span className="slider round"></span>
                </label>
                &nbsp;&nbsp;&nbsp;Facebook Groups
                <br />
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
                &nbsp;&nbsp;&nbsp;Other
              </div>
            </div>
            <div className="Social_display" style={{ width: "100%" }}>
              <div>
                <CompleteSocial
                  optionSocialSelected={this.state.filteredSocialURL}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
