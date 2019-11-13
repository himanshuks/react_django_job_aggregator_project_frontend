import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PageTitle from "../PageTitle";
import Pagination from "react-js-pagination";

import { getSocial, getFilteredSocial } from "../../actions/socialAction";

class Social extends React.Component {
  static propTypes = {
    socialItems: PropTypes.object.isRequired,
    getSocial: PropTypes.func.isRequired,
    getFilteredSocial: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getSocial();
  }

  social_container = {
    currentPage: 1,
    isPageSelected: false,
    isToggleSelected: false,
    isChecked: false,
    socialTypeSelected: null,
    isFilterCalled: false
  };

  handlePageChange = pageNumber => {
    this.social_container.isPageSelected = true;
    this.social_container.currentPage = pageNumber;
    this.handleAllEventChanges();
  };

  handleSocialToggle = e => {
    this.social_container.isToggleSelected = true;
    this.social_container.socialTypeSelected = e.target.value;
    console.log("The value is", this.social_container.isToggleSelected);

    if (this.social_container.isToggleSelected) {
      this.social_container.isFilterCalled = true;
    }
    this.handleAllEventChanges();
  };

  handleAllEventChanges = () => {
    let contractsAPI = "http://127.0.0.1:8000/api/v1/social_feed_posts/";
    let suffixAPI = "?";
    let filteredResultsAPI = null;

    switch (this.social_container.socialTypeSelected) {
      case "twitter":
        suffixAPI += `&social_media_type=0`;
        break;
      case "facebook":
        suffixAPI += `&social_media_type=1`;
        break;
    }

    if (this.social_container.isFilterCalled === true) {
      this.social_container.currentPage = 1;
      suffixAPI += `&page=1`;
    } else {
      suffixAPI += `&page=${this.social_container.currentPage}`;
    }

    this.social_container.isFilterCalled = false;

    filteredResultsAPI = contractsAPI + suffixAPI;
    console.log("filteredResultsAPI", filteredResultsAPI);
    this.props.getFilteredSocial(filteredResultsAPI);
  };

