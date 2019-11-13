import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { GoLocation } from "react-icons/go";
import PageTitle from "../PageTitle";
import Pagination from "react-js-pagination";

import {
  getTenders,
  getTendersLocations,
  getFilteredTenders,
  getBookmarkedTenders,
  addBookmarkedTenders
} from "../../actions/tenderAction";

class Tenders extends Component {
  static propTypes = {
    tenderItems: PropTypes.object.isRequired,
    getTenders: PropTypes.func.isRequired,
    getTendersLocations: PropTypes.func.isRequired,
    getFilteredTenders: PropTypes.func.isRequired,
    getBookmarkedTenders: PropTypes.func.isRequired,
    addBookmarkedTenders: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getTenders();
    this.props.getTendersLocations();
  }

  tender_container = {
    currentPage: 1,
    isLocationSelected: false,
    isPageSelected: false,
    selectedLocationID: null,
    isFilterCalled: false,
    isDisplayBookmarkClicked: false
  };

  // Function to capture the event when location is selected

  handleLocationChange = locSelectEvent => {
    this.tender_container.isLocationSelected = true;
    this.tender_container.selectedLocationID = locSelectEvent.target.value;

    if (this.tender_container.isLocationSelected) {
      this.tender_container.isFilterCalled = true;
    }

    this.handleAllEventChanges();
  };

  // Function to capture the event when page is selected

  handlePageChange = pageNumber => {
    this.tender_container.isPageSelected = true;
    this.tender_container.currentPage = pageNumber;
    this.handleAllEventChanges();
  };

  // Function to capture the all events and construct final API

  handleAllEventChanges = () => {
    let contractsAPI = "http://127.0.0.1:8000/api/v1/tenders/";
    let suffixAPI = "?";
    let filteredResultsAPI = null;

    // when location is selected, append its ID in API

    if (this.tender_container.isLocationSelected) {
      suffixAPI += `&location=${this.tender_container.selectedLocationID}`;
    }

    // when page is selected, append its ID in API depending if any DOM event is triggered or not

    if (this.tender_container.isFilterCalled === true) {
      this.tender_container.currentPage = 1;
      suffixAPI += `&page=1`;
    } else {
      suffixAPI += `&page=${this.tender_container.currentPage}`;
    }

    this.tender_container.isFilterCalled = false;

    // constructing final API

    filteredResultsAPI = contractsAPI + suffixAPI;
    this.props.getFilteredTenders(filteredResultsAPI);
  };

  // Below three functions are used for bookmark functionality

  handleSavedTenders = () => {
    this.tender_container.isDisplayBookmarkClicked = true;
    this.props.getBookmarkedTenders();
  };

  handleSavedTendersRevert = () => {
    this.tender_container.isDisplayBookmarkClicked = false;
    this.props.getTenders();
  };

  handleBookmark = addBookmarkEvent => {
    this.props.addBookmarkedTenders(addBookmarkEvent.target.value);
  };

