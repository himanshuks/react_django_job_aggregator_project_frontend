import React, { Component } from "react";

export default class ToggleSwitch extends Component {
  render() {
    return (
      <div>
        <h3>Gategory</h3>
        <br />
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        &nbsp;&nbsp;&nbsp;Graphic Design
        <br />
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        &nbsp;&nbsp;&nbsp;Logo Design
        <br />
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        &nbsp;&nbsp;&nbsp;Illustrations
        <h3>Value Range</h3>
        <br />
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        &nbsp;&nbsp;&nbsp;High
        <br />
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        &nbsp;&nbsp;&nbsp;Medium
        <br />
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        &nbsp;&nbsp;&nbsp;Low
      </div>
    );
  }
}
