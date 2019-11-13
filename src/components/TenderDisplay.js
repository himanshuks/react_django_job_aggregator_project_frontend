import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { GoLocation } from "react-icons/go";
import ReactStars from "react-stars";
import Pagination from "react-js-pagination";
// import { Button } from "semantic-ui-react";
import axios from "axios";
import PageTitle from "./PageTitle";

//import ToggleSwitch from "./ToggleSwitch";

const ratingChanged = newRating => {
  console.log(newRating);
};

class TenderDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      tendersData: [],
      dataSourceLoc: [],
      currentContracts: [],
      isLocLoaded: false,
      totalRecords: 0,
      totalFilterRecords: 0,
      currentPage: 1,
      selectedLoc: "",
      selectedlocation: 0,
      totalPages: null,
      bookmarks: [],
      contract_id: 0,
      current_user: "",
      isBookLoaded: false
    };

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSavedTenders = this.handleSavedTenders.bind(this);
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/v1/tenders/")
      .then(res => res.json())
      .then(json => {
        this.setState({
          totalRecords: json.count,
          tendersData: json.results
        });
      })
      .catch(error => console.log(error));
    fetch("http://127.0.0.1:8000/api/v1/tender_locations/")
      .then(res => res.json())
      .then(json => {
        this.setState({
          locations: json
        });
      })
      .catch(error => console.log(error));
    fetch("http://127.0.0.1:8000/api/v1/bookmarked_tenders/")
      .then(res => res.json())
      .then(json => {
        this.setState({
          bookmarks: json
        });
      })
      .catch(error => console.log(error));
  }

  handleLocationChange(event) {
    console.log("Tender location ID is " + event.target.value);
    fetch(
      "http://127.0.0.1:8000/api/v1/tenders/?location=" + event.target.value
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLocLoaded: true,
          totalFilterRecords: json.count,
          dataSourceLoc: json.results
        });
      })
      .catch(error => console.log(error));
  }

  handlePageChange(pageNumber) {
    console.log(`Current page is ${pageNumber}`);
    fetch("http://127.0.0.1:8000/api/v1/tenders/?page=" + pageNumber)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isPageSelected: true,
          totalRecords: json.count,
          tendersData: json.results,
          nextpage: json.next,
          previouspage: json.previous,
          currentPage: pageNumber
        });
      });
  }

  handleSavedTenders() {
    fetch("http://127.0.0.1:8000/api/v1/bookmarked_tenders/")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isBookLoaded: true,
          tendersData: json
        });
      })
      .catch(error => console.log(error));
  }

  handleBookmarks = event => {
    console.log("Tender ID is " + event.target.value);

    const tender_id = event.target.value;
    const is_tender_active = true;

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/v1/create_bookmarked_tenders/",
      data: {
        tender: tender_id,
        is_active: is_tender_active
      }
    })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  };

  render() {
    var { isLocLoaded, locations, isBookLoaded, dataSourceLoc } = this.state;

    if (isBookLoaded) {
      return (
        <React.Fragment>
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
                      {locations.map((x, index) => (
                        <option value={x.id} key={index}>
                          {x.location_name}
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
                      Design Tenders &emsp;{" "}
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
                  <div className="saved3">
                    <button
                      type="button"
                      class="btn btn-success pull-right"
                      onClick={this.handleSavedTenders}
                    >
                      {" "}
                      <span className="SavedContracts">Saved Tenders</span>
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
                    {this.state.tendersData.map((x, index) => {
                      function CheckSource() {
                        if (x.tender.source === null) return null;
                        else return <b>{x.tender.source.tender_source}</b>;
                      }

                      function CheckLocation() {
                        if (x.tender.location === null) return null;
                        else
                          return (
                            <h6>
                              <GoLocation /> {x.tender.location.location_name}
                            </h6>
                          );
                      }

                      return (
                        <Router>
                          <div key={index}>
                            <div className="contact-blockTenders">
                              <div className="website-detailsTenders">
                                <a
                                  style={{ color: "grey" }}
                                  href={x.tender.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <h5>
                                    <CheckSource />
                                  </h5>
                                </a>
                                <CheckLocation />
                                <span className="Job_Title">
                                  {x.tender.title}
                                </span>
                              </div>
                              {/* <div className="saved-itemsTenders">
                                <ReactStars
                                  count={1}
                                  onChange={ratingChanged}
                                  size={24}
                                  color2={"#ffd700"}
                                />
                              </div> */}
                            </div>
                          </div>
                        </Router>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else if (!isLocLoaded) {
      return (
        <React.Fragment>
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
                      {locations.map((x, index) => (
                        <option value={x.id} key={index}>
                          {x.location_name}
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
                        {this.state.totalRecords}
                      </button>
                    </span>
                  </div>
                  <div className="saved2"></div>
                  <div className="saved3">
                    <button
                      type="button"
                      class="btn btn-success pull-right"
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
                    {this.state.tendersData.map((x, index) => {
                      function CheckSource() {
                        if (x.source === null) return null;
                        else return <b>{x.source.tender_source}</b>;
                      }

                      function CheckLocation() {
                        if (x.location === null) return null;
                        else
                          return (
                            <h6>
                              <GoLocation /> {x.location.location_name}
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
                                  href={x.url}
                                >
                                  <h5>
                                    <CheckSource />
                                  </h5>
                                </a>
                                <CheckLocation />
                                <a
                                  href={x.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: "grey" }}
                                >
                                  <span className="Job_TitleTenders">
                                    {x.title}
                                  </span>
                                </a>
                              </div>
                              <div className="saved-itemsTenders">
                                {/* <Button
                                  type="primary"
                                  htmltype="submit"
                                  onClick={event => this.handleBookmarks(event)}
                                  value={x.id}
                                > */}
                                <span value={x.id} onclick={event => this.handleBookmarks(event)}>
                                  <i class="fa fa-minus-circle"></i>
                                </span>
                                {/* Add to Favourites
                                </Button> */}
                                {/* <ReactStars
                                  count={1}
                                  onChange={ratingChanged}
                                  size={24}
                                  color2={"#ffd700"}
                                /> */}
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
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
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
                      {locations.map((x, index) => (
                        <option value={x.id} key={index}>
                          {x.location_name}
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
                      Design Tenders{" "}
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
                  <div className="saved3">
                    <button type="button" class="btn btn-success pull-right">
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
                    {dataSourceLoc.map((x, index) => {
                      function CheckSource() {
                        if (x.source === null)
                          return <b>Source not available</b>;
                        else return <b>{x.source.tender_source}</b>;
                      }

                      function CheckLocation() {
                        if (x.location === null)
                          return <h6>Location not available</h6>;
                        else
                          return (
                            <h6>
                              <GoLocation /> {x.location.location_name}
                            </h6>
                          );
                      }
                      return (
                        <Router>
                          <div key={index}>
                            <div className="contact-blockTenders">
                              <div className="website-detailsTenders">
                                <a
                                  style={{ color: "grey" }}
                                  href={x.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <h5>
                                    <CheckSource />
                                  </h5>
                                </a>
                                <CheckLocation />
                                <a
                                  href={x.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: "grey" }}
                                >
                                  <span className="Job_TitleTenders">
                                    {x.title}
                                  </span>
                                </a>
                              </div>
                              <div className="saved-itemsTenders">
                                <ReactStars
                                  count={1}
                                  onChange={ratingChanged}
                                  size={24}
                                  color2={"#ffd700"}
                                />
                              </div>
                            </div>
                          </div>
                        </Router>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default TenderDisplay;
