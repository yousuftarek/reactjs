import React, { Component } from "react";

import { createStore } from "redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateCartQuantity,
  deleteFromCart,
  fetchBook,
  emptyCart
} from "../actions/bookActions";
import * as helper from "./../helper";
import FontAwesome from "react-fontawesome";
import { parse } from "@babel/core";

Array.prototype.sum = function(prop, quantity) {
  var total = 0;
  for (var i = 0, _len = this.length; i < _len; i++) {
    total += parseInt(this[i][prop]) * parseInt(this[i][quantity]);
  }
  return total;
};

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transection_id: null,
      orders: null
    };
    window.scrollTo(0, 0);
    this.fetchOrders()
  }

  checkAuth = () => {
    if (Object.keys(this.props.token).length <= 0) {
      return <Redirect to="/" />;
    }
  };

  handleFetch = response => {
    console.log("fuuuuuuuuuuuuuck ", response);
    if (response.success) {
      this.setState({ orders: response.orders });
    }
  };

  fetchOrders = () => {
    console.log("asd a     ssss   ",this.props.token)
    var url = helper.prefix + "orders";

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(res => res.json())
      .then(response => this.handleFetch(response))
      .catch(error => console.error("Error:", error));
  };

  renderOrders = () => {
    if (this.state.orders != null) {
      return this.state.orders.map((order, index) => {
        return (
          <tr>
            <th scope="row">{order.id}</th>
            <td>
              <div>
                  <img
                    src={order.cover == null ? "images/books/dummy.png" : order.cover}
                    style={{ width: 100, height: 130 }}
                  />
                <p style={{ fontSize: 16 }}>{order.book_name}</p>
              </div>
            </td>
            <td>{order.quantity}</td>
            <td>{order.total_price}</td>
            <td>
              <p
                style={{ fontSize: 16 }}
                class={
                  order.is_seen_by_admin == 0 ? "text-danger" : "text-success"
                }
              >
                {order.is_seen_by_admin == 0 ? "Not seen yet" : "Seen by admin"}
              </p>
            </td>
            <td>
              <p
                style={{ fontSize: 16 }}
                class={order.is_completed == 0 ? "text-danger" : "text-success"}
              >
                {order.is_completed == 0 ? "Not delivered yet" : "Delivered"}
              </p>
            </td>
          </tr>
        );
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.checkAuth()}
        <div class="container">
          <p class="m-2 mb-3" style={{ fontSize: 30 }}>
            Orders
          </p>
          <div class="card">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">order id</th>
                    <th scope="col">Book name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total cost</th>
                    <th scope="col">Is seen by admin</th>
                    <th scope="col">Delivery status</th>
                  </tr>
                </thead>
                <tbody>{this.renderOrders()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Orders.propTypes = {};

const mapStateToProps = state => ({
  token: state.auth.token,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  null
)(Orders);
