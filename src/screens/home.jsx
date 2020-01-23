import React, { Component } from "react";
import { createStore } from "redux";
import MainSlider from "./../components/mainSlider";

import Product from "./../components/product";

import discountProduct from "./../dummyData/discountProduct";
import publishers from "./../dummyData/publishers";
import FontAwesome from "react-fontawesome";
import loadjs from "loadjs";
import * as helper from "./../helper";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBooks, seeMore} from "../actions/bookActions";
import { Link } from "react-router-dom";
// import { makeStyles } from '@material-ui/core/styles';
// import LinearProgress from '@material-ui/core/LinearProgress';
import { Growl } from 'primereact/growl';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Slider from "react-slick";

import { Style } from "react-style-tag";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

function counter(state = [], action) {
  switch (action.type) {
    case "INCREMENT":
      state.push({ id: 1, name: "xxx" });
      return state;
    case "DECREMENT":
      state.push({ id: 2, name: "zzzz" });
      return state;
    default:
      state.push({ id: 0, name: "yyyy" });
      return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter);

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() => console.log("Redux consoling", store.getState()));

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
// store.dispatch({ type: 'INCREMENT' })
// // 1
// store.dispatch({ type: 'INCREMENT' })
// // 2
// store.dispatch({ type: 'DECREMENT' })
// 1

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
      }}
      onClick={onClick}
    >
      <img class="mr-auto" src="images/icons/nextIcon.png" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        left: 0,
        zIndex: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
      }}
      onClick={onClick}
    >
      <img class="mr-auto" src="images/icons/prevIcon.png" />
    </div>
  );
}

function SampleNextArrow1(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        top: 165
      }}
      onClick={onClick}
    >
      <img class="mr-auto" src="images/icons/nextIcon.png" />
    </div>
  );
}

