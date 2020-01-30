import React, { Component } from "react";

import { createStore } from "redux";
import { Link } from "react-router-dom";
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

Array.prototype.sum = function (prop, quantity) {
  var total = 0;
  for (var i = 0, _len = this.length; i < _len; i++) {
    total += parseInt(this[i][prop]) * parseInt(this[i][quantity]);
  }
  return total;
};

class Shipping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: null,
      name: this.props.user.name ? this.props.user.name : null,
      phone: this.props.user.phone_no ? this.props.user.phone_no : null,
      location: null,
      address: null,
      error: null,
      transection_id: null
    };
    window.scrollTo(0, 0);
  }

  transectionInput = () => {
    if (this.state.payment === "bkash") {
      return (
        <React.Fragment>
          <div class="alert alert-primary" role="alert">
            Please bkash your payment to <span style={{ color: 'red', fontSize: 20 }}>01616313957</span> and enter your transection id bellow to proceed
          </div>
          <div class="form-group">
            <label for="name">Transection ID</label>
            <input
              type="text"
              class="form-control"
              placeholder="transection ID"
              required
              onChange={(e) => this.setState({ transection_id: e.target.value })}
            />
          </div>
        </React.Fragment>
      );
    }
  };

  report = (response) => {
    if (response.success === true) {
      alert('Order successfull')
      this.props.history.push(`/`);
      this.props.emptyCart()
    } else {
      this.setState({ error: 'Something wrong' })
    }
  }

  orderBooks = () => {
    if (this.props.cart.length > 0) {
      if (this.state.name != null && this.state.phone != null && this.state.address != null) {
        this.props.cart.map((book, index) => {
          var url = helper.prefix + 'order';
          var data = {
            book_id: book.id,
            name: this.state.name,
            payment_method: this.state.payment != null ? this.state.payment : "cash on delivery",
            quantity: book.quantity,
            phone_number: this.state.phone,
            shiping_address: this.state.address,
            order_type: 0,
            location: this.state.location ? this.state.location : 'Dhaka',
            total_price: parseInt(helper.getNewPrice(book.new_price, book.discount)) * parseInt(book.quantity),
            user_id: this.props.user.id ? this.props.user.id : null,
            transection_id: this.state.transection_id ? this.state.transection_id : 'null'
          };

          fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + this.props.token,
            }
          }).then(res => res.json())
            .then(response => this.report(response))
            .catch(error => console.error('Error:', error));
        })
      } else {
        this.setState({ error: 'please input all field' })
      }
    } else {
      this.setState({ error: 'please add book to cart for shhoping' })
    }
  }

  errors = () => {
    if (this.state.error != null) {
      return (
        <span style={{ color: 'red' }}>
          {this.state.error}
        </span>
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        <div id="shipping-page">
          <div class="container">
            <div id="shipping-content-wrapper">
              <div class="row">
                <div class="col-md-6">
                  <section class="checkout-header">
                    <h1 style={{ fontWeight: "normal" }}>Shipping Address</h1>
                  </section>

                  <section id="address-form">
                    <h1 style={{ fontWeight: "normal" }}>
                      Fill out your information
                    </h1>

                    <div class="form-group">
                      <label for="name">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                        required
                      />
                    </div>

                    <div class="form-group ">
                      <label>Phone number</label>
                      <input
                        type="number"
                        class="form-control cart-qInput"
                        placeholder="phone number"
                        value={this.state.phone}
                        onChange={(e) => this.setState({ phone: e.target.value })}
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="location">Select location</label>
                      <select class="form-control" id="location" onChange={(e) => this.setState({ location: e.target.value })}>
                        <option value="dhaka">Dhaka</option>
                        <option value="chittagong">Chittagong</option>
                        <option value="rajshahi">Rajshahi</option>
                        <option value="khulna">Khulna</option>
                        <option value="barisal">Barisal</option>
                        <option value="rangpur">Rangpur</option>
                        <option value="sylhet">Sylhet</option>
                        <option value="sylhet">Mymensingh</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="address">Address</label>
                      <textarea
                        class="form-control"
                        id="address"
                        rows="3"
                        required
                        onChange={(e) => this.setState({ address: e.target.value })}
                      >{this.state.address}</textarea>
                    </div>
                    <div class="form-group">
                      <label for="location">Select payment method</label>
                      <select
                        class="form-control"
                        id="location"
                        onChange={e =>
                          this.setState({ payment: e.target.value })
                        }
                      >

                        {
                          this.state.location === 'dhaka' || this.state.location === null ?
                            
                            <option value="cash on delivery">
                              Cash on delivery
                          </option>
                          : null
                        }
                        <option value="bkash">bkash</option>
                      </select>
                    </div>
                    {this.transectionInput()}
                    {this.errors()}
                    <div className="d-flex justify-content-end">
                      <button class="btn btn-warning"
                        onClick={() => this.orderBooks()}
                      >
                        Confirm order
                        </button>
                    </div>
                  </section>
                </div>

                <div class="col-md-4">
                  <section id="checkout-sidebar">
                    <div class="checkout-sidebar__header">
                      <h1 style={{ fontWeight: "normal" }}>Checkout Summary</h1>
                    </div>

                    <div class="checkout-sidebar__content">
                      <div class="d-none">
                        <div class="input-group mb-3">
                          <input
                            type="text"
                            name="searchdata"
                            class="form-control"
                            placeholder="Email or Phone or Order Id"
                            id="searchdata"
                          />
                          <div class="input-group-append">
                            <button
                              class="btn btn-secondary"
                              name="searchinfo"
                              id="searchinfo"
                              type="button"
                            >
                              Search
                            </button>
                          </div>
                        </div>
                        <button
                          id="clearall"
                          name="clearall"
                          class="btn btn-outline-secondary"
                          type="button"
                        >
                          <i class="ion-close-round mr-2"></i> Clear
                        </button>
                      </div>
                      <div class="payment-breakdown">
                        <h2 style={{ fontWeight: "normal" }}>
                          Payment Details
                        </h2>
                        <div class="payment-breakdown__content">
                          <table class="table">
                            <tbody>
                              <tr>
                                <td>Subtotal</td>
                                <td class="text-right" id="subtotal">
                                  {parseFloat(this.props.cart.sum("new_price", "quantity")).toFixed(2)} TK.
                                </td>
                              </tr>

                              <tr>
                                <td id="shippingText">Shipping</td>

                                <td class="text-right" id="shipping">
                                  00 TK.
                                </td>
                              </tr>
                              <tr>
                                <td>Total</td>
                                <td class="text-right" id="total">
                                  {parseFloat(this.props.cart.sum("new_price", "quantity")).toFixed(2)} TK.
                                </td>
                              </tr>

                              <tr>
                                <td>Payable Total</td>
                                <td class="text-right" id="payable">
                                  {parseFloat(this.props.cart.sum("new_price", "quantity")).toFixed(2)} TK.
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Shipping.propTypes = {
  updateCartQuantity: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  fetchBook: PropTypes.func.isRequired,
  emptyCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cart: state.books.cart,
  user: state.auth.user,
  token: state.auth.token
});

export default connect(
  mapStateToProps,
  { updateCartQuantity, deleteFromCart, fetchBook, emptyCart }
)(Shipping);
