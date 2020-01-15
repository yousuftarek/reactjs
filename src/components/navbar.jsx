import React, { Component } from "react";
import loadjs from "loadjs";
import axios from "axios";

import {
  Link
  // NavLink,
  // Redirect,
  // Prompt
} from "react-router-dom";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchBooks,
  fetchBook,
  deleteFromCart,
  selectAuthor,
  selectPublisher,
  seeMore
} from "../actions/bookActions";
import { deleteToken } from "../actions/authActions";

import ReactTyped from "react-typed";
import FontAwesome from "react-fontawesome";
import * as helper from "./../helper";

Array.prototype.sum = function (prop, quantity) {
  var total = 0;
  for (var i = 0, _len = this.length; i < _len; i++) {
    total += parseInt(this[i][prop]) * parseInt(this[i][quantity]);
  }
  return total;
};

class navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logedIn: false,
      cart: false,
      setting: false,
      menuOpend: false,
      pmenuOpend: false,
      catclicked: false,
      mouseOverAuthor: false,
      mouseClickedAuthor: false,
      mouseOverPublisher: false,
      mouseClickedPublisher: false,
      authors: null,
      mAuthors: null,
      publishers: null,
      categories: null,
      mCategories: null,
      search: false,
      searchText: null,
      bookSuggestions: null,
      mAuthorclicked: false,
      mPublishers: null,
      mPublisherclicked: false,
      mouseOverCategory: false,
      mouseClickedCategory: false
    };
    this.fetch_authors();
    this.fetch_publishers();
    this.fetch_categories();
    console.log("Cart from state ", this.props.cart);
    console.log(" user ", this.props.user);
  }

  handleLogout = response => {
    alert(response.message);
    if (response.success) {
      this.props.deleteToken();
    }
  };

  logOut = () => {
    var url = helper.prefix + "logout";

    fetch(url, {
      method: "GET", // or 'PUT'
      // body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(res => res.json())
      .then(response => this.handleLogout(response))
      .catch(error => console.error("Error:", error));
  };
  logedIn = () => {
    if (Object.keys(this.props.token).length > 0) {
      return (
        <React.Fragment>
          <strong class="label switcher-label">
            <span>
              {" "}
              <Link to="myaccount">My Account</Link>
            </span>
          </strong>
          <span>
            <Link to="myorders">My orders</Link>
          </span>
          <span>
            <Link to="#">My Wishlist</Link>
          </span>
          <span>
            <Link onClick={() => this.logOut()}>Logout</Link>
          </span>
        </React.Fragment>
      );
    }
  };

  logIn = () => {
    if (Object.keys(this.props.token).length === 0) {
      return (
        <React.Fragment>
          <span>
            <Link to={"signin"}>Sign In</Link>
          </span>
          <span>
            <Link to={"signin"}>Create An Account</Link>
          </span>
        </React.Fragment>
      );
    }
  };

  sidebar = () => {
    return <div />;
  };

  cart = () => {
    if (
      this.state.cart === true &&
      this.props.cart != null &&
      this.props.cart.length > 0
    ) {
      return (
        <div class="block-minicart minicart__active is-visible ">
          <div class="minicart-content-wrapper">
            <div
              class="micart__close"
              onClick={() => this.setState({ cart: !this.state.cart })}
            >
              <span>close</span>
            </div>
            <div style={{ height: 380, overflowY: "scroll" }}>
              {this.props.cart.map((book, index) => {
                return (
                  <div class="single__items">
                    <div class="miniproduct">
                      <div class="item01 d-flex">
                        <div class="thumb">
                          <Link
                            to="/product"
                            onClick={() => {
                              this.props.fetchBook(
                                helper.prefix + "book/singlebook/" + book.id
                              );
                              this.props.selectAuthor(null);
                              this.props.selectPublisher(null);
                            }}
                          >
                            <img src={book.cover == null ? "images/books/dummy.png" : book.cover} />
                          </Link>
                        </div>
                        <div class="content">
                          <h6>
                            <Link
                              to="/product"
                              onClick={() => {
                                this.props.fetchBook(
                                  helper.prefix + "book/singlebook/" + book.id
                                );
                                this.props.selectAuthor(null);
                                this.props.selectPublisher(null);
                              }}
                            >
                              {book.title}
                            </Link>
                          </h6>
                          <span class="prize">{parseInt(book.old_price) *
                            parseInt(book.quantity)}Tk.</span>
                          <div class="product_prize d-flex justify-content-between">
                            <span class="qun">Qty: {book.quantity}</span>
                            <ul class="d-flex justify-content-end">
                              <li>
                                <span
                                  href="#"
                                  onClick={() => {
                                    this.props.deleteFromCart(index);
                                  }}
                                >
                                  <i class="zmdi zmdi-delete" />
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div class="items-total d-flex justify-content-between">
              <span>{this.props.cart.length} items</span>
              <span>Cart Subtotal</span>
            </div>
            <div class="total_amount text-right">
              <span>
                {parseFloat(
                  this.props.cart.sum("old_price", "quantity")
                ).toFixed(2)}{" "}
                Tk.
              </span>
            </div>
            <div class="mini_action checkout">
              <Link
                class="checkout__btn"
                to={"cart"}
                onClick={() => this.setState({ cart: !this.state.cart })}
              >
                Go to Checkout
              </Link>
            </div>
          </div>
        </div>
      );
    }
  };
  category = () => {
    return (
      <nav class="navbar navbar-expand-lg navbar-light nav-category">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#categoryNav"
          aria-controls="categoryNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div
          class="collapse navbar-collapse d-flex justify-content-center"
          id="categoryNav"
          style={{ borderTop: "1px solid #C67935" }}
        >
          <ul class="navbar-nav">
            <li
              class="nav-item"
              onClick={() => {
                this.setState({
                  mouseClickedAuthor: !this.state.mouseClickedAuthor,
                  mouseClickedPublisher: false,
                  mouseClickedCategory: false,
                  cart: false,
                  setting: false
                });
              }}
              onMouseOver={() => this.setState({ mouseOverAuthor: true })}
              onMouseOut={() => this.setState({ mouseOverAuthor: false })}
            >
              <p class={"nav-link"} style={{ cursor: "pointer" }}>
                লেখক{" "}
                <FontAwesome
                  name={
                    this.state.mouseClickedAuthor == true
                      ? "angle-up"
                      : "angle-down"
                  }
                  style={{
                    color:
                      this.state.mouseOverAuthor == true ? "#C67935" : "black",
                    fontSize: 14
                  }}
                />
              </p>
            </li>
            <li
              class="nav-item"
              onMouseOver={() => {
                this.setState({ mouseOverPublisher: true });
              }}
              onMouseOut={() => {
                this.setState({ mouseOverPublisher: false });
              }}
              onClick={() => {
                this.setState({
                  mouseClickedPublisher: !this.state.mouseClickedPublisher,
                  mouseClickedAuthor: false,
                  mouseClickedCategory: false,
                  cart: false,
                  setting: false
                });
              }}
            >
              <p class={"nav-link"}>
                প্রকাশনী{" "}
                <FontAwesome
                  name={
                    this.state.mouseClickedPublisher == true
                      ? "angle-up"
                      : "angle-down"
                  }
                  style={{
                    color:
                      this.state.mouseOverPublisher == true
                        ? "#C67935"
                        : "black",
                    fontSize: 14
                  }}
                />
              </p>
            </li>
            <li
              class="nav-item"
              onMouseOver={() => {
                this.setState({ mouseOverCategory: true });
              }}
              onMouseOut={() => {
                this.setState({ mouseOverCategory: false });
              }}
              onClick={() => {
                this.setState({
                  mouseClickedCategory: !this.state.mouseClickedCategory,
                  mouseClickedAuthor: false,
                  mouseClickedPublisher: false,
                  mouseOverPublisher: false,
                  cart: false,
                  setting: false
                });
              }}
            >
              <p class={"nav-link"}>
                ক্যাটাগরী{" "}
                <FontAwesome
                  name={
                    this.state.mouseClickedCategory == true
                      ? "angle-up"
                      : "angle-down"
                  }
                  style={{
                    color:
                      this.state.mouseOverCategory == true
                        ? "#C67935"
                        : "black",
                    fontSize: 14
                  }}
                />
              </p>
            </li>
            <li class="nav-item">
              <Link class={"nav-link"} to="/shopGrid">
                সদ্য প্রকাশিত বই
              </Link>
            </li>
             <li class="nav-item">
              <Link class="nav-link" to="/shopGrid"><span class="font-weight-bold">
                 বেস্ট সেলার বই {" "}
                </span>
                </Link>
            </li>
            <li class="nav-item">
              <Link
                to="/shopGrid"
                class="nav-link"
                onClick={() => {
                  this.props.fetchBooks(
                    helper.prefix + "category/" + 22
                  );
                  this.props.selectAuthor(null);
                  this.props.selectPublisher(null);
                }}
              >
                মুক্তিযুদ্ধ
              </Link>
            </li>
            <li class="nav-item">
            <Link
                to="/shopGrid"
                class="nav-link"
                onClick={() => {
                  this.props.fetchBooks(
                    helper.prefix + "category/" + 320
                  );
                  this.props.selectAuthor(null);
                  this.props.selectPublisher(null);
                }}
              >
              শিশুতোষ
             </Link>
            </li>
            <li class="nav-item">
            <Link
                to="/shopGrid"
                class="nav-link"
                onClick={() => {
                  this.props.fetchBooks(
                    helper.prefix + "category/" + 300
                  );
                  this.props.selectAuthor(null);
                  this.props.selectPublisher(null);
                }}
              >
              বিজ্ঞান
              </Link>
            </li>
            <li class="nav-item">
            <Link
                to="/shopGrid"
                class="nav-link"
                onClick={() => {
                  this.props.fetchBooks(
                    helper.prefix + "category/" + 57
                  );
                  this.props.selectAuthor(null);
                  this.props.selectPublisher(null);
                }}
              >
              রাজনীতি
             </Link>
            </li>
            <li class="nav-item">
            <Link
                to="/shopGrid"
                class="nav-link"
                onClick={() => {
                  this.props.fetchBooks(
                    helper.prefix + "category/" + 437
                  );
                  this.props.selectAuthor(null);
                  this.props.selectPublisher(null);
                }}
              >
                ধর্মীয় বই
              </Link>
            </li>
            <li class="nav-item">
            <Link
                to="/shopGrid"
                class="nav-link"
                onClick={() => {
                  this.props.fetchBooks(
                    helper.prefix + "category/" + 120
                  );
                  this.props.selectAuthor(null);
                  this.props.selectPublisher(null);
                }}
              >
              ধ্রূপদী সাহিত্য
              </Link>
            </li>
             <li class="nav-item">
              <Link class="nav-link" to="/shopGrid">
                নিষিদ্ধ বই
              </Link>
            </li>
            <li class="nav-item">
            <Link
                to="/shopGrid"
                class="nav-link"
                onClick={() => {
                  this.props.fetchBooks(
                    helper.prefix + "category/" + 615
                  );
                  this.props.selectAuthor(null);
                  this.props.selectPublisher(null);
                }}
              >
                পাঠ্য বই
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  };

  fetch_authors = () => {
    fetch(helper.prefix + "authors", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        // 'Authorization': 'Bearer ' + user.success.token,
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success) {
          let authors = helper
            .breakArrayIntoGroups(responseJson.authors, 8)
            .slice(0, 4);
          console.log("Is found authors", authors);
          this.setState({ authors: authors, mAuthors: responseJson.authors });
        }
      })
      .catch(error => {
        //this.setState({loading:false})
        console.log(error);
      });
  };
  fetch_publishers = () => {
    fetch(helper.prefix + "publishers", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        // 'Authorization': 'Bearer ' + user.success.token,
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success) {
          let publishers = helper
            .breakArrayIntoGroups(responseJson.publishers, 8)
            .slice(0, 4);
          console.log(publishers);
          this.setState({
            publishers: publishers,
            mPublishers: responseJson.publishers
          });
        }
      })
      .catch(error => {
        //this.setState({loading:false})
        console.log(error);
      });
  };
  fetch_categories = () => {
    fetch(helper.prefix + "categories", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        // 'Authorization': 'Bearer ' + user.success.token,
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success) {
          let categories = helper
            .breakArrayIntoGroups(responseJson.categories, 8)
            .slice(0, 4);
          console.log(categories);
          this.setState({
            categories: categories,
            mCategories: responseJson.categories
          });
        }
      })
      .catch(error => {
        //this.setState({loading:false})
        console.log(error);
      });
  };
  authors = () => {
    if (this.state.mouseClickedAuthor == true && this.state.authors != null) {
      return (
        <div class="row ml-5 mr-5 mega-menu">
          {this.state.authors.map((group, i) => {
            return (
              <div class="col-md-3 " key={i}>
                <ul>
                  {group.map((author, index) => {
                    return (
                      <li class="mt-2 mb-2" key={index}>
                        <Link
                          to="/shopGrid"
                          onClick={() => {
                            this.setState({ mouseClickedAuthor: false });
                            this.props.fetchBooks(
                              helper.prefix + "author/books/" + author.id
                            );
                            this.props.selectAuthor(null);
                            this.props.selectPublisher(null);
                          }}
                        >
                          <FontAwesome
                            name="circle"
                            style={{
                              color: "black",
                              marginRight: 10,
                              fontSize: 7
                            }}
                          />{" "}
                          {author.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          <div
            class="col-md-3 ml-auto pt-2"
            style={{ position: "relative", bottom: 22 }}
          >
            <Link
              to="/seemore"
              onClick={() => {
                this.setState({ mouseClickedAuthor: false });
                this.props.selectAuthor(null);
                this.props.selectPublisher(null);
                this.props.seeMore('author')
              }}
            >
              see more...
            </Link>
          </div>
        </div>
      );
    }
  };

  categories = () => {
    if (
      this.state.mouseClickedCategory == true &&
      this.state.categories != null
    ) {
      return (
        <div class="row ml-5 mr-5 mega-menu">
          {this.state.categories.map((group, i) => {
            return (
              <div class="col-md-3 " key={i}>
                <ul>
                  {group.map((category, index) => {
                    return (
                      <li class="mt-2 mb-2" key={index}>
                        <Link
                          to="/shopGrid"
                          onClick={() => {
                            this.setState({ mouseClickedCategory: false });
                            this.props.fetchBooks(
                              helper.prefix + "category/" + category.id
                            );
                            this.props.selectAuthor(null);
                            this.props.selectPublisher(null);
                          }}
                        >
                          <FontAwesome
                            name="circle"
                            style={{
                              color: "black",
                              marginRight: 10,
                              fontSize: 7
                            }}
                          />{" "}
                          {category.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          <div
            class="col-md-3 ml-auto pt-2"
            style={{ position: "relative", bottom: 22 }}
          >
            <Link
              to="/seemore"
              onClick={() => {
                this.setState({ mouseClickedCategory: false });
                this.props.selectAuthor(null);
                this.props.selectPublisher(null);
                this.props.seeMore('category')
              }}
            >
              see more...
            </Link>
          </div>
        </div>
      );
    }
  };

  publishers = () => {
    if (
      this.state.mouseClickedPublisher == true &&
      this.state.publishers != null
    ) {
      return (
        <div class="row ml-5 mr-5 mega-menu">
          {this.state.publishers.map((group, i) => {
            return (
              <div class="col-md-3 " key={i}>
                <ul>
                  {group.map((publisher, index) => {
                    return (
                      <li class="mt-2 mb-2 nav-sub-item" key={index}>
                        <Link
                          to="/shopGrid"
                          onClick={() => {
                            this.setState({ mouseClickedPublisher: false });
                            this.props.fetchBooks(
                              helper.prefix + "publisher/books/" + publisher.id
                            );
                            this.props.selectAuthor(null);
                            this.props.selectPublisher(null);
                          }}
                        >
                          <FontAwesome
                            name="circle"
                            style={{
                              color: "black",
                              marginRight: 10,
                              fontSize: 7
                            }}
                          />{" "}
                          {publisher.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          <div
            class="col-md-3 ml-auto pt-2"
            style={{ position: "relative", bottom: 22 }}
          >
            <Link
              to="/seemore"
              onClick={() => {
                this.setState({ mouseClickedPublisher: false });
                this.props.selectAuthor(null);
                this.props.selectPublisher(null);
                this.props.seeMore('publisher')
              }}
            >
              see more...
            </Link>
          </div>
        </div>
      );
    }
  };

  allCategory = () => {
    if (this.state.catclicked === true) {
      return (
        <div class="ml-4">
          {/* <a style={{ fontSize: 16 }}>নতুন বই</a> */}
          {/* <a style={{ fontSize: 16 }}>ধ্রূপদী সাহিত্য</a> */}

              <Link
                to="/shopGrid"
               style={{ fontSize: 16 }}
                onClick={() => {
                  this.props.fetchBooks(
                    helper.prefix + "category/" + 320
                  );
                  this.props.selectAuthor(null);
                  this.setState({ menuOpend: !this.state.menuOpend })
                  this.props.selectPublisher(null);
                }}
              >
                শিশুতোষ
              </Link>


            <Link
                to="/shopGrid"
               style={{ fontSize: 16 }}
                onClick={() => {
                  this.props.fetchBooks(
                    helper.prefix + "category/" + 300
                  );
                  this.props.selectAuthor(null);
                  this.setState({ menuOpend: !this.state.menuOpend })
                  this.props.selectPublisher(null);
                }}
              >
                বিজ্ঞান
              </Link>


            <Link
                to="/shopGrid"
               style={{ fontSize: 16 }}
                onClick={() => {
                  this.props.fetchBooks(
                    helper.prefix + "category/" + 57
                  );
                  this.props.selectAuthor(null);
                  this.setState({ menuOpend: !this.state.menuOpend })
                  this.props.selectPublisher(null);
                }}
              >
                রাজনীতি
              </Link>


            <Link
                to="/shopGrid"
               style={{ fontSize: 16 }}
                onClick={() => {
                  this.props.fetchBooks(
                    helper.prefix + "category/" + 36
                  );
                  this.props.selectAuthor(null);
                  this.setState({ menuOpend: !this.state.menuOpend })
                  this.props.selectPublisher(null);
                }}
              >
                কিশোর সাহিত্য
              </Link>


            <Link
                to="/shopGrid"
               style={{ fontSize: 16 }}
                onClick={() => {
                  this.props.fetchBooks(
                    helper.prefix + "category/" + 437
                  );
                  this.props.selectAuthor(null);
                  this.setState({ menuOpend: !this.state.menuOpend })
                  this.props.selectPublisher(null);
                }}
              >
                ধর্মীয় বই
              </Link>


            <Link
                to="/shopGrid"
               style={{ fontSize: 16 }}
                onClick={() => {
                  this.props.fetchBooks(
                    helper.prefix + "category/" + 120
                  );
                  this.props.selectAuthor(null);
                  this.setState({ menuOpend: !this.state.menuOpend })
                  this.props.selectPublisher(null);
                }}
              >
                মুক্তিযুদ্ধ
              </Link>

            {/*
              <Linkstyle={{ fontSize: 16 }} to="/shopGrid">
                নিষিদ্ধ বই
              </Link>
             */}

            <Link
                to="/shopGrid"
               style={{ fontSize: 16 }}
                onClick={() => {
                  this.props.fetchBooks(
                    helper.prefix + "category/" + 615
                  );
                  this.props.selectAuthor(null);
                  this.setState({ menuOpend: !this.state.menuOpend })
                  this.props.selectPublisher(null);
                }}
              >
                পাঠ্য বই
              </Link>

        </div>
      );
    }
  };

  cart_total = () => {
    try {
      if (this.props.cart != undefined) {
        return this.props.cart.length;
      } else {
        return 0;
      }
    } catch (error) {
      console.log(error);
    }
  };

  autocomplete = () => {
    if (
      this.state.search === true &&
      this.state.searchText != null &&
      this.state.searchText != "" &&
      this.state.bookSuggestions != null &&
      this.state.bookSuggestions != []
    ) {
      return (
        <div class="row autocomplete">
          {this.state.bookSuggestions.map(book => {
            return (
              <Link
                to="product"
                onClick={() => {
                  this.props.fetchBook(
                    helper.prefix + "book/singlebook/" + book.id
                  );
                  this.setState({ search: false });
                  this.props.selectAuthor(null);
                  this.props.selectPublisher(null);
                }}
                style={{ width: "100%" }}
              >
                <div
                  class="row booksugRow"
                  style={{
                    width: "100%",
                    padding: 10,
                    marginLeft: 0,
                    paddingLeft: 10
                  }}
                >
                  <div style={{ width: "7%" }}>
                    <img
                      src={book.cover}
                      style={{
                        width: 26,
                        height: 45,
                        backgroundImage: "url(images/books/dummy.png)",
                        backgroundSize: "cover"
                      }}
                    />
                  </div>
                  <div style={{ width: "58%" }} class="pl-2">
                    <p>{book.title}</p>
                    <p style={{ color: "gray" }}>{book.author}</p>
                  </div>
                  <div style={{ width: "15%" }}>
                    <p class="mt-2" style={{ color: "#D76F6D" }}>
                      ({book.discount}% off)
                    </p>
                  </div>
                  <div class="pl-2" style={{ width: "20%" }}>
                    <p class="mt-2" style={{ fontSize: 20 }}>
                      {book.new_price} TK.
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      );
    }
  };

  autocomplete2 = () => {
    if (
      this.state.search === true &&
      this.state.searchText != null &&
      this.state.searchText != "" &&
      this.state.bookSuggestions != null &&
      this.state.bookSuggestions != []
    ) {
      return (
        <div class="row autocomplete2">
          {this.state.bookSuggestions.map(book => {
            return (
              <Link
                to="product"
                onClick={() => {
                  this.props.fetchBook(
                    helper.prefix + "book/singlebook/" + book.id
                  );
                  this.setState({ search: false });
                  this.props.selectAuthor(null);
                  this.props.selectPublisher(null);
                }}
                style={{ width: "100%" }}
              >
                <div
                  class="row booksugRow"
                  style={{
                    width: "100%",
                    padding: 10,
                    marginLeft: 0,
                    paddingLeft: 10
                  }}
                >
                  <div style={{ width: "7%" }}>
                    <img
                      src={book.cover}
                      style={{
                        width: 26,
                        height: 45,
                        backgroundImage: "url(images/books/dummy.png)",
                        backgroundSize: "cover"
                      }}
                    />
                  </div>
                  <div style={{ width: "58%" }} class="pl-2">
                    <p>{book.title}</p>
                    <p style={{ color: "gray" }}>{book.author}</p>
                  </div>
                  <div style={{ width: "15%" }}>
                    <p class="mt-2" style={{ color: "#D76F6D" }}>
                      ({book.discount}% off)
                    </p>
                  </div>
                  <div class="pl-2" style={{ width: "20%" }}>
                    <p class="mt-2" style={{ fontSize: 20 }}>
                      {book.new_price} TK.
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      );
    }
  };

  searchBook = e => {
    this.setState({ searchText: e.target.value });
    if (e.key === "Enter") {
      this.setState({ search: false });
      this.props.fetchBooks(
        helper.prefix + "book/search?data=" + this.state.searchText
      );
      this.props.selectAuthor(null);
      this.props.selectPublisher(null);
    }
    fetch(helper.prefix + "book/search?data=" + e.target.value, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success && responseJson.books.length > 0) {
          this.setState({ search: true, bookSuggestions: responseJson.books });
        } else {
          this.setState({ search: false });
        }
      })
      .catch(error => {
        //this.setState({loading:false})
        console.log(error);
      });
  };

  mobileUser = () => {
    if (Object.keys(this.props.token).length > 0) {
      return (
        <React.Fragment>
          <Link
            to="myaccount"
            onClick={() =>
              this.setState({ pmenuOpend: !this.state.pmenuOpend })
            }
          >
            {this.props.user.name}
          </Link>
          <Link
            to="#"
            onClick={() => {
              this.setState({ pmenuOpend: !this.state.pmenuOpend });
              this.logOut();
            }}
          >
            Logout
          </Link>
        </React.Fragment>
      );
    }
    if (!Object.keys(this.props.token).length > 0) {
      return (
        <React.Fragment>
          <Link
            to="signin"
            onClick={() =>
              this.setState({ pmenuOpend: !this.state.pmenuOpend })
            }
          >
            Login
          </Link>
          <Link
            to="signin"
            onClick={() =>
              this.setState({ pmenuOpend: !this.state.pmenuOpend })
            }
          >
            Create account
          </Link>
        </React.Fragment>
      );
    }
  };

  allAuthor = () => {
    try {
      if (
        this.state.mAuthorclicked === true &&
        this.state.mAuthors.length > 0
      ) {
        return this.state.mAuthors.map((author, index) => {
          if (index < 20) {
            return (
              <Link
                to="/shopGrid"
                onClick={() => {
                  this.setState({
                    mAuthorclicked: false,
                    menuOpend: false,
                    mPublisherclicked: false
                  });
                  this.props.fetchBooks(
                    helper.prefix + "author/books/" + author.id
                  );
                  this.props.selectAuthor(null);
                  this.props.selectPublisher(null);
                }}
                style={{ fontSize: 16 }}
              >
                {author.name}
              </Link>
            );
          }else if(index > 20 && index < 22){
            return (
              <Link
              to="/seemore"
              onClick={() => {
                this.setState({ menuOpend: !this.state.menuOpend })
                this.props.selectAuthor(null);
                this.props.selectPublisher(null);
                this.props.seeMore('author')
              }}
            >
              see more...
            </Link>
            )
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  allPublisher = () => {
    try {
      if (
        this.state.mPublisherclicked === true &&
        this.state.mPublishers.length > 0
      ) {
        return this.state.mPublishers.map((publisher, index) => {
          if (index < 20) {
            return (
              <Link
                to="/shopGrid"
                onClick={() => {
                  this.setState({
                    mPublisherclicked: false,
                    menuOpend: false,
                    mAuthorclicked: false
                  });
                  this.props.fetchBooks(
                    helper.prefix + "publisher/books/" + publisher.id
                  );
                  this.props.selectAuthor(null);
                  this.props.selectPublisher(null);
                }}
                style={{ fontSize: 16 }}
              >
                {publisher.name}
              </Link>
            );
          }else if(index > 20 && index < 22){
            return (
              <Link
              to="/seemore"
              onClick={() => {
                this.setState({ menuOpend: !this.state.menuOpend })
                this.props.selectAuthor(null);
                this.props.selectPublisher(null);
                this.props.seeMore('publisher')
              }}
            >
              see more...
            </Link>
            )
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <header id="wn__header" class="header__area " style={{ zIndex: 3000 }}>
        <BrowserView>
          <div class="sticky__header" style={{ backgroundColor: "#EED7C2" }}>
          <img class="topbanner"
                        src="images/top/1.jpg"
                        alt="Gronthik"
                        id="topbanner"
                      />
            <div class="container">
              <div class="row d-flex align-items-center" style={{ height: 70 }}>
                <div class="col-md-3">
                  <div class="logo pt-2">
                    <Link to="/">
                      <img
                        class="siteLogo"
                        src="images/logo/logoText.png"
                        alt="Gronthik"
                        id="siteLogo"
                      />
                    </Link>
                  </div>
                </div>

                <div class="col-md-5" style={{ zIndex: 10000 }}>
                  <ul class="header__sidebar__right d-flex align-items-center mt-auto mb-auto">
                    <form
                      class="form-inline searchAll"
                      style={{ width: "100%" }}
                    >
                      <div
                        class="row m-0"
                        style={{
                          border: "1px solid black",
                          width: "100%",
                          backgroundColor: "white",
                          borderRadius: 26,
                          position: "relative"
                        }}
                      >
                        <ReactTyped
                          // typedRef={typedRef()}
                          loop={true}
                          loopCount={0}
                          typeSpeed={100}
                          startDelay={0}
                          backSpeed={60}
                          backDelay={2}
                          strings={[
                            "পছন্দের বইয়ের নাম লেখুন",
                            "পছন্দের লেখকের নাম লেখুন",
                            "পছন্দের প্রকাশনীর নাম লেখুন"
                          ]}
                          stopped={null}
                          smartBackspace
                          shuffle={false}
                          fadeOut={false}
                          fadeOutDelay={100}
                          attr="placeholder"
                          bindInputFocusEvents={false}
                        >
                          <input
                            type="search"
                            style={{
                              width: "100%",
                              border: "none",
                              height: 40
                            }}
                            value={this.state.searchText}
                            class="form-control mr-sm-2"
                            onChange={e => this.searchBook(e)}
                          />
                        </ReactTyped>
                        <Link
                          to="shopGrid"
                          onClick={() => {
                            this.setState({ search: false });
                            this.props.fetchBooks(
                              helper.prefix +
                              "book/search?data=" +
                              this.state.searchText
                            );
                            this.props.selectAuthor(null);
                            this.props.selectPublisher(null);
                          }}
                        >
                          <button
                            class="btn my-2 my-sm-0 search-btn"
                            type="submit"
                          >
                            <FontAwesome
                              name="search"
                              style={{ color: "white" }}
                            />
                          </button>
                        </Link>
                      </div>
                      {this.autocomplete()}
                    </form>
                  </ul>
                </div>
                <div class="col-md-4">
                  <ul class="header__sidebar__right d-flex justify-content-end align-items-center">
                    <li class="pr-3">
                      <a href="#">
                        <img
                          src="images/icons/wish.png"
                          style={{ width: 22, height: 22 }}
                        />
                      </a>
                    </li>
                    <li
                      class="shopcart"
                      onClick={() =>
                        this.setState({
                          cart: !this.state.cart,
                          setting: false,
                          mouseClickedAuthor: false,
                          mouseClickedPublisher: false
                        })
                      }
                    >
                      <div class="cartIcon" to="">
                        <img
                          src="images/icons/cart.png"
                          style={{ width: 26, height: 26, position: 'absolute', top: 3 }}
                        />
                        <span class="product_qun">{this.cart_total()}</span>
                      </div>

                      {this.cart()}
                    </li>
                    <li
                      class=""
                      onClick={() =>
                        this.setState({
                          setting: !this.state.setting,
                          mouseClickedAuthor: false,
                          mouseClickedPublisher: false,
                          cart: false
                        })
                      }
                    >
                      <img
                        src="images/icons/SIGNIN.png"
                        style={{ width: 20, height: 20, position: 'relative', top: 2 }}
                      />
                      <div
                        class={
                          this.state.setting === true
                            ? "searchbar__content setting__block is-visible"
                            : "searchbar__content setting__block"
                        }
                      >
                        <div class="content-inner">
                          <div class="switcher-currency">
                            <div class="switcher-options">
                              <div class="switcher-currency-trigger">
                                <div class="setting__menu">
                                  {this.logedIn()}
                                  {this.logIn()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="mobile-menu d-block d-lg-none" />
            </div>
          </div>
          <nav class="navbar navbar-expand-lg navbar-light">
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon" />
            </button>
            <div class="collapse navbar-collapse d-flex " id="navbarNav">
              <ul
                class="navbar-nav ml-auto mr-auto"
                style={{ position: "relative", top: 17 }}
              >
                <li
                  class={
                    window.location.pathname == "/"
                      ? "nav-item nav-sub active"
                      : "nav-sub nav-item"
                  }
                >
                  <p class="nav-link" href="/">
                    বই<span class="sr-only">(current)</span>
                  </p>
                </li>

                <li
                  class="nav-item"
                  onClick={() =>
                    this.setState({
                      category: false,
                      writer: false,
                      publisher: false,
                      reader: true,
                      ovijatri: false,
                      bookfair: false
                    })
                  }
                >
                  <a class="nav-link" href="#">
                    পুরাতন/দুর্লভ বই
                  </a>
                </li>
                <li
                  class="nav-item"
                  onClick={() =>
                    this.setState({
                      category: false,
                      writer: false,
                      publisher: false,
                      reader: true,
                      ovijatri: false,
                      bookfair: false
                    })
                  }
                >
                  <a class="nav-link" href="#">
                    পাঠক কর্নার
                  </a>
                </li>
                <li
                  class="nav-item"
                  onClick={() =>
                    this.setState({
                      category: false,
                      writer: true,
                      publisher: false,
                      reader: false,
                      ovijatri: false,
                      bookfair: false
                    })
                  }
                >
                  <a class="nav-link" href="#">
                    প্রাতিষ্ঠানিক অর্ডার
                  </a>
                </li>
                <li
                  class="nav-item"
                  onClick={() =>
                    this.setState({
                      category: false,
                      writer: false,
                      publisher: false,
                      reader: false,
                      ovijatri: true,
                      bookfair: false
                    })
                  }
                >
                  <a class="nav-link" href="#">
                    অভিযাত্রী
                  </a>
                </li>
                <li
                  class="nav-item"
                  onClick={() =>
                    this.setState({
                      category: false,
                      writer: false,
                      publisher: false,
                      reader: false,
                      ovijatri: false,
                      bookfair: true
                    })
                  }
                >
                  <a class="nav-link" href="#">
                    বইমেলা
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          {this.category()}
          {this.authors()}
          {this.publishers()}
          {this.categories()}
        </BrowserView>
        <MobileView>
          {/* {this.authors()} */}
          <div
            id="mySidenav"
            class="sidenav"
            style={{ width: this.state.menuOpend ? 250 : 0, zIndex: 2000 }}
          >
            <a
              href="javascript:void(0)"
              class="closebtn"
              onClick={() =>
                this.setState({ menuOpend: !this.state.menuOpend })
              }
            >
              &times;
            </a>
            <div
              class="row m-0 d-flex justify-content-between align-items-center"
              onClick={() =>
                this.setState({
                  catclicked: !this.state.catclicked,
                  mAuthorclicked: false
                })
              }
            >
              <Link to="#">বই </Link>
              <FontAwesome
                name={this.state.catclicked ? "angle-down" : "angle-right"}
                size="2x"
                style={{
                  textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
                  paddingRight: 10
                }}
              />
            </div>

            {this.allCategory()}
            <div
              class="row m-0 d-flex justify-content-between align-items-center"
              onClick={() =>
                this.setState({
                  mAuthorclicked: !this.state.mAuthorclicked,
                  catclicked: false,
                  mPublisherclicked: false
                })
              }
            >
              <Link to="#">লেখক </Link>
              <FontAwesome
                name={this.state.mAuthorclicked ? "angle-down" : "angle-right"}
                size="2x"
                style={{
                  textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
                  paddingRight: 10
                }}
              />
            </div>
            <div class="ml-4">{this.allAuthor()}</div>
            <div
              class="row m-0 d-flex justify-content-between align-items-center"
              onClick={() =>
                this.setState({
                  mPublisherclicked: !this.state.mPublisherclicked,
                  catclicked: false,
                  mAuthorclicked: false
                })
              }
            >
              <Link to="#">প্রকাশনী </Link>
              <FontAwesome
                name={
                  this.state.mPublisherclicked ? "angle-down" : "angle-right"
                }
                size="2x"
                style={{
                  textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
                  paddingRight: 10
                }}
              />
            </div>
            <div class="ml-4">{this.allPublisher()}</div>
            <a href="#">পুরাতন/দুর্লভ বই</a>
            <a href="#">পাঠক কর্নার</a>
            <a href="#">প্রাতিষ্ঠানিক অর্ডার</a>
            <a href="#">অভিযাত্রী</a>
            <a href="#">বইমেলা</a>
          </div>
          <div
            id="profileSidenav"
            class="sidenav2"
            style={{ width: this.state.pmenuOpend ? 250 : 0, zIndex: 2000 }}
          >
            <a
              href="javascript:void(0)"
              class="closebtn"
              onClick={() =>
                this.setState({ pmenuOpend: !this.state.pmenuOpend })
              }
            >
              &times;
            </a>
            {this.mobileUser()}
          </div>
          <div
            class="row m-0 sticky__header d-flex align-items-center"
            style={{ background: "#B8B7B7" }}
          >
          <img class="topbanner"
                        src="images/top/1.jpg"
                        alt="Gronthik"
                        id="topbanner"
                      />
            <div class="mt-auto mb-auto pl-3">
              <span
                style={{ fontSize: 24, cursor: "pointer" }}
                onClick={() =>
                  this.setState({ menuOpend: !this.state.menuOpend })
                }
              >
                &#9776;
              </span>
            </div>
            <div class="logo d-flex align-items-center">
              <Link to="/">
                <img
                  class="siteLogomb"
                  src="images/logo/logoText.png"
                  alt="Gronthik"
                  id="siteLogo"
                />
              </Link>
            </div>
            <div class="row d-flex align-items-center ml-2">
              <img
                class="ml-5"
                src="images/icons/wish.png"
                style={{ width: 22, height: 22, marginRight: 16, marginTop: 4, }}
              />

              <Link to="/cart">
                <img
                  style={{ width: 24, height: 24, marginRight: 8, }}
                  src="images/icons/cart.png"
                />
                <span
                  class="badge badge-danger"
                  style={{ position: "relative", right: 17 }}
                >
                  {this.cart_total()}
                </span>
              </Link>

              <img
                onClick={() =>
                  this.setState({ pmenuOpend: !this.state.pmenuOpend })
                }
                src="images/icons/SIGNIN.png"
                style={{ width: 20, height: 20, position: 'relative', top: 2 }}
              />
            </div>
          </div>
          <div
            class="row m-0 d-flex align-items-center ml-3 mt-2"
            style={{
              width: "90%",
              backgroundColor: "white",
              borderRadius: 26,
              border: "1px solid gray"
            }}
          >
            <ReactTyped
              // typedRef={typedRef()}
              loop={true}
              loopCount={0}
              typeSpeed={100}
              startDelay={0}
              backSpeed={60}
              backDelay={2}
              strings={[    "পছন্দের বইয়ের নাম লেখুন",
                            "পছন্দের লেখকের নাম লেখুন",
                            "পছন্দের প্রকাশনীর নাম লেখুন"
                          ]}
              stopped={null}
              smartBackspace
              shuffle={false}
              fadeOut={false}
              fadeOutDelay={100}
              attr="placeholder"
              bindInputFocusEvents={false}
            >
              <input
                type="search"
                style={{
                  width: "100%",
                  border: "none",
                  height: 20
                }}
                value={this.state.searchText}
                class="form-control mr-sm-2"
                onChange={e => this.searchBook(e)}
              />
            </ReactTyped>
            <button
              class="btn my-2 my-sm-0 search-btn-mb"
              style={{ top: 0, position: "relative", right: 10 }}
              onClick={() => {
                this.setState({ search: false });
                this.props.fetchBooks(
                  helper.prefix + "book/search?data=" + this.state.searchText
                );
                this.props.selectAuthor(null);
                this.props.selectPublisher(null);
              }}
            >
              <FontAwesome name="search" style={{ color: "white" }} />
            </button>
          </div>
          {this.autocomplete2()}
        </MobileView>
      </header>
    );
  }
}

navbar.propTypes = {
  fetchBooks: PropTypes.func.isRequired,
  selectAuthor: PropTypes.func.isRequired,
  selectPublisher: PropTypes.func.isRequired,
  fetchBook: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  seeMore: PropTypes.func.isRequired,
  deleteToken: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cart: state.books.cart,
  token: state.auth.token,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  {
    fetchBooks,
    fetchBook,
    deleteFromCart,
    deleteToken,
    selectAuthor,
    selectPublisher,
    seeMore
  }
)(navbar);
