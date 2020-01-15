import React, { Component } from "react";

import { createStore } from "redux";
import { Link, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateCartQuantity, deleteFromCart, fetchBook} from "../actions/bookActions";
import * as helper from "./../helper";
import FontAwesome from "react-fontawesome";

Array.prototype.sum = function(prop, quantity) {
    var total = 0;
    for (var i = 0, _len = this.length; i < _len; i++) {
      total += parseInt(this[i][prop]) * parseInt(this[i][quantity]);
    }
    return total;
  };

class Shopingcart extends Component {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
  }

gotoShipping = () =>{
    if(this.props.cart.length > 0){
        return(
            <Link style={{background: '#FFC107', color: 'white'}} to={"shipping"}>Go to Shipping Page</Link>
        )
    }
}

checkCart = () => {
  if (this.props.cart.length < 1) {
    return <Redirect to="/" />;
  }
};

  render() {
    return (
      <React.Fragment>
        {this.checkCart()}
        <div class="cart-main-area section-padding--lg bg--white">
          <div class="container">
            <div class="row">
              <div class="col-md-12 col-sm-12 ol-lg-12">
                <form action="#">
                  <div class="table-content wnro__table table-responsive">
                    <table>
                      <thead>
                        <tr class="title-top">
                          <th class="product-thumbnail">Image</th>
                          <th class="product-name">Product</th>
                          <th class="product-price">Price</th>
                          <th class="product-quantity">Quantity</th>
                          <th class="product-subtotal">Total</th>
                          <th class="product-remove">Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.cart.map((book, index) => {
                          return (
                            <tr>
                              <td class="product-thumbnail">
                                <Link to={"product"}
                                onClick={() => 
                                    this.props.fetchBook(helper.prefix + "book/singlebook/" + book.id)
                                }
                                >
                                  
                                    <img
                                      style={{ height: 100, width: 70 }}
                                      src={book.cover == null ? "images/books/dummy.png" : book.cover}
                                    />
                              
                                </Link>
                              </td>
                              <td class="product-name">
                                <Link to={"product"} onClick={() => 
                                    this.props.fetchBook(helper.prefix + "book/singlebook/" + book.id)
                                }>{book.title}</Link>
                              </td>
                              <td class="product-price">
                                <span class="amount">Tk.{book.new_price}</span>
                              </td>
                              <td class="product-quantity">
                              <span
                              class="cart-arrow mr-2"
                                  onClick={() => {
                                    this.props.updateCartQuantity(
                                      book.id,
                                      parseInt(book.quantity) - parseInt(1)
                                    );
                                  }}
                                  style={{fontWeight: 'bold', fontSize: 25}}
                                >
                                 -
                                </span>
                                <input disabled class="cart-qInput" type="number" value={book.quantity} />
                                <span
                                  class="cart-arrow ml-2 mr-2"
                                  onClick={() => {
                                    this.props.updateCartQuantity(
                                      book.id,
                                      parseInt(book.quantity) + parseInt(1)
                                    );
                                  }}
                                  style={{fontWeight: 'bold', fontSize: 25}}
                                >
                                 +
                                </span>
                               
                              </td>
                              <td class="product-subtotal">
                                Tk.
                                {parseInt(book.new_price) *
                                  parseInt(book.quantity)}
                              </td>
                              <td class="product-remove">
                                <Link
                                  to={"#"}
                                  onClick={() => {
                                    this.props.deleteFromCart(index);
                                  }}
                                >
                                  X
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </form>
                <div class="cartbox__btn">
                  <ul class="cart__btn__list d-flex flex-wrap flex-md-nowrap flex-lg-nowrap justify-content-end">
                    {/* <li>
                      <Link to={"#"}>Coupon Code</Link>
                    </li>
                    <li>
                      <Link to={"#"}>Apply Code</Link>
                    </li>
                    <li>
                      <Link style={{background: '#138496', color: 'white'}} to={"#"}>Order as a gift</Link>
                    </li> */}
                    <li>
                      {this.gotoShipping()}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6 offset-lg-6">
                <div class="cartbox__total__area">
                  <div class="cartbox-total d-flex justify-content-between">
                    <ul class="cart__total__list">
                      <li>Cart total</li>
                      <li>Sub Total</li>
                    </ul>
                    <ul class="cart__total__tk">
                      <li>Tk.{parseFloat(this.props.cart.sum("new_price", "quantity")).toFixed(2)}</li>
                      <li>Tk.{parseFloat(this.props.cart.sum("new_price", "quantity")).toFixed(2)}</li>
                    </ul>
                  </div>
                  <div class="cart__total__amount">
                    <span>Grand Total</span>
                    <span>Tk.{parseFloat(this.props.cart.sum("new_price", "quantity")).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Shopingcart.propTypes = {
  updateCartQuantity: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  fetchBook: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cart: state.books.cart
});

export default connect(
  mapStateToProps,
  { updateCartQuantity, deleteFromCart, fetchBook }
)(Shopingcart);
