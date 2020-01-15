import React, { Component } from "react";
import { Link } from "react-router-dom";
import { createStore } from "redux";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBook, addtoCart, fetchReviews} from "../actions/bookActions";
import * as helper from "./../helper";

import FontAwesome from "react-fontawesome";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false
    };
  }

  
  
  render() {
    return (
      <React.Fragment>
        <BrowserView>
          <div
            class="cr-item mt-5 pt-2"
            style={{
              boxShadow: this.state.mouseOver
                ? "inset 0 0 7px 0 #cdcdcd"
                : "none"
            }}
            onMouseOver={() => {
              this.setState({ mouseOver: true });
            }}
            onMouseOut={() => {
              this.setState({ mouseOver: false });
            }}
            onClick={() => {
              this.props.fetchBook(
                helper.prefix + "book/singlebook/" + this.props.id
              );
              this.props.fetchReviews( helper.prefix + "book/reviews/" + this.props.id)
              console.log("fecth book id = ",this.props.id)
              this.props.history.push(`/product`);
            }}
          >
            <div>
              <div style={{position: 'relative', left: 16, top: 16}}>
              <img class="discount_badge" src="images/badges/discount.png" style={{top: 0, opacity: this.state.mouseOver ? 0.3 : 1 }}/>
              <p style={{position: 'relative',right: 55,top: 5}}>{this.props.discount}%</p>
              </div>
              <button
                type="button"
                class="btn btn-warning ml-2"
                style={{ zIndex: 1, position: "absolute", top: 112, color: 'white', display: this.state.mouseOver?'block':'none'}}
                onClick={e => {
                  e.stopPropagation();
                  this.props.addtoCart(this.props.cart_book);
                }}
              >
                <FontAwesome
                  name="fas fa-shopping-cart"
                  style={{ color: "white", marginRight: 10}}
                />
                Add to Cart
              </button>
              <img class="read_some" src="images/badges/read_some.png" style={{ opacity: this.state.mouseOver ? 0.3 : 1 }}/>
              <img class="m-item-img ml-auto mr-auto" src={this.props.image == null ? "images/books/dummy.png" : this.props.image} style={{ opacity: this.state.mouseOver ? 0.3 : 1 }}/>
            </div>
            <img class="topbanner"
                        src="images/top/self.png"
                        alt="Gronthik"
                        id="banner"
                      />
            <div style={{overflow: 'hidden'}}>
              <p style={{ color: "black", marginTop: 10, opacity: this.state.mouseOver ? 0.3 : 1}}>{this.props.name}</p>
              <p style={{ color: "black" , opacity: this.state.mouseOver ? 0.3 : 1}}>{this.props.writer}</p>
              <p style={{ color: "black" , opacity: this.state.mouseOver ? 0.3 : 1}}>মূল্য : {helper.getNewPrice(this.props.price, this.props.discount)}</p>
            </div>
            <Link to="/product">
            <button type="button" class="btn btn-primary mt-2" style={{width: '100%', display: this.state.mouseOver?'inline':'none'}}>View Details</button>
            </Link>
          </div>
        </BrowserView>
        <MobileView>
          <div class="cr-item-mb" onClick={() => {
              this.props.fetchBook(
                helper.prefix + "book/singlebook/" + this.props.id
              );
              this.props.fetchReviews( helper.prefix + "book/reviews/" + this.props.id)
              console.log("fecth book id = ",this.props.id)
              this.props.history.push(`/product`);
            }}>
            <div>
              <div>
                <img class="discount_badge" src="images/badges/discount.png" />
                <p class="mobile-discount">{this.props.discount}%</p>
              </div>
              <img class="read_some_mb" src="images/badges/read_some.png" />
              <img class="m-item-img ml-auto mr-auto" src={this.props.image == null ? "images/books/dummy.png" : this.props.image} />
            </div>
            <img class="topbanner"
                        src="images/top/self.png"
                        alt="Gronthik"
                        id="banner"
                      />
            <div style={{overflow: 'hidden'}}>
              <p style={{ color: "black", marginTop: 10 }}>{this.props.name}</p>
              <p style={{ color: "black" }}>{this.props.writer}</p>
              <p style={{ color: "black" }}>মূল্য : {this.props.price}</p>
            </div>
            <button
                type="button"
                class="btn btn-outline-warning"
                style={{ zIndex: 1, color: '#FFC107', fontSize: 12}}
                onClick={e => {
                  e.stopPropagation();
                  this.props.addtoCart(this.props.cart_book);
                }}
              >
                <FontAwesome
                  name="fas fa-shopping-cart"
                  style={{ color: "#FFC107", marginRight: 10}}
                />
                Add to Cart
              </button>
          </div>
        </MobileView>
      </React.Fragment>
    );
  }
}

Product.propTypes = {
  fetchBook: PropTypes.func.isRequired,
  addtoCart: PropTypes.func.isRequired,
  fetchReviews: PropTypes.func.isRequired
};

export default connect(
  null,
  { fetchBook, addtoCart, fetchReviews}
)(Product);

