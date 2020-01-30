import React, { Component } from "react";
import {
  Link,
} from "react-router-dom";

class ListBook extends Component {
   constructor(props){
       super(props);
   }
  
  render() {
    return (
        <div class="list__view mt--40">
        <div class="thumb">
          <Link class="first__img" to={"product"}>
            <img
              src={this.props.image}
              alt="product images"
              style={{height: '100%'}}
            />
          </Link>
          <Link class="second__img animation1" to={"product"}>
            <img
              src={this.props.image}
              alt="product images"
              style={{height: '100%'}}
            />
          </Link>
        </div>
        <div class="content">
          <h2>
            <Link to={"product"}>{this.props.name}</Link>
          </h2>
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
          <ul class="prize__box">
          <li>{this.props.price} Tk.</li>
          <li class="old__prize">{this.props.oldprice} Tk.</li>
          </ul>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Nam fringilla augue nec est tristique auctor.
            Donec non est at libero vulputate rutrum. Morbi ornare
            lectus quis justo gravida semper. Nulla tellus mi,
            vulputate adipiscing cursus eu, suscipit id nulla.
          </p>
          <ul class="cart__action d-flex">
            <li class="cart">
              <Link to={"cart.html"}>Add to cart</Link>
            </li>
            <li class="wishlist">
              <Link to={"cart.html" }/>
            </li>
            <li class="compare">
              <Link to={"cart.html" }/>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ListBook;