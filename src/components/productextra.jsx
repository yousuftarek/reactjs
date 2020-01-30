import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import { tsImportEqualsDeclaration } from "@babel/types";
import FontAwesome from "react-fontawesome";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBook, addtoCart, fetchReviews } from "../actions/bookActions";
import * as helper from "./../helper";

class ProductExtra extends Component {
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
            class="cr-item pt-4"
            style={{
              width: 205,
              // height: 440,
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
              this.props.fetchReviews(
                helper.prefix + "book/reviews/" + this.props.id
              );
              console.log("fecth book id = ", this.props.id);
<<<<<<< HEAD
              this.props.history.push(`/product/`+this.props.id);
=======
              this.props.history.push(`/product/` + this.props.id);
>>>>>>> 028a4f5cac5b776e5567ff287f8abb56d62a078d
            }}
          >
            <div>
              <p
                style={{
                  position: "relative",
                  color: "white",
                  top: 24,
                  right: 53,
                  zIndex: 10
                }}
              >
                {this.props.discount}%
              </p>
              <img
                style={{
                  opacity: this.state.mouseOver ? 0.3 : 1,
                  left: 29,
                  top: 43
                }}
                class="discount_badge"
                src="images/badges/discount.png"
              />
              <button
                type="button"
                class="btn btn-warning"
                style={{
                  zIndex: 1,
                  position: "absolute",
                  top: 112,
                  color: "white",
                  display: this.state.mouseOver ? "inline" : "none"
                }}
                onClick={e => {
                  e.stopPropagation();
                  this.props.addtoCart(this.props.cart_book);
                }}
              >
                <FontAwesome
                  name="fas fa-shopping-cart"
                  style={{ color: "white", marginRight: 10 }}
                />
                Add to Cart
              </button>
              <img
                class="read_some"
                src="images/badges/read_some.png"
                style={{
                  left: 68,
                  top: 136,
                  opacity: this.state.mouseOver ? 0.3 : 1
                }}
              />

              <img
                class="m-item-img ml-auto mr-auto"
<<<<<<< HEAD
                src={this.props.image == null ? "images/books/dummy.png" : this.props.image}
=======
                src={
                  this.props.image == null
                    ? "images/books/dummy.png"
                    : this.props.image
                }
>>>>>>> 028a4f5cac5b776e5567ff287f8abb56d62a078d
                style={{
                  width: 130,
                  height: 188,
                  opacity: this.state.mouseOver ? 0.3 : 1
                }}
              />
            </div>
            <div style={{ overflow: "hidden" }}>
              <p
                style={{
                  color: "black",
                  marginTop: 10,
                  opacity: this.state.mouseOver ? 0.3 : 1
                }}
              >
                {this.props.name}
              </p>
              <p
                style={{
                  color: "black",
                  opacity: this.state.mouseOver ? 0.3 : 1
                }}
              >
                {this.props.author ? this.props.author : null}
                {this.props.writer ? this.props.writer : null}
              </p>
              {this.props.stock > 0 ? (
                <p
                  class="text-success"
                  style={{ opacity: this.state.mouseOver ? 0.3 : 1 }}
                >
                  {this.props.stock > 0 ? "Product In Stock" : null}
                </p>
              ) : (
                ""
              )}
              <p
                style={{
                  color: "black",
                  opacity: this.state.mouseOver ? 0.3 : 1
                }}
              >
<<<<<<< HEAD
                মূল্য : {helper.getNewPrice(this.props.price, this.props.discount)} Tk.
              </p>
            </div>
            <Link style={{width: '100%', fontSize: 80, display: this.state.mouseOver ? "none" : "inline"}}>
            &nbsp;
=======
                মূল্য :{" "}
                {helper.getNewPrice(this.props.price, this.props.discount)} Tk.
              </p>
            </div>
            <Link
              style={{
                width: "100%",
                fontSize: 80,
                display: this.state.mouseOver ? "none" : "inline"
              }}
            >
              &nbsp;
>>>>>>> 028a4f5cac5b776e5567ff287f8abb56d62a078d
            </Link>
            <Link to="/product/:id">
              <button
                type="button"
                class="btn btn-primary mt-2"
                style={{
                  width: "100%",
                  display: this.state.mouseOver ? "inline" : "none"
                }}
              >
                View Details
              </button>
            </Link>
          </div>
        </BrowserView>
        <MobileView>
          <div
            class="cr-item-mb"
<<<<<<< HEAD
            onClick={() => this.props.history.push(`/product/`+this.props.id)}
=======
            onClick={() => this.props.history.push(`/product/` + this.props.id)}
>>>>>>> 028a4f5cac5b776e5567ff287f8abb56d62a078d
          >
            <div>
              <div>
                <img
                  class="discount_badge"
                  src="images/badges/discount.png"
                  style={{ left: 3 }}
                />
                <p class="mobile-discount">{this.props.discount}%</p>
              </div>
              <img class="read_some_mb" src="images/badges/read_some.png" />
<<<<<<< HEAD
              <img class="m-item-img ml-auto mr-auto" src={this.props.image == null ? "images/books/dummy.png" : this.props.image} />
=======
              <img
                class="m-item-img ml-auto mr-auto"
                src={
                  this.props.image == null
                    ? "images/books/dummy.png"
                    : this.props.image
                }
              />
>>>>>>> 028a4f5cac5b776e5567ff287f8abb56d62a078d
            </div>
            <div style={{ overflow: "hidden" }}>
              <p style={{ color: "black", marginTop: 10 }}>{this.props.name}</p>
              <p style={{ color: "black" }}>{this.props.writer}</p>
<<<<<<< HEAD
              <p style={{ color: "black" }}>মূল্য : {helper.getNewPrice(this.props.price, this.props.discount)}</p>
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
=======
              <p style={{ color: "black" }}>
                মূল্য :{" "}
                {helper.getNewPrice(this.props.price, this.props.discount)}
              </p>
            </div>
            <button
              type="button"
              class="btn btn-outline-warning"
              style={{ zIndex: 1, color: "#FFC107", fontSize: 12 }}
              onClick={e => {
                e.stopPropagation();
                this.props.addtoCart(this.props.cart_book);
              }}
            >
              <FontAwesome
                name="fas fa-shopping-cart"
                style={{ color: "#FFC107", marginRight: 10 }}
              />
              Add to Cart
            </button>
>>>>>>> 028a4f5cac5b776e5567ff287f8abb56d62a078d
          </div>
        </MobileView>
      </React.Fragment>
    );
  }
}

ProductExtra.propTypes = {
  fetchBook: PropTypes.func.isRequired,
  addtoCart: PropTypes.func.isRequired,
  fetchReviews: PropTypes.func.isRequired
};

<<<<<<< HEAD
export default connect(
  null,
  { fetchBook, addtoCart, fetchReviews }
)(ProductExtra);
=======
export default connect(null, { fetchBook, addtoCart, fetchReviews })(
  ProductExtra
);
>>>>>>> 028a4f5cac5b776e5567ff287f8abb56d62a078d
