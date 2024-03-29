import React, { Component } from "react";

class CombinedSocial extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  loadData() {
    fetch("example.comhttp://127.0.0.1:8000/api/orders/unsigned")
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data });
      })
      .catch(err => console.error(this.props.url, err.toString()));
  }

  signOrder(id) {
    let ids = [{ orderId: id }];
    console.log(ids);
    fetch("example.comhttp://127.0.0.1:8000/api/orders/unsigned", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ids)
    });
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <ul>
        <li className="title">
          <span>Sales Order</span>
          <span>Dealer Name</span>
          <span>Product</span>
          <span>Signature</span>
        </li>
        {this.state.data.map((item, i) => {
          let statusClass = "sign";
          if (item.signStatus === "Out for signature")
            statusClass += " sign-complete";
          let boundClick = this.signOrder.bind(this, i);
          return (
            <li className="item">
              <span>{item.orderID}</span>
              <span>{item.dealerName}</span>
              <span>{item.model}</span>
              <span>
                <span
                  className={statusClass}
                  onClick={() => this.signOrder(item.orderID)}
                >
                  {item.signStatus}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default CombinedSocial;
