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

Array.prototype.sum = function(prop, quantity) {
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
    if (this.state.payment == "bkash") {
      return (
        <React.Fragment>
          <div class="alert alert-primary" role="alert">
            Please bkash your payment to <span style={{color: 'red', fontSize: 20}}>01616313957</span> and enter your transection id bellow to proceed 
          </div>
          <div class="form-group">
            <label for="name">Transection ID</label>
            <input
              type="text"
              class="form-control"
              placeholder="transection ID"
              required
              onChange={(e) => this.setState({transection_id: e.target.value})}
            />
          </div>
        </React.Fragment>
      );
    }
  };

  report = (response) =>{
      if(response.success === true){
        alert('Order successfull')
        this.props.history.push(`/`);
        this.props.emptyCart()
      }else{
        this.setState({error: 'Something wrong'})
      }
  }

  orderBooks = () =>{
    if (this.props.cart.length > 0){
       if(this.state.name != null && this.state.phone != null  && this.state.address != null){
        this.props.cart.map((book, index) =>{
            var url = helper.prefix + 'order';
            var data = {
                book_id: book.id,
                name: this.state.name,
                payment_method: this.state.payment != null ? this.state.payment: "cash on delivery",
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
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer '+this.props.token,
            }
            }).then(res => res.json())
            .then(response => this.report(response))
            .catch(error => console.error('Error:', error));
        })
       }else{
           this.setState({error: 'please input all field'})
       }
    }else{
        this.setState({error: 'please add book to cart for shhoping'})
    }
  }

  errors = () =>{
    if(this.state.error != null){
        return(
            <span style={{color: 'red'}}>
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
                          onChange={(e) => this.setState({name: e.target.value})}
                          required
                        />
                      </div>

                      <div class="form-group ">
                        <label>Phone number</label>
                        <input
                          type="tel"
                          class="form-control cart-qInput"
                          placeholder="phone number"
                          value={this.state.phone}
                          onChange={(e) => this.setState({phone: e.target.value})}
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="location">Select location</label>
                        <select class="form-control" id="location" onChange={(e) => this.setState({location: e.target.value})}>
                        <option selected="selected" disabled="disabled" value="">Select City</option>
                                   
                                  <optgroup label="Dhaka Division">
                                        <option value="1" data-lang-eng="Dhaka">ঢাকা</option>
                                        <option value="2" data-lang-eng="Narsingdi">নরসিংদী </option>
                                        <option value="3" data-lang-eng="Gazipur">গাজীপুর</option>
                                        <option value="4" data-lang-eng="Tangail">টাঙ্গাইল</option>
                                        <option value="5" data-lang-eng="Kishoreganj">কিশোরগঞ্জ</option>
                                        <option value="6" data-lang-eng="Gopalganj">গোপালগঞ্জ </option>
                                        <option value="7" data-lang-eng="Munshiganj">মুন্সিগঞ্জ</option>
                                        <option value="8" data-lang-eng="Shariatpur">শরিয়তপুর</option>
                                        <option value="9" data-lang-eng="Narayanganj">নারায়ণগঞ্জ</option>
                                        <option value="10" data-lang-eng="Manikganj">মানিকগঞ্জ</option>
                                        <option value="11" data-lang-eng="Madaripur">মাদারীপুর</option>
                                        <option value="12" data-lang-eng="Rajbari">রাজবাড়ী</option>
                                        <option value="13" data-lang-eng="Faridpur">ফরিদপুর</option>
                                  </optgroup>
                                  <optgroup label="Chittagong Division" >
                                        <option value="14" data-lang-eng="Chittagong">চট্টগ্রাম</option>
                                        <option value="15" data-lang-eng="Cox's Bazar">কক্সবাজার</option>
                                        <option value="16" data-lang-eng="Khagrachari">খাগড়াছড়ি</option>
                                        <option value="17" data-lang-eng="Chandpur">চাঁদপুর</option>
                                        <option value="18" data-lang-eng="Feni">ফেনী</option>
                                        <option value="19" data-lang-eng="Rangamati">রাঙ্গামাটি </option>
                                        <option value="20" data-lang-eng="Lakshmipur">লক্ষ্মীপুর</option>
                                        <option value="21" data-lang-eng="Noakhali">নোয়াখালী</option>
                                        <option value="22" data-lang-eng="Comilla">কুমিল্লা</option>
                                        <option value="23" data-lang-eng="Bandarban">বান্দরবান</option>
                                        <option value="24" data-lang-eng="Brahmanbaria">ব্রাহ্মণবাড়িয়া</option>
                                  </optgroup>
                                  <optgroup label="Rajshahi Division">
                                        <option value="25" data-lang-eng="Rajshahi">রাজশাহী</option>
                                        <option value="26" data-lang-eng="Pabna">পাবনা</option>
                                        <option value="27" data-lang-eng="Bogra">বগুড়া</option>
                                        <option value="28" data-lang-eng="Natore">নাটোর</option>
                                        <option value="29" data-lang-eng="Chapai Nawabganj">চাঁপাইনবাবগঞ্জ</option>
                                        <option value="30" data-lang-eng="Joypurhat">জয়পুরহাট</option>
                                        <option value="31" data-lang-eng="Naogaon">নওগাঁ</option>
                                        <option value="32" data-lang-eng="Sirajgonj">সিরাজগঞ্জ</option>
                                  </optgroup>
                                  <optgroup label="Khulna Division">
                                         <option value="33" data-lang-eng="Khulna">খুলনা</option>
                                         <option value="34" data-lang-eng="Kushtia">কুষ্টিয়া</option>
                                         <option value="35" data-lang-eng="Bagerhat">বাগেরহাট&nbsp;</option>
                                         <option value="36" data-lang-eng="Narail">নড়াইল</option>
                                         <option value="37" data-lang-eng="Jhenaidah">ঝিনাইদহ</option>
                                         <option value="38" data-lang-eng="Chuadanga">চুয়াডাঙ্গা </option>
                                         <option value="39" data-lang-eng="Jessore">যশোর</option>
                                         <option value="40" data-lang-eng="Satkhira">সাতক্ষীরা</option>
                                         <option value="41" data-lang-eng="Magura">মাগুরা</option>
                                         <option value="42" data-lang-eng="Meherpur">মেহেরপুর</option>
                                  </optgroup>
                                  <optgroup label="Barisal Division">
                                          <option value="43" data-lang-eng="Barisal">বরিশাল</option>
                                          <option value="44" data-lang-eng="Patuakhali">পটুয়াখালী</option>
                                          <option value="45" data-lang-eng="Pirojpur">পিরোজপুর</option>
                                          <option value="46" data-lang-eng="Barguna">বরগুনা</option>
                                          <option value="47" data-lang-eng="Bhola">ভোলা</option>
                                          <option value="48" data-lang-eng="Jhalokati">ঝালকাঠি</option>
                                  </optgroup>
                                  <optgroup label="Sylhet Division">
                                        <option value="49" data-lang-eng="Sylhet">সিলেট</option>
                                        <option value="50" data-lang-eng="Maulvibazar">মৌলভী বাজার </option>
                                        <option value="51" data-lang-eng="Sunamganj">সুনামগঞ্জ </option>
                                        <option value="52" data-lang-eng="Habiganj">হবিগঞ্জ</option>
                                  </optgroup>
                                  <optgroup label="Rangpur Division">
                                        <option value="53" data-lang-eng="Rangpur">রংপুর</option>
                                        <option value="54" data-lang-eng="Kurigram">কুড়িঁগ্রাম</option>
                                        <option value="55" data-lang-eng="Gaibandha">গাইবান্ধা </option>
                                        <option value="56" data-lang-eng="Thakurgaon">ঠাকুরগাঁও </option>
                                        <option value="57" data-lang-eng="Dinajpur">দিনাজপুর</option>
                                        <option value="58" data-lang-eng="Nilphamari">নীলফামারী</option>
                                        <option value="59" data-lang-eng="Panchagarh">পঞ্চগড়</option>
                                        <option value="60" data-lang-eng="Lalmonirhat">লালমনিরহাট</option>
                                  </optgroup>
                                  <optgroup label="Mymensingh Division">
                                        <option value="61" data-lang-eng="Mymensingh">ময়মনসিংহ</option>
                                        <option value="62" data-lang-eng="Netrokona">নেত্রকোনা</option>
                                        <option value="63" data-lang-eng="Jamalpur">জামালপুর </option>
                                        <option value="64" data-lang-eng="Sherpur">শেরপুর</option>
                                  </optgroup> 
                                            
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="address">Address</label>
                        <textarea
                          class="form-control"
                          id="address"
                          rows="3"
                          required
                          onChange={(e) => this.setState({address: e.target.value})}
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
                          <option value="bkash">bkash</option>
                          <option value="cash on delivery">
                            Cash on delivery
                          </option>
                        </select>
                      </div>
                      {this.transectionInput()}
                      {this.errors()}
                      <div className="d-flex justify-content-end">
                        <button  class="btn btn-warning"
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
  { updateCartQuantity, deleteFromCart, fetchBook, emptyCart}
)(Shipping);
