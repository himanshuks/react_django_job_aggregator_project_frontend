import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Pagination from "react-js-pagination";
// import { initialState } from "../reducers/authReducer";
import PageTitle from "./PageTitle";

class SocialDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socialData: [],
      isSocialLoaded: false,
      totalRecords: 0,
      currentPage: 1
    };

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    fetch(this.props.optionSocialSelected)
      .then(res => res.json())
      .then(json => {
        this.setState({
          socialData: json.results,
          isSocialLoaded: true,
          totalRecords: json.count
        });
      })
      .catch(error => console.log(error));
  }

  componentDidUpdate(prevProps) {
    if (this.props.optionSocialSelected !== prevProps.optionSocialSelected) {
      fetch(this.props.optionSocialSelected)
        .then(res => res.json())
        .then(json => {
          this.setState({
            socialData: json.results,
            isSocialLoaded: true,
            totalRecords: json.count
          });
        })
        .catch(error => console.log(error));
    }
  }

  handlePageChange(pageNumber) {
    console.log(`Current page is ${pageNumber}`);
    fetch(this.props.optionSocialSelected + `&page=${pageNumber}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isPageSelected: true,
          totalRecords: json.count,
          socialData: json.results,
          nextpage: json.next,
          previouspage: json.previous,
          currentPage: pageNumber
        });
      });
  }

  render() {
    var { socialData } = this.state;

    return (
      <React.Fragment>
        <PageTitle title="Dreamsgate-Social" />
        <div className="block2" style={{ backgroundColor: "rgb(248,248,248)" }}>
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
                  {this.state.totalRecords}
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
                {socialData.map((x, index) => {
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
                            <div style={{ color: "black", opacity: "0.7" }}>
                              <span>
                                Twitter &nbsp;{" "}
                                <span
                                  style={{ color: "grey", fontSize: "18px" }}
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
                            <div style={{ color: "black", opacity: "0.7" }}>
                              <span>
                                Facebook &nbsp;{" "}
                                <span
                                  style={{ color: "grey", fontSize: "18px" }}
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
                activePage={this.state.currentPage}
                itemsCountPerPage={10}
                totalItemsCount={this.state.totalRecords}
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
      </React.Fragment>
    );
  }
}

export default SocialDisplay;