  render() {
    const { social, social_count } = this.props.socialItems;

    return (
      <Fragment>
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

                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="all"
                      name="socialtype"
                      onChange={this.handleSocialToggle}
                    />
                    All
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="twitter"
                      name="socialtype"
                      onChange={this.handleSocialToggle}
                    />
                    Twitter
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="facebook"
                      name="socialtype"
                      onChange={this.handleSocialToggle}
                    />
                    Facebook
                  </label>
                </div>
              </div>
            </div>
            <div className="Social_display" style={{ width: "100%" }}>
              <div>
                <div
                  className="block2"
                  style={{ backgroundColor: "rgb(248,248,248)" }}
                >
                  <div className="mainsaved">
                    <div className="saved1">
                      <span
                        style={{
                          fontFamily: "AvenirNext-Regular",
                          fontSize: "18px",
                          color: "#2D3242"
                        }}
                      >
                        Social &emsp;
                        <button
                          style={{
                            backgroundColor: "White",
                            borderRadius: "15px",
                            cursor: "default"
                          }}
                        >
                          {social_count}
                        </button>
                      </span>
                    </div>
                    <div className="saved2"></div>
                    <div className="saved2"></div>
                    {/* <div className="saved3">
              <button type="button" class="btn btn-success pull-right">
                {" "}
                <span
                  style={{ fontFamily: "AvenirNext-Medium", fontSize: "14px" }}
                >
                  Saved Posts
                </span>
              </button>
              &emsp;&emsp;&emsp;
            </div> */}
                  </div>
                  <div>
                    <div
                      className="mainblock"
                      style={{
                        marginLeft: "3rem",
                        marginTop: "3rem",
                        backgroundColor: "white",
                        width: "95%"
                      }}
                    >
                      <div className="block2">
                        {social.map((x, index) => {
                          if (x.is_tweet === true)
                            return (
                              <Router>
                                <div className="contact-block" key={index}>
                                  <div className="website-logo">
                                    <a href={"https://twitter.com/"}>
                                      <img
                                        src={
                                          "http://www.text100.com/wp-content/uploads/2014/01/lg_Twitter-bird-blue-on-white_logo.png"
                                        }
                                        alt="Jobs"
                                        height="50px"
                                        width="150px"
                                      ></img>
                                    </a>
                                  </div>
                                  <div className="website-detailsSocial">
                                    <div
                                      style={{ color: "black", opacity: "0.7" }}
                                    >
                                      <span>
                                        Twitter &nbsp;{" "}
                                        <span
                                          style={{
                                            color: "grey",
                                            fontSize: "18px"
                                          }}
                                        >
                                          &#8226;
                                        </span>{" "}
                                        <a
                                          style={{ color: "grey" }}
                                          href={"https://twitter.com/"}
                                        >
                                          &nbsp; https://twitter.com/
                                        </a>
                                      </span>
                                    </div>
                                    <div>
                                      <a href={x.tweet.tweet_url}>
                                        <h5>
                                          <span
                                            style={{
                                              color: "grey",
                                              fontSize: "15px",
                                              fontFamily: "AvenirNext-Regular"
                                            }}
                                          >
                                            {x.tweet.tweet_text}
                                          </span>
                                        </h5>
                                      </a>
                                      <h6>{x.tweet.twitter_user.fullname}</h6>
                                      <span>
                                        <img
                                          src="https://cdn0.iconfinder.com/data/icons/twitter-ui-flat/48/Twitter_UI-23-512.png"
                                          height="15px"
                                          width="45px"
                                        ></img>
                                        {x.tweet.replies}
                                      </span>
                                      <span>
                                        <img
                                          src="https://smmsumo.com/blog/wp-content/uploads/2018/01/Twitter-Retweet-Worldwide-smmsumo-1.png"
                                          height="10px"
                                          width="30px"
                                        ></img>
                                        {x.tweet.retweets}
                                      </span>
                                      <span>
                                        <img
                                          src="https://cdn0.iconfinder.com/data/icons/twitter-ui-flat/48/Twitter_UI-24-512.png"
                                          height="15px"
                                          width="45px"
                                        ></img>
                                        {x.tweet.likes}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </Router>
                            );
                          else if (x.is_facebook_post === true)
                            return (
                              <Router>
                                <div className="contact-block" key={index}>
                                  <div className="website-logo">
                                    <a href={"https://www.facebook.com/"}>
                                      <img
                                        src={
                                          "https://png.pngtree.com/element_our/sm/20180626/sm_5b321ca7cfbef.png"
                                        }
                                        alt="Jobs"
                                        height="50px"
                                        width="150px"
                                      ></img>
                                    </a>
                                  </div>
                                  <div className="website-detailsSocial">
                                    <div
                                      style={{ color: "black", opacity: "0.7" }}
                                    >
                                      <span>
                                        Facebook &nbsp;{" "}
                                        <span
                                          style={{
                                            color: "grey",
                                            fontSize: "18px"
                                          }}
                                        >
                                          &#8226;
                                        </span>{" "}
                                        <a
                                          style={{ color: "grey" }}
                                          href={"https://twitter.com/"}
                                        >
                                          &nbsp; https://facebook.com/
                                        </a>
                                      </span>
                                    </div>
                                    <div>
                                      <a
                                        style={{ color: "black" }}
                                        href={x.facebook_post.post_url}
                                      >
                                        <h5>
                                          <span
                                            style={{
                                              color: "grey",
                                              fontSize: "15px",

                                              fontFamily: "AvenirNext-Regular"
                                            }}
                                          >
                                            {x.facebook_post.job_title}
                                          </span>
                                        </h5>
                                      </a>
                                      <h6>{x.facebook_post.job_type}</h6>
                                      <span>
                                        <img
                                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Facebook_Thumb_icon.svg/1200px-Facebook_Thumb_icon.svg.png"
                                          height="30px"
                                          width="90px"
                                        ></img>
                                        {x.facebook_post.number_of_likes}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </Router>
                            );
                        })}
                      </div>
                    </div>
                    <div className="Pagination">
                      <Pagination
                        activePage={this.social_container.currentPage}
                        itemsCountPerPage={10}
                        totalItemsCount={social_count}
                        pageRangeDisplayed={15}
                        onChange={this.handlePageChange}
                        prevPageText="Prev"
                        nextPageText="Next"
                        hideFirstLastPages="true"
                        itemClass="Pagination1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  socialItems: state.socialReducer
});

export default connect(
  mapStateToProps,
  {
    getSocial,
    getFilteredSocial
  }
)(Social);
