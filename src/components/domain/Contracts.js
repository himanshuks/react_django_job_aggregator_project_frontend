import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { GoLocation } from "react-icons/go";
import PageTitle from "../PageTitle";
import Pagination from "react-js-pagination";
import "../../stylesheets/contract_Tenders_social.css";

import {
  getContracts,
  getContractsLocations,
  getFilteredContracts,
  getBookmarkedContracts,
  addBookmarkedContracts
} from "../../actions/contractAction";

class Contracts extends Component {
  static propTypes = {
    contractItems: PropTypes.object.isRequired,
    getContracts: PropTypes.func.isRequired,
    getContractsLocations: PropTypes.func.isRequired,
    getFilteredContracts: PropTypes.func.isRequired,
    addBookmarkedContracts: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getContracts();
    this.props.getContractsLocations();
  }

  contract_container = {
    currentPage: 1,
    isLocationSelected: false,
    selectedLocationID: null,
    isFilterCalled: false,
    isDisplayBookmarkClicked: false
  };

  // Function to capture the event when location is selected

  handleLocationChange = locSelectEvent => {
    this.contract_container.selectedLocationID = locSelectEvent.target.value;
    this.contract_container.isLocationSelected = true;

    if (this.contract_container.isLocationSelected) {
      this.contract_container.isFilterCalled = true;
    }

    this.handleAllEventChanges();
  };

  // Function to capture the event when page is selected

  handlePageChange = pageNumber => {
    this.contract_container.isPageSelected = true;
    this.contract_container.currentPage = pageNumber;

    this.handleAllEventChanges();
  };

  // Function to capture the all events and construct final API

  handleAllEventChanges = () => {
    let contractsAPI = "http://127.0.0.1:8000/api/v1/contracts/";
    let suffixAPI = "?";
    let filteredResultsAPI = null;

    // when location is selected, append its ID in API

    if (this.contract_container.isLocationSelected) {
      suffixAPI += `&location=${this.contract_container.selectedLocationID}`;
    }

    // when page is selected, append its ID in API depending if any DOM event is triggered or not

    if (this.contract_container.isFilterCalled === true) {
      this.contract_container.currentPage = 1;
      suffixAPI += `&page=1`;
    } else {
      suffixAPI += `&page=${this.contract_container.currentPage}`;
    }

    this.contract_container.isFilterCalled = false;

    // constructing final API

    filteredResultsAPI = contractsAPI + suffixAPI;
    this.props.getFilteredContracts(filteredResultsAPI);
  };

  // Below three functions are used for bookmark functionality

  handleSavedContracts = () => {
    this.contract_container.isDisplayBookmarkClicked = true;
    this.props.getBookmarkedContracts();
  };

  handleSavedContractsRevert = () => {
    this.contract_container.isDisplayBookmarkClicked = false;
    this.props.getContracts();
  };

  handleBookmark = addBookmarkEvent => {
    this.props.addBookmarkedContracts(addBookmarkEvent.target.value);
  };

