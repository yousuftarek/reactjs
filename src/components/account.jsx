import React, { Component } from "react";

import { createStore } from "redux";
import { Link, Redirect} from "react-router-dom";
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



class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transection_id: null,
      name: this.props.user.name,
      email: this.props.user.email,
      phone: this.props.user.phone_no,

    };
    window.scrollTo(0, 0);
  }

  
  checkAuth = () => {
    if (Object.keys(this.props.token).length <= 0) {
      return <Redirect to="/" />;
    }
  };


  render() {
    return (
      <React.Fragment>
          {this.checkAuth()}
          <div class="container">
          <div class="row m-0 pb-2">
          <p class="mr-2 mb-3" style={{fontSize: 24,}}>Personal Information</p>
          <button class="btn btn-primary">Edit</button>
          </div>
          <div class="card col-md-6">
          <div class="form-group m-4 ">
                <label for="name">Name</label>
                <input disabled type="name" class="form-control" id="name" value={this.state.name} placeholder="name"/>
            </div>
            <div class="form-group m-4">
                <label for="email">Email</label>
                <input disabled type="email" class="form-control" id="email" value={this.state.email} placeholder="email"/>
            </div>
            <div class="form-group m-4">
                <label for="phone">Phone number</label>
                <input disabled type="text" class="form-control" id="phone" value={this.state.phone} placeholder="phone"/>
            </div>
          </div>
          </div>
      </React.Fragment>
    );
  }
}



const mapStateToProps = state => ({
  token: state.auth.token,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  null
)(Account);
