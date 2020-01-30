import React, { Component } from "react";
import {
  Link,
} from "react-router-dom";
import { isTemplateElement } from "@babel/types";

class Productex extends Component {
   constructor(props){
       super(props);
   }
  
  render() {
    return (
      <div class="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
      <div class="product__thumb">
        <Link class="first__img" to={"product"} style={{height: 350}}>
          <img src={this.props.image} alt="product image" />
        </Link>
        <Link class="second__img animation1" to={"product"} style={{height: 350}}>
          <img src={this.props.scndimage} alt="product image" />
        </Link>
        <div class="hot__box">
          <span class="hot-label">{this.props.tag}</span>
        </div>
      </div>
      <div class="product__content content--center">
        <h4>
          <Link to={"product"}>{this.props.name}</Link>
        </h4>
        <ul class="prize d-flex">
          <li>{this.props.price} Tk.</li>
          <li class="old_prize">{this.props.oldprice} Tk.</li>
        </ul>
        <div class="action">
          <div class="actions_inner">
            <ul class="add_to_links">
              <li>
                <Link class="cart" to={"cart.html"}>
                  <i class="bi bi-shopping-bag4" />
                </Link>
              </li>
              <li>
                <Link class="wishlist" to={"wishlist.html"}>
                  <i class="bi bi-shopping-cart-full" />
                </Link>
              </li>
              <li>
                <Link class="compare" to={"#"}>
                  <i class="bi bi-heart-beat" />
                </Link>
              </li>
              <li>
                <Link
                  data-toggle="modal"
                  title="Quick View"
                  class="quickview modal-view detail-link"
                  to={"#productmodal"}
                >
                  <i class="bi bi-search" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div class="product__hover--content">
          <ul class="rating d-flex">
            <li class="on">
              <i class="fa fa-star-o" />
            </li>
            <li class="on">
              <i class="fa fa-star-o" />
            </li>
            <li class="on">
              <i class="fa fa-star-o" />
            </li>
            <li>
              <i class="fa fa-star-o" />
            </li>
            <li>
              <i class="fa fa-star-o" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    );
  }
}

export default Productex;