  render() {
    const {
      contracts,
      contracts_count,
      contract_locations
    } = this.props.contractItems;

    if (this.contract_container.isDisplayBookmarkClicked) {
      return (
        <Fragment>
          <PageTitle title="Dreamsgate-Contracts" />
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
                      {contract_locations.map((contractLoc, index) => (
                        <option value={contractLoc.id} key={index}>
                          {contractLoc.location_name}
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
                      Your Saved Contracts&emsp;{" "}
                      {/* <button
                        style={{
                          backgroundColor: "White",
                          borderRadius: "15px",
                          cursor: "default"
                        }}
                      >
                        {contracts_count}
                      </button> */}
                    </span>
                  </div>
                  <div className="saved2"></div>
                  <div className="saved3">
                    <button
                      type="button"
                      class="btn btn-success pull-right"
                      onClick={this.handleSavedContractsRevert}
                    >
                      <span className="SavedContracts">Back to Contracts</span>
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
                    {contracts.map((bookmarkedContracts, index) => {
                      function CheckLocation() {
                        if (bookmarkedContracts.contract.location === null)
                          return null;
                        else
                          return (
                            <h6>
                              <GoLocation />{" "}
                              {
                                bookmarkedContracts.contract.location
                                  .location_name
                              }
                            </h6>
                          );
                      }
                      function CheckCompanyName() {
                        if (bookmarkedContracts.contract.company === null)
                          return null;
                        else
                          return (
                            <b>
                              {
                                bookmarkedContracts.contract.company
                                  .company_name
                              }
                            </b>
                          );
                      }
                      function CheckSkills() {
                        if (bookmarkedContracts.contract.skills.length === 0)
                          return null;
                        else
                          return (
                            <h6 className="skillsborder">
                              Skills :{" "}
                              {
                                bookmarkedContracts.contract.skills[0]
                                  .skill_name
                              }
                            </h6>
                          );
                      }
                      function CheckSourceLogo() {
                        if (
                          bookmarkedContracts.contract.source
                            .source_logo_url === null
                        )
                          return <span>Source logo not available</span>;
                        else
                          return (
                            <a
                              href={bookmarkedContracts.contract.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={
                                  bookmarkedContracts.contract.source
                                    .source_logo_url
                                }
                                alt="Jobs"
                                height="50px"
                                width="150px"
                              ></img>
                            </a>
                          );
                      }
                      return (
                        <Router>
                          <div key={index}>
                            <div className="contact-block">
                              <div className="website-logo">
                                <CheckSourceLogo />
                              </div>
                              <div className="website-details">
                                <a
                                  href={bookmarkedContracts.contract.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <h5>
                                    <span className="Job_Title">
                                      {bookmarkedContracts.contract.title}
                                    </span>
                                  </h5>
                                </a>
                                <CheckLocation />
                                <h6>
                                  {
                                    bookmarkedContracts.contract
                                      .truncated_description
                                  }
                                </h6>
                                <h6>
                                  <CheckCompanyName />
                                </h6>
                                <h6>
                                  {" "}
                                  Salary : {bookmarkedContracts.contract.salary}
                                </h6>
                                <CheckSkills />
                              </div>
                              <div className="saved-items">
                                {/* <button
                                  onClick={this.handleBookmark}
                                  value={bookmarkedContracts.contract.id}
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
                    activePage={this.contract_container.currentPage}
                    itemsCountPerPage={25}
                    totalItemsCount={contracts_count}
                    pageRangeDisplayed={15}
                    onChange={this.handlePageChange}
                    prevPageText="Prev"
                    nextPageText="Next"
                    itemClass="Pagination1"
                    hideFirstLastPages="true"
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
          <PageTitle title="Dreamsgate-Contracts" />
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
                      {contract_locations.map((contractLoc, index) => (
                        <option value={contractLoc.id} key={index}>
                          {contractLoc.location_name}
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
                      Design Contracts&emsp;{" "}
                      <button
                        style={{
                          backgroundColor: "White",
                          borderRadius: "15px",
                          cursor: "default"
                        }}
                      >
                        {contracts_count}
                      </button>
                    </span>
                  </div>
                  <div className="saved2"></div>
                  <div className="saved3">
                    <button
                      type="button"
                      class="btn btn-success pull-right"
                      onClick={this.handleSavedContracts}
                    >
                      <span className="SavedContracts">Saved Contracts</span>
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
                    {contracts.map((contract, index) => {
                      function CheckLocation() {
                        if (contract.location === null) return null;
                        else
                          return (
                            <h6>
                              <GoLocation /> {contract.location.location_name}
                            </h6>
                          );
                      }
                      function CheckCompanyName() {
                        if (contract.company === null) return null;
                        else return <b>{contract.company.company_name}</b>;
                      }
                      function CheckSkills() {
                        if (contract.skills.length === 0) return null;
                        else
                          return (
                            <h6 className="skillsborder">
                              Skills : {contract.skills[0].skill_name}
                            </h6>
                          );
                      }
                      function CheckSourceLogo() {
                        if (contract.source.source_logo_url === null)
                          return <span>Source logo not available</span>;
                        else
                          return (
                            <a
                              href={contract.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={contract.source.source_logo_url}
                                alt="Jobs"
                                height="50px"
                                width="150px"
                              ></img>
                            </a>
                          );
                      }
                      return (
                        <Router>
                          <div key={index}>
                            <div className="contact-block">
                              <div className="website-logo">
                                <CheckSourceLogo />
                              </div>
                              <div className="website-details">
                                <a
                                  href={contract.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <h5>
                                    <span className="Job_Title">
                                      {contract.title}
                                    </span>
                                  </h5>
                                </a>
                                <CheckLocation />
                                <h6>{contract.truncated_description}</h6>
                                <h6>
                                  <CheckCompanyName />
                                </h6>
                                <h6> Salary : {contract.salary}</h6>
                                <CheckSkills />
                              </div>
                              <div className="saved-items">
                                <button
                                  onClick={this.handleBookmark}
                                  value={contract.id}
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
                    activePage={this.contract_container.currentPage}
                    itemsCountPerPage={25}
                    totalItemsCount={contracts_count}
                    pageRangeDisplayed={15}
                    onChange={this.handlePageChange}
                    prevPageText="Prev"
                    nextPageText="Next"
                    itemClass="Pagination1"
                    hideFirstLastPages="true"
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
  contractItems: state.contractReducer
});

export default connect(
  mapStateToProps,
  {
    getContracts,
    getContractsLocations,
    getFilteredContracts,
    getBookmarkedContracts,
    addBookmarkedContracts
  }
)(Contracts);
