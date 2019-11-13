import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { GoLocation } from "react-icons/go";
import ReactStars from "react-stars";
import Pagination from "react-js-pagination";
// import { initialState } from "../reducers/authReducer";
import PageTitle from "./PageTitle";

const ratingChanged = newRating => {
  console.log(newRating);
};
class ContractDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      dataSourceLoc: [],
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
      isBookLoaded: false,
      isPageSelected: false,
      contractsData: [],
      recordsperpage: 20
    };

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/v1/contracts/")
      .then(res => res.json())
      .then(json => {
        this.setState({
          totalRecords: json.count,
          contractsData: json.results
        });
      })
      .catch(error => console.log(error));

    fetch("http://127.0.0.1:8000/api/v1/contract_locations/")
      .then(res => res.json())
      .then(json => {
        this.setState({
          locations: json
        });
      })
      .catch(error => console.log(error));

    fetch("http://127.0.0.1:8000/api/v1/bookmarked_contracts/")
      .then(res => res.json())
      .then(json => {
        this.setState({
          bookmarks: json
        });
      })
      .catch(error => console.log(error));
  }

  handleLocationChange(event) {
    console.log("Selected location ID is " + event.target.value);
    fetch(
      "http://127.0.0.1:8000/api/v1/contracts/?location=" + event.target.value
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
    fetch("http://127.0.0.1:8000/api/v1/contracts/?page=" + pageNumber)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isPageSelected: true,
          totalRecords: json.count,
          contractsData: json.results,
          nextpage: json.next,
          previouspage: json.previous,
          currentPage: pageNumber
        });
      });
  }

  render() {
    var { isLocLoaded, locations, dataSourceLoc } = this.state;

    if (!isLocLoaded) {
      return (
        <React.Fragment>
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
                      Design Contracts&emsp;{" "}
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
                  {/* <div className="saved3">
                    <button type="button" class="btn btn-success pull-right">
                      {" "}
                      <span className="SavedContracts">
                        Saved Contracts
                      </span>
                    </button>
                    &emsp;&emsp;&emsp;
                  </div> */}
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
                    {this.state.contractsData.map((x, index) => {
                      function CheckLocation() {
                        if (x.location === null) return null;
                        else
                          return (
                            <h6>
                              <GoLocation /> {x.location.location_name}
                            </h6>
                          );
                      }
                      function CheckCompanyName() {
                        if (x.company === null) return null;
                        else return <b>{x.company.company_name}</b>;
                      }
                      function CheckSkills() {
                        if (x.skills.length === 0) return null;
                        else
                          return (
                            <h6 className="skillsborder">
                              Skills : {x.skills[0].skill_name}
                            </h6>
                          );
                      }
                      function CheckSourceLogo() {
                        if (x.source_logo_url === null)
                          return <span>Source logo not available</span>;
                        else
                          return (
                            <a
                              href={x.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={x.source_logo_url}
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
                                  href={x.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <h5>
                                    <span className="Job_Title">{x.title}</span>
                                  </h5>
                                </a>
                                <CheckLocation />
                                <h6>{x.truncated_description}</h6>
                                <h6>
                                  <CheckCompanyName />
                                </h6>
                                <h6> Salary : {x.salary}</h6>
                                <CheckSkills />
                              </div>
                              <div className="saved-items">
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
                <div className="Pagination">
                  <Pagination
                    activePage={this.state.currentPage}
                    itemsCountPerPage={25}
                    totalItemsCount={this.state.totalRecords}
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
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
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
                      Design Contracts &emsp;{" "}
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
                  {/* <div className="saved3">
                    <button type="button" class="btn btn-success pull-right" >
                      {" "}
                      <span className="SavedContracts">
                        Saved Contracts
                      </span>
                    </button>
                    &emsp;&emsp;&emsp;
                  </div> */}
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
                      function CheckLocation() {
                        if (x.location === null) return null;
                        else
                          return (
                            <h6>
                              <GoLocation /> {x.location.location_name}
                            </h6>
                          );
                      }
                      function CheckCompanyName() {
                        if (x.company === null) return null;
                        else return <b>{x.company.company_name}</b>;
                      }
                      function CheckSkills() {
                        if (x.skills.length === 0) return null;
                        else
                          return (
                            <h6 className="skillsborder">
                              Skills : {x.skills[0].skill_name}
                            </h6>
                          );
                      }
                      function CheckSourceLogo() {
                        if (x.source_logo_url === null)
                          return <span>Source logo not available</span>;
                        else
                          return (
                            <a
                              href={x.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={x.source_logo_url}
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
                              <div></div>
                              <div className="website-details">
                                <a
                                  href={x.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <h5>
                                    <span className="Job_Title">{x.title}</span>
                                  </h5>
                                </a>
                                <CheckLocation />
                                <h6>{x.truncated_description}</h6>
                                <h6>
                                  <CheckCompanyName />
                                </h6>
                                <h6> Salary : {x.salary}</h6>
                                <CheckSkills />
                              </div>
                              <div className="saved-items">
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
                <div></div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}
export default ContractDisplay;
