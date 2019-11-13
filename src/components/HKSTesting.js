import React, { Component } from "react";
import Pagination from "react-js-pagination";

class HKSTesting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isPageSelected: false,
      tendersdata: [],
      totalrecords: 0,
      currentPage: 1,
      recordsperpage: 20,
      nextpage: "",
      previouspage: "",
      pageNeighbours: 2
    };

    this.handleClick = this.handleClick.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleClick(event) {
    event.persist();
    fetch("http://127.0.0.1:8000/api/v1/tenders/?page=" + event.target.id)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isPageSelected: true,
          totalrecords: json.count,
          tendersdata: json.results,
          nextpage: json.next,
          previouspage: json.previous,
          currentPage: Number(event.target.id)
        });
      });

    console.log("Current page is " + event.target.id);
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/v1/tenders/")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          totalrecords: json.count,
          tendersdata: json.results,
          nextpage: json.next,
          previouspage: json.previous
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
          totalrecords: json.count,
          tendersdata: json.results,
          nextpage: json.next,
          previouspage: json.previous,
          currentPage: pageNumber
        });
      });
  }

  render() {
    return (
      <div>
        Tenders are here...
        {this.state.tendersdata.map((x, index) => {
          return (
            <div key={index}>
              <p>ID: {x.id}</p>
              <p>Title:{x.title}</p>
            </div>
          );
        })}
        <div>
          <Pagination
            activePage={this.state.currentPage}
            itemsCountPerPage={20}
            totalItemsCount={this.state.totalrecords}
            pageRangeDisplayed={10}
            onChange={this.handlePageChange}
            prevPageText="Prev"
            nextPageText="Next"
          />
        </div>
      </div>
    );
  }
}
export default HKSTesting;