function SamplePrevArrow1(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        left: 0,
        zIndex: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        top: 165
      }}
      onClick={onClick}
    >
      <img class="mr-auto" src="images/icons/prevIcon.png" />
    </div>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // books: discountProduct,
      cat_orders: null,
      publishers: null,
      top_authors: null,
      subscribedUser: null,
    };
    window.scrollTo(0, 0);
    this.fetchBooks();
    this.fetchPublishers();
    this.fecthTopAuthors();
    this.showSuccess = this.showSuccess.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.showWarn = this.showWarn.bind(this);
    this.showError = this.showError.bind(this);
    this.showMultiple = this.showMultiple.bind(this);
    this.showSticky = this.showSticky.bind(this);
    this.showCustom = this.showCustom.bind(this);
    this.clear = this.clear.bind(this);
  }

  showSuccess(message, detail) {
    this.growl.show({ severity: 'success', summary: message, detail: detail });
  }

  showInfo() {
    this.growl.show({ severity: 'info', summary: 'Info Message', detail: 'PrimeReact rocks' });
  }

  showWarn() {
    this.growl.show({ severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
  }

  showError(message, detail) {
    this.growl.show({ severity: 'error', summary: message, detail: detail });
  }

  showSticky() {
    this.growl.show({ severity: 'info', summary: 'Sticky Message', detail: 'You need to close Me', sticky: true });
  }

  showCustom() {
    const summary = <span><i className="pi pi-check" /> <strong>PrimeReact</strong></span>;
    const detail = <img alt="PrimeReact" src="showcase/resources/images/primereact-logo.png" width="250px" />

    this.growl.show({ severity: 'info', summary: summary, detail: detail, sticky: true });
  }

  showMultiple() {
    this.growl.show([
      { severity: 'info', summary: 'Message 1', detail: 'PrimeReact rocks' },
      { severity: 'info', summary: 'Message 2', detail: 'PrimeReact rocks' },
      { severity: 'info', summary: 'Message 3', detail: 'PrimeFaces rocks' }
    ]);
  }

  clear() {
    this.growl.clear();
  }


  componentDidMount() {
   
    // Jquery here $(...)...
  }

  fecthTopAuthors = () => {
    fetch(helper.prefix + "authors/top")
      .then(res => res.json())
      .then(data => {
        this.setState({ top_authors: data.authors });
        console.log("Weekly top authors", data.authors);
      });
  };

  firstRow = (title, books, category_id) => {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToScroll: 6,
      slidesToShow: 6,
      variableWidth: true,
      nextArrow: <SampleNextArrow1/>,
      prevArrow: <SamplePrevArrow1/>
    };
    var settings2 = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToScroll: 2,
      slidesToShow: 2,
      variableWidth: true,
      arrows: false
    };
    return (
      <React.Fragment>
        <BrowserView style={{ boxShadow: "0 4px 6px -3px #9c9c9c",  
        paddingBottom: 10,
         background: '#F1F2EE' }}>
          <div
            class="row m-0 mt-3 justify-content-between"
            style={{
              position: "absolute",
              padding: 10,
              paddingBottom: 0,
              zIndex: 20
            }}
          >
            <h4 class="mr-2" style={{width: 1032}}>{title}</h4>
            <Link
              to="/shopGrid"
              onClick={() => {
                this.props.fetchBooks(
                  helper.prefix + "category/" + category_id
                );
              }}
            >
              <button type="button" class="btn btn-outline-primary view_dp">
                View All
              </button>
            </Link>
          </div>
          <div
            style={{
              background: "#F1F2EE",
              paddingRight: 25,
              height: 340,
              marginBottom: 30
            }}
          >
            <div>
              {console.log("Screen width", window.innerWidth)}
              <Slider {...settings}>
                {books !== []
                  ? books.map((item, index) => {
                      console.log("Items found from data: ", item);
                      return (
                        <Product
                          key={index}
                          name={item.title}
                          cart_book={item}
                          id={item.id}
                          price={item.new_price}
                          discount={item.discount}
                          image={item.cover}
                          writer={item.author}
                          history={this.props.history}
                        />
                      );
                    })
                  : null}
              </Slider>
            </div>
          </div>
        </BrowserView>
        <MobileView style={{ boxShadow: "0 4px 6px -3px #9c9c9c" }}>
          <div class="row m-0" style={{ position: "absolute", padding: 10 }}>
            <h4 style={{ fontSize: 13, width: 207 }}>{title}</h4>
            <Link
              to="/shopGrid"
              onClick={() => {
                this.props.fetchBooks(
                  helper.prefix + "category/" + category_id
                );
              }}
            >
              <button type="button" class="btn btn-outline-primary view_mb">
                View All
              </button>
            </Link>
          </div>
          <div
            style={{
              background: "#F1F2EE",
              overflow: "auto",
              marginBottom: 30
            }}
          >
            <Slider {...settings2}>
              {books !== []
                ? books.map((item, index) => {
                    // console.log("Items found from dummy: ", item);
                    return (
                      <Product
                        key={index}
                        name={item.title}
                        cart_book={item}
                        id={item.id}
                        price={item.new_price}
                        discount={item.discount}
                        image={item.cover}
                        writer={item.author}
                        history={this.props.history}
                      />
                    );
                  })
                : null}
            </Slider>
          </div>
        </MobileView>
      </React.Fragment>
    );
  };

  adRow = () => {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToScroll: 1,
      slidesToShow: 3,
      autoplay: true,
      pauseOnHover: true,
      variableWidth: true,
      arrows: false
    };
    var settings2 = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToScroll: 1,
      slidesToShow: 1,
      autoplay: true,
      pauseOnHover: true,
      variableWidth: true,
      arrows: false
    };
    return (
      <React.Fragment>
        <BrowserView>
          <Slider {...settings}>
            <div>
              <img class="ad-banner" src="images/ad/1.png" />
            </div>
            <div>
              <img class="ad-banner" src="images/ad/2.png" />
            </div>
            <div>
              <img class="ad-banner" src="images/ad/3.png" />
            </div>
            <div>
              <img class="ad-banner" src="images/ad/1.png" />
            </div>
            <div>
              <img class="ad-banner" src="images/ad/2.png" />
            </div>
            <div>
              <img class="ad-banner" src="images/ad/3.png" />
            </div>
          </Slider>
        </BrowserView>
        <MobileView>
          <div style={{ height: 100 }}>
            <Slider {...settings2}>
              <div>
                <img class="ad-banner" src="images/ad/1.png" />
              </div>
              <div>
                <img class="ad-banner" src="images/ad/2.png" />
              </div>
              <div>
                <img class="ad-banner" src="images/ad/3.png" />
              </div>
              <div>
                <img class="ad-banner" src="images/ad/1.png" />
              </div>
              <div>
                <img class="ad-banner" src="images/ad/2.png" />
              </div>
              <div>
                <img class="ad-banner" src="images/ad/3.png" />
              </div>
            </Slider>
          </div>
        </MobileView>
      </React.Fragment>
    );
  };

  sellers = () => {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToScroll: 2,
      slidesToShow: 6,
      variableWidth: true,
      autoplay: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    var settings2 = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToScroll: 2,
      slidesToShow: 2,
      variableWidth: true,
      arrows: false
    };
    return (
      <div class="container mt-2">
        <BrowserView class="mb-3" style={{background: "#F1F2EE",boxShadow: "0 4px 6px -3px #9c9c9c", marginTop: 30}}>
        <div class="row m-0 d-flex justify-content-between align-items-center" style={{height: 30}}>
          <h4 class="mt-2 ml-3">প্রকাশনী সমূহ</h4>
          <Link
                to="/seemore"
                onClick={() => {
                  this.props.seeMore('publisher')
                }}
                class="p-3 pt-2"
              >
                  <button type="button" class="btn btn-outline-primary view_dp">
                View All
              </button>
              </Link>
          </div>
          <div class="mb-3" style={{  paddingRight: 25 }}>
            <div>
              {console.log("Screen width", window.innerWidth)}
              <Slider {...settings}>
                {console.log("Got all publisher ", this.state.publishers)}
                {this.state.publishers !== null
                  ? this.state.publishers.map((item, index) => {
                      return (
                        <Link
                          to="/shopGrid"
                          onClick={() => {
                            this.props.fetchBooks(
                              helper.prefix + "publisher/books/" + item.id
                            );
                            console.log(item.id);
                          }}
                        >
                          <div class="crp-item">
                              <img
                                class="m-pubp-img"
                                src={item.image == null ? "images/default/publisher.png" : item.image}
                                style={{
                                  borderRadius: "100%",
                                  width: 80,
                                  height: 80
                                }}
                              />
                            <p style={{color: 'black'}}>{item.name}</p>
                          </div>
                        </Link>
                      );
                    })
                  : null}
              </Slider>
            </div>
          </div>
        </BrowserView>
        <MobileView class="mb-3" style={{ background: "#F1F2EE", boxShadow: "0 4px 6px -3px #9c9c9c", marginTop: 30}}>
        <div class="row m-0 d-flex justify-content-between align-items-center" style={{height: 30}}>
          <h4 class="mt-2 ml-3">প্রকাশনী সমূহ</h4>
          <Link
                to="/seemore"
                onClick={() => {
                  this.props.seeMore('publisher')
                }}
                class="p-3 pt-2"
              >
                  <button type="button" class="btn btn-outline-primary view_dp">
                View All
              </button>
              </Link>
          </div>
          <div class="mb-2">
            <div style={{ background: "#F1F2EE" }}>
              {console.log("Screen width", window.innerWidth)}
              <Slider {...settings2}>
                {this.state.publishers !== null
                  ? this.state.publishers.map((item, index) => {
                      return (
                        <Link
                          to="/shopGrid"
                          onClick={() => {
                            this.props.fetchBooks(
                              helper.prefix + "publisher/books/" + item.id
                            );
                            console.log(item.id);
                          }}
                        >
                          <div class="cr-item-mb" style={{ width: 97 }}>
                              <img
                                class="m-pub-img"
                                src={item.image == null ? "images/default/publisher.png" : item.image}
                                style={{
                                  borderRadius: "100%",
                                  width: 97,
                                  height: 97
                                }}
                              />
                            <p style={{color: 'black'}}>{item.name}</p>
                          </div>
                        </Link>
                      );
                    })
                  : null}
              </Slider>
            </div>
          </div>
        </MobileView>
      </div>
    );
  };

  bestWrtiters = () => {
    var settings = {
      dots: false,
      infinite: true,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      pauseOnHover: true,
      variableWidth: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };

    var settings2 = {
      dots: false,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      pauseOnHover: true,
      arrows: false,
      variableWidth: true
    };
    return (
      <div class="container">
        
        <BrowserView class="mb-3" style={{background: "#F1F2EE", marginTop: 30}}>
          <div class="row m-0 d-flex justify-content-between align-items-center" style={{height: 30}}>
          <h4 class="mt-2 ml-3">সাপ্তাহিক সেরা লেখক</h4>
          <Link
                to="/seemore"
                onClick={() => {
                  this.props.seeMore('author')
                }}
                class="p-3 pt-2"
              >
                  <button type="button" class="btn btn-outline-primary view_dp">
                View All
              </button>
              </Link>
          </div>

          <div style={{  paddingRight: 25 }}>
            <Slider {...settings}>
              {this.state.top_authors
                ? this.state.top_authors.map((item, index) => {
                    return (
                      <Link
                        to="/shopGrid"
                        onClick={() => {
                          this.props.fetchBooks(
                            helper.prefix + "author/books/" + item.id
                          );
                        }}
                      >
                        <div class="crw-item">
                          <img
                            class="mw-pub-img"
                            src={item.image == null ? "images/books/author.png" : item.image}
                            style={{ width: 100, height: 100, background: 'white', borderRadius: "100%" }}
                          />
                        <p style={{color: 'black'}}>{item.name}</p>
                        </div>
                      </Link>
                    );
                  })
                : null}
            </Slider>
          </div>
        </BrowserView>

        <MobileView class="mb-3" style={{background: "#F1F2EE", marginTop: 30}}>
        <div class="row m-0 d-flex justify-content-between align-items-center" style={{height: 30}}>
          <h6 class="mt-2 ml-3">সাপ্তাহিক সেরা লেখক</h6>
          <Link
                to="/seemore"
                onClick={() => {
                  this.props.seeMore('author')
                }}
                class="p-3 pt-2"
              >
                  <button type="button" class="btn btn-outline-primary view_dp">
                View All
              </button>
              </Link>
          </div>
          <div >
            <Slider {...settings2}>
              {this.state.top_authors
                ? this.state.top_authors.map((item, index) => {
                    return (
                      <Link
                        to="/shopGrid"
                        onClick={() => {
                          this.props.fetchBooks(
                            helper.prefix + "author/books/" + item.id
                          );
                        }}
                      >
                        <div class="crw-item">
                          <img
                            class="mw-pub-img"
                            src={item.image == null ? "images/books/author.png" : item.image}
                            style={{ width: 100, height: 100, background: 'white', borderRadius: "100%" }}
                          />
                        <p style={{color: 'black'}}>{item.name}</p>
                        </div>
                      </Link>
                    );
                  })
                : null}
            </Slider>
          </div>
        </MobileView>
      </div>
    );
  };


  subscribeUser = (type) =>{
    let url = helper.prefix + 'subscribe'

    let data = {
      user: this.state.subscribedUser,
      type: '1'
    }

    fetch(helper.prefix + 'subscribe', {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
        // 'Authorization' : 'Bearer',
      }
    })
      .then(res => res.json())
      .then(response => {
        if(response.success){
          this.showSuccess("Subscribed successfully", "Thank you")
        } 
        if(response.message){
          this.showError(response.message, "Please fix this..")
        }
        
        if(response.errors.type){
          this.showError(response.errors.type[0], "Please fix..")
        }
        if(response.errors.user){
          this.showError(response.errors.user[0], "Please fix..")
        }
      })
      .catch(error => console.error("Error:", error));
 
  }

  subscribe = () => {
    return (
      <React.Fragment>
        <BrowserView>
          <div class="container">
            <div class="" style={{ background: "#EED7C2" , marginTop: 30}}>
              <div class="row d-flex justify-content-center mt-3">
                <h4 class="c-black " style={{ fontSize: 18 }}>
                  সাবস্ক্রাইব করে জিতে নিন {" "}
                  <span style={{ color: "#02A868", fontSize: 25 }}> আকর্ষণীয় অফার</span>
                </h4>
              </div>
              <div class="row d-flex justify-content-center mt-2 pb-3">
                <input
                  class="col-md-5 subs-input pl-2 pr-2"
                  placeholder="ইমেইল/মোবাইল নম্বর"
                  style={{ height: 55 }}
                  // value={this.state.subscribeUser}
                  onChange={(e) => this.setState({subscribedUser: e.target.value})}
                />
                <Growl ref={(el) => this.growl = el} />
                <div class="row mt-auto mb-auto ml-0">
                  <button class="btn btn-primary ml-2 mr-2"
                  onClick={() => this.subscribeUser('1')}
                  >পুরুষ</button>
                  <button class="btn btn-success mr-2"
                  onClick={() => this.subscribeUser('2')}
                  >নারী</button>
                  <button class="btn btn-warning"
                  onClick={() => this.subscribeUser('3')}
                  >অন্যান্য</button>
                </div>
              </div>
            </div>
          </div>
        </BrowserView>
        <MobileView>
          <div class="container mt-4">
            <div class="" style={{ background: "#EED7C2" }}>
              <div class="row d-flex justify-content-center pt-2">
                <h4
                  class="c-black "
                  style={{ fontSize: 18, fontWeight: "normal" }}
                >
                  সাবস্ক্রাইব করে জিতে নিন {" "} 
                </h4>
                <h4
                  class="c-black "
                  style={{ fontSize: 18, fontWeight: "normal" }}
                >
                  <span style={{ color: "#02A868", fontSize: 24 }}>
                  আকর্ষণীয় অফার
                  </span>
                </h4>
              </div>
              <div class="row d-flex justify-content-center mt-2 pb-3">
                <input
                  class="col-md-5 subs-input "
                  placeholder="ইমেইল/মোবাইল নম্বর"
                  style={{ height: 55, marginLeft: 29, marginRight: 28 }}
                />
                <div class="row mt-2 ml-0">
                  <button type="button" class="btn btn-primary mr-2">
                    পুরুষ
                  </button>
                  <button type="button" class="btn btn-success mr-2">
                    নারী
                  </button>
                  <button type="button" class="btn btn-warning mr-2">
                    অন্যান্য
                  </button>
                </div>
              </div>
            </div>
          </div>
        </MobileView>
      </React.Fragment>
    );
  };

  services = () => {
    return (
      <div class="container">
        <BrowserView>
          <div class="pt-3 pb-3" style={{ background: "#F1F2EE", marginTop: 30 }}>
            <div class="row">
              <div className="row col-sm-4">
                <img
                  class="mr-auto ml-auto"
                  src="images/icons/delivery.png"
                  style={{ height: 100 }}
                />
              </div>
              <div className="row col-sm-4">
                <img
                  class="mr-auto ml-auto"
                  src="images/icons/delivery_cycle.png"
                  style={{ height: 100 }}
                />
              </div>
              <div className="row col-sm-4">
                <img
                  class="mr-auto ml-auto"
                  src="images/icons/cash_on.png"
                  style={{ height: 100 }}
                />
              </div>
            </div>
          </div>
        </BrowserView>
        <MobileView>
          <div class="pt-3 pb-3 " style={{ background: "#F1F2EE" }}>
            <div class="row">
            <div className="row-sm-3 mb-3 " style={{ margin:"auto" }}>
                <div
                  class="d-flex justify-content-letf"
                  style={{ width: "80%" }}
                >
                  <img
                    class=""
                    src="images/icons/delivery.png"
                    style={{ height: 60 }}
                  />
                </div>
              </div>
              
              <div className="row-sm-3 mb-3 " style={{ margin:"auto" }}>
                <div
                  class="d-flex justify-content-center"
                  style={{ width: "80%" }}
                >
                  <img
                    class=""
                    src="images/icons/delivery_cycle.png"
                    style={{ height: 60 }}
                  />
                </div>
              </div>
              <div className="row-sm-3 mb-3 " style={{ margin:"auto" }}>
                <div
                  class="d-flex justify-content-right"
                  style={{ width: "80%" }}
                >
                  <img
                    class=""
                    src="images/icons/cash_on.png"
                    style={{ height: 60 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </MobileView>
      </div>
    );
  };

  recentlySearched = () => {
    return (
      <div class="container mt-3">
        <h4>সাম্প্রতি খোজা বই</h4>
        {this.firstRow()}
      </div>
    );
  };

  fetchBooks = () => {
    fetch(helper.prefix + "book/book_order")
      .then(res => res.json())
      .then(book => {
        console.log("Order by books", book.cat_orders);
        this.setState({ cat_orders: book.cat_orders });
      });
  };

  fetchPublishers = () => {
    fetch(helper.prefix + "publishers")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched publishers", data.publishers);
        this.setState({ publishers: data.publishers });
      });
  };

  fetchBooksRow = () => {
    if (this.state.cat_orders) {
      return this.state.cat_orders.map((data, index) => {
        console.log("Books to show", data.books);
        if (data.books.length > 6) {
          return this.firstRow(data.category, data.books, data.category_id);
          // <div>{this.adRow()}</div>
        }
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <MainSlider />
        {/* <div class="container">{this.adRow()}</div> */}
        <section class="wn__product__area brown--color pt--20  pb--20">
          <div class="container">{this.fetchBooksRow()}</div>
        </section>

        {this.bestWrtiters()}

        {this.subscribe()}

        {this.sellers()}

        {this.services()}

        {/* {this.recentlySearched()} */}
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  fetchBooks: PropTypes.func.isRequired,
  seeMore: PropTypes.func.isRequired
};

export default connect(
  null,
  { fetchBooks, seeMore}
)(Home);