  render() {
    const { tenders, tenders_count, tender_locations } = this.props.tenderItems;

    if (this.tender_container.isDisplayBookmarkClicked) {
      return (
        <Fragment>
          <PageTitle title="Dreamsgate-Tenders" />
          <div>
            <div className="mainblock">
              <div className="block1">
                {/* <div style={{ marginTop: "2rem" }}>
                  <h3>Locations</h3>
                  <div className="location-filter">
                    <select
                      className="location123"
                      value=""
                      onChange={this.handleLocationChange}
                    >
                      <option value="">Select any location</option>
                      {tender_locations.map((tenderLoc, index) => (
                        <option value={tenderLoc.id} key={index}>
                          {tenderLoc.location_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <br />
                </div> */}
              </div>
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
                      Your Saved Tenders&emsp;{" "}
                      {/* <button
                        style={{
                          backgroundColor: "White",
                          borderRadius: "15px",
                          cursor: "default"
                        }}
                      >
                        {tenders_count}
                      </button> */}
                    </span>
                  </div>
                  <div className="saved2"></div>
                  <div className="saved3">
                    <button
                      type="button"
                      className="btn btn-success pull-right"
                      onClick={this.handleSavedTendersRevert}
                    >
                      {" "}
                      <span
                        style={{
                          fontFamily: "AvenirNext-Medium",
                          fontSize: "14px"
                        }}
                      >
                        Back to Tenders
                      </span>
                    </button>
                    &emsp;&emsp;&emsp;
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      marginLeft: "3rem",
                      marginTop: "3rem",
                      backgroundColor: "white",
                      width: "95%"
                    }}
                  >
                    {tenders.map((bookmarkedTenders, index) => {
                      function CheckSource() {
                        if (bookmarkedTenders.tender.source === null)
                          return null;
                        else
                          return (
                            <b>
                              {bookmarkedTenders.tender.source.tender_source}
                            </b>
                          );
                      }

                      function CheckLocation() {
                        if (bookmarkedTenders.tender.location === null)
                          return null;
                        else
                          return (
                            <h6>
                              <GoLocation />{" "}
                              {bookmarkedTenders.tender.location.location_name}
                            </h6>
                          );
                      }

                      return (
                        <Router>
                          <div key={index}>
                            <div className="contact-blockTenders">
                              <div className="website-detailsTenders">
                                <a
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: "grey" }}
                                  href={bookmarkedTenders.tender.url}
                                >
                                  <h5>
                                    <CheckSource />
                                  </h5>
                                </a>
                                <CheckLocation />
                                <a
                                  href={bookmarkedTenders.tender.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: "grey" }}
                                >
                                  <span className="Job_TitleTenders">
                                    {bookmarkedTenders.tender.title}
                                  </span>
                                </a>
                              </div>
                              <div className="saved-itemsTenders">
                                {/* <button
                                  onClick={this.handleBookmark}
                                  value={contract.id}
                                >
                                  Add to Favourites
                                </button> */}
                              </div>
                            </div>
                          </div>
                        </Router>
                      );
                    })}
                  </div>
                </div>
                <div className="Pagination">
                  {/* <Pagination
                    activePage={this.tender_container.currentPage}
                    itemsCountPerPage={10}
                    totalItemsCount={tenders_count}
                    pageRangeDisplayed={15}
                    onChange={this.handlePageChange}
                    prevPageText="Prev"
                    nextPageText="Next"
                    hideFirstLastPages="true"
                    itemClass="Pagination1"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <PageTitle title="Dreamsgate-Tenders" />
          <div>
            <div className="mainblock">
              <div className="block1">
                <div style={{ marginTop: "2rem" }}>
                  <h3>Locations</h3>
                  <div className="location-filter">
                    <select
                      className="location123"
                      value=""
                      onChange={this.handleLocationChange}
                    >
                      <option value="">Select any location</option>
                      {tender_locations.map((tenderLoc, index) => (
                        <option value={tenderLoc.id} key={index}>
                          {tenderLoc.location_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <br />
                  {/* <ToggleSwitch /> */}
                </div>
              </div>
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
                      Design Tenders&emsp;{" "}
                      <button
                        style={{
                          backgroundColor: "White",
                          borderRadius: "15px",
                          cursor: "default"
                        }}
                      >
                        {tenders_count}
                      </button>
                    </span>
                  </div>
                  <div className="saved2"></div>
                  <div className="saved3">
                    <button
                      type="button"
                      className="btn btn-success pull-right"
                      onClick={this.handleSavedTenders}
                    >
                      {" "}
                      <span
                        style={{
                          fontFamily: "AvenirNext-Medium",
                          fontSize: "14px"
                        }}
                      >
                        Saved Tenders
                      </span>
                    </button>
                    &emsp;&emsp;&emsp;
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      marginLeft: "3rem",
                      marginTop: "3rem",
                      backgroundColor: "white",
                      width: "95%"
                    }}
                  >
                    {tenders.map((tender, index) => {
                      function CheckSource() {
                        if (tender.source === null) return null;
                        else return <b>{tender.source.tender_source}</b>;
                      }

                      function CheckLocation() {
                        if (tender.location === null) return null;
                        else
                          return (
                            <h6>
                              <GoLocation /> {tender.location.location_name}
                            </h6>
                          );
                      }

                      return (
                        <Router>
                          <div key={index}>
                            <div className="contact-blockTenders">
                              <div className="website-detailsTenders">
                                <a
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: "grey" }}
                                  href={tender.url}
                                >
                                  <h5>
                                    <CheckSource />
                                  </h5>
                                </a>
                                <CheckLocation />
                                <a
                                  href={tender.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: "grey" }}
                                >
                                  <span className="Job_TitleTenders">
                                    {tender.title}
                                  </span>
                                </a>
                              </div>
                              <div className="saved-itemsTenders">
                                <button
                                  onClick={this.handleBookmark}
                                  value={tender.id}
                                >
                                  Add to Favourites
                                </button>
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
                    activePage={this.tender_container.currentPage}
                    itemsCountPerPage={10}
                    totalItemsCount={tenders_count}
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
        </Fragment>
      );
    }
  }
}

const mapStateToProps = state => ({
  tenderItems: state.tenderReducer
});

export default connect(
  mapStateToProps,
  {
    getTenders,
    getTendersLocations,
    getFilteredTenders,
    getBookmarkedTenders,
    addBookmarkedTenders
  }
)(Tenders);
