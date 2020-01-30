import React, { Component } from "react";
// import loadjs from "loadjs";

import ProductExtra from "./productextra";
import ListBook from "./listbook";
import productexData from "./../dummyData/productex";
import FontAwesome from "react-fontawesome";
import { Checkbox } from "react-bootstrap";
import * as helper from "../helper";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-modal";
// import { makeStyles } from '@material-ui/core/styles';
// import LinearProgress from '@material-ui/core/LinearProgress';
import { Growl } from 'primereact/growl';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import {
  fetchBooks,
  sortBooks,
  selectAuthor,
  selectPublisher
} from "../actions/bookActions";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

import {
  // Route,
  Link
  // NavLink,
  // Redirect,
  // Prompt
} from "react-router-dom";

const customStyles = {
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginTop: 80,
    marginLeft: 10,
    marginRight: 10,
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const customStyles2 = {
  content: {
    position: 'absolute',
    top: '39%',
    left: '47%',
    right: 'auto',
    bottom: 'auto',
    border: '1px solid rgb(204, 204, 204)',
    background: 'rgb(255, 255, 255)',
    overflow: 'auto',
    borderRadius: 4,
    outline: 'none',
    padding: 20,
    marginTop: 61,
    marginLeft: 10,
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
  }
};

// const useStyles = makeStyles({
//   root: {
//     flexGrow: 1,
//   },
// });


class shopGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: null,
      authorBooks: null,
      authors: null,
      authorFilterTxt: null,
      publishers: null,
      publisherFilterTxt: null,
      sortMobile: false,
      filterMobile: false,
      filterAuthor: true,
      filterPublisher: false
    };
    window.scrollTo(0, 0);
    this.fetchAuthors();
    this.fetchPublishers();
    this.showSuccess = this.showSuccess.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.showWarn = this.showWarn.bind(this);
    this.showError = this.showError.bind(this);
    this.showMultiple = this.showMultiple.bind(this);
    this.showSticky = this.showSticky.bind(this);
    this.showCustom = this.showCustom.bind(this);
    this.clear = this.clear.bind(this);
  }

  showSuccess() {
    this.growl.show({ severity: 'success', summary: 'Success Message', detail: 'Order submitted' });
  }

  showInfo() {
    this.growl.show({ severity: 'info', summary: 'Info Message', detail: 'PrimeReact rocks' });
  }

  showWarn() {
    this.growl.show({ severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
  }

  showError() {
    this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
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



  fetchAuthors = () => {
    fetch(helper.prefix + "authors")
      .then(res => res.json())
      .then(data => {
        this.setState({ authors: data.authors });
        console.log("we gooooooooooooot authors", data.authors);
      });
  };

  fetchPublishers = () => {
    fetch(helper.prefix + "publishers")
      .then(res => res.json())
      .then(data => {
        this.setState({ publishers: data.publishers });
        console.log("we gooooooooooooot publishers", data.publishers);
      });
  };

  handleOptionChange = changeEvent => {
    this.props.sortBooks(this.props.books, changeEvent.target.value);
    window.scrollTo(0, 0);
    this.setState({ sortMobile: false });
    console.log("latest books, ", this.props.books);
  };

  componentWillMount() {
    // this.props.fetchBooks();
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.newBook) {
    //   this.props.books.unshift(nextProps.newBook);
    // }
  }

  filterAuthor = e => {
    this.setState({ authorFilterTxt: e.target.value });
    fetch(helper.prefix + "filter/author/?data=" + e.target.value, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({ authors: data.authors });
        }
      });
  };

  filterPublisher = e => {
    this.setState({ publisherFilterTxt: e.target.value });
    fetch(helper.prefix + "filter/publisher/?data=" + e.target.value, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({ publishers: data.publishers });
        }
      });
  };

  booksTitle = () => {
    if (this.props.books.author) {
      return this.props.books.author.name;
    } else if (this.props.books.publisher) {
      return this.props.books.publisher.name;
    } else if (this.props.books.category) {
      return this.props.books.category.name;
    }
  };

  authordetails = () => {
    if (this.props.books.author) {
      return (
        <div class="row m-0">
          <div class="col-2">
            <BrowserView>
              <div class="browse__meta--thumbnail">
                <img
                  class="img-fluid rounded-circle"
                  src={this.props.books.author.image === null ? "images/default/default-avatar.png" : this.props.books.author.image}
                  style={{ width: 100, height: 100 }}
                />
              </div>
            </BrowserView>
            <MobileView>
              <div
                class="browse__meta--thumbnail"
                style={{ width: 54, paddingRight: 10 }}
              >
                <img
                  style={{ width: 54, height: 54 }}
                  class="img-fluid rounded-circle"
                  src={this.props.books.author.image === null ? "images/default/default-avatar.png" : this.props.books.author.image}
                />
              </div>
            </MobileView>
          </div>
          <div class="col-10">
            <h4 class="browse__meta--title" style={{ paddingTop: 14, paddingLeft: 10 }}>{this.props.books.author.name}</h4>
            <p class="browse__meta--description js--browse__meta--description">
              {this.props.books.author.description}
            </p>
          </div>
        </div>
      );
    } else if (this.props.books.publisher) {
      return (
        <div class="row m-0">
        {/* <img src="images/publishers/cover.jpg" alt="cover"/> */}
          <div class="col-2">
            <BrowserView>
              <div class="browse__meta--thumbnail">
                <img
                  style={{ width: 100, height: 100 }}
                  class="img-fluid rounded-circle"
                  src={this.props.books.publisher.image === null ? "images/default/publisher.png" : this.props.books.publisher.image}
                />
              </div>
            </BrowserView>
            <MobileView>
              <div
                class="browse__meta--thumbnail"
                style={{ width: 54, paddingRight: 10 }}
              >
                <img
                  style={{ width: 54, height: 54 }}
                  class="img-fluid rounded-circle"
                  src={this.props.books.publisher.image === null ? "images/default/publisher.png" : this.props.books.publisher.image}
                />
              </div>
            </MobileView>
          </div>
          <div class="col-10">
            <h4 class="browse__meta--title" style={{ paddingTop: 14, paddingLeft: 10 }}>
              {this.props.books.publisher.name}
            </h4>
            <p class="browse__meta--description js--browse__meta--description">
              {this.props.books.publisher.description}
            </p>
          </div>
        </div>
      );
    }
  };

  showBooks = () => {
    if (
      this.props.books.books.data !== null ||
      this.props.books.books.data !== []
    ) {
      let books = this.props.books.books.data;
      console.log("book ", this.props.books);
      return books.map((item, index) => {
        console.log("book ", item.title);
        return (
          <ProductExtra
            cart_book={item}
            image={item.cover}
            price={item.old_price}
            discount={item.discount}
            name={item.title}
            author={
              item.author
                ? null
                : this.props.books.author !== null
                  ? this.props.books.author.name
                  : null
            }
            writer={item.author}
            stock={item.stock}
            id={item.id}
            history={this.props.history}
          />
        );
      });
    }
  };

  handleAuthorChange = event => {
    let author = JSON.parse(event.target.value);
    this.props.fetchBooks(helper.prefix + "author/books/" + author.id);
    this.props.selectAuthor(author.name);
    this.props.selectPublisher(null);
    this.setState({ filterMobile: false })
    console.log("book ", this.props.selectedAuthor);
  };

  authorSort = () => {
    if (this.state.authors !== null) {
      window.scrollTo(0, 0);
      return this.state.authors.map((author, index) => {
        return (
          <li>
            <div className="radio">
              <label for={author.name}>
                <input
                  type="checkbox"
                  class="mr-2"
                  id={author.name}
                  for={author.name}
                  checked={this.props.selectedAuthor === author.name}
                  value={JSON.stringify(author)}
                  onChange={this.handleAuthorChange}
                />
                {author.name}
              </label>
            </div>
          </li>
        );
      });
    }
  };

  handlePublisherChange = event => {
    let publisher = JSON.parse(event.target.value);
    this.props.fetchBooks(helper.prefix + "publisher/books/" + publisher.id);
    this.props.selectPublisher(publisher.name);
    this.props.selectAuthor(null);
    this.setState({ filterMobile: false })
    console.log("boon", this.props.selectedPublisher);
  };

  publisherSort = () => {
    if (this.state.publishers !== null) {
      window.scrollTo(0, 0);
      return this.state.publishers.map((publisher, index) => {
        return (
          <li>
            <div className="radio">
              <label for={publisher.name}>
                <input
                  type="checkbox"
                  class="mr-2"
                  id={publisher.name}
                  for={publisher.name}
                  checked={this.props.selectedPublisher === publisher.name}
                  value={JSON.stringify(publisher)}
                  onChange={this.handlePublisherChange}
                />
                {publisher.name}
              </label>
            </div>
          </li>
        );
      });
    }
  };

  pagination = () => {
    try {
      if (
        this.props.books.books.data !== null ||
        this.props.books.books.data !== []
      ) {
        return (
          <React.Fragment>
            <li
              style={{
                display:
                  this.props.books.books.prev_page_url !== null
                    ? "inline"
                    : "none"
              }}
            >
              <Link
                onClick={() => {
                  this.props.fetchBooks(this.props.books.books.prev_page_url);
                  window.scrollTo(0, 0);
                }}
              >
                Previous
              </Link>
            </li>
            <li class="active">
              page{" "}
              <Link
                style={{
                  borderColor: "#363636",
                  color: "white",
                  backgroundColor: "#363636"
                }}
              >
                {this.props.books.books.current_page}
              </Link>{" "}
              of{" "}
              <span style={{ fontWeight: "bold", fontSize: 18 }}>
                {this.props.books.books.last_page}
              </span>
            </li>
            <li
              style={{
                display:
                  this.props.books.books.next_page_url !== null
                    ? "inline"
                    : "none"
              }}
            >
              <Link
                onClick={() => {
                  this.props.fetchBooks(this.props.books.books.next_page_url);
                  window.scrollTo(0, 0);
                }}
              >
                Next
              </Link>
            </li>
          </React.Fragment>
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  closeModal = () => {
    this.setState({ sortMobile: false });
    this.setState({ filterMobile: false });
  };

  mobileSorting = () => {
    return (
      <Modal
        isOpen={this.state.sortMobile}
        // onAfterOpen={this.afterOpenModal}
        onRequestClose={() => this.closeModal()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1 class="mobile-sort-header">Sort by</h1>
        <ul>
          <li>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  class="mr-2"
                  value="plowToHigh"
                  checked={this.props.selectedOption === "plowToHigh"}
                  onChange={this.handleOptionChange}
                />
                Price - Low to High
              </label>
            </div>
          </li>
          <li>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  class="mr-2"
                  value="phighToLow"
                  checked={this.props.selectedOption === "phighToLow"}
                  onChange={this.handleOptionChange}
                />
                Price - High to Low
              </label>
            </div>
          </li>
          <li>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  class="mr-2"
                  value="dlowToHigh"
                  checked={this.props.selectedOption === "dlowToHigh"}
                  onChange={this.handleOptionChange}
                />
                Discount - Low to High
              </label>
            </div>
          </li>
          <li>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  class="mr-2"
                  value="dhighToLow"
                  checked={this.props.selectedOption === "dhighToLow"}
                  onChange={this.handleOptionChange}
                />
                Discount - High to Low
              </label>
            </div>
          </li>
        </ul>
      </Modal>
    );
  };

  mobileFilterCat = () => {
    if (this.state.filterAuthor) {
      return (
        <React.Fragment>
          <div class="input-group input-group-sm filter-search mt-1 mb-2">
            <input
              type="search"
              class="form-control js--client_search"
              placeholder="&#9906;"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              value={this.state.authorFilterTxt}
              onChange={e => this.filterAuthor(e)}
            />
          </div>
          <ul style={{ height: '75%', overflowY: "scroll" }}>
            {this.authorSort()}
          </ul>
        </React.Fragment>
      )
    } else if (this.state.filterPublisher) {
      return (
        <React.Fragment>
          <div class="input-group input-group-sm filter-search mt-1 mb-2">
            <input
              type="search"
              class="form-control js--client_search"
              placeholder="&#9906;"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              value={this.state.publisherFilterTxt}
              onChange={e => this.filterPublisher(e)}
            />
          </div>
          <ul style={{ height: '75%', overflowY: "scroll" }}>
            {this.publisherSort()}
          </ul>
        </React.Fragment>
      )
    }
  }

  mobileFilter = () => {
    return (
      <Modal
        isOpen={this.state.filterMobile}
        // onAfterOpen={this.afterOpenModal}
        onRequestClose={() => this.closeModal()}
        style={customStyles2}
        contentLabel="Example Modal"
      >
        <div class="row d-flex justify-content-flex-between">
          <div class="col">
            <button type="button" class="btn btn-danger" onClick={() => this.setState({ filterMobile: false })}>Close</button>
          </div>
          <div class="col">
            <h1 class="">Filter</h1>
          </div>
        </div>
        <div class="btn-group mt-2" role="group" aria-label="Basic example" style={{ width: '100%' }}>
          <button type="button" class="btn btn-secondary" style={{ width: '50%', background: this.state.filterAuthor ? "gray" : ' ' }}
            onClick={() => this.setState({ filterAuthor: true, filterPublisher: false })}
          >Author</button>
          <button type="button" class="btn btn-secondary" style={{ width: '50%', background: this.state.filterPublisher ? "gray" : ' ' }}
            onClick={() => this.setState({ filterPublisher: true, filterAuthor: false, })}
          >Publisher</button>
        </div>
        {this.mobileFilterCat()}
      </Modal>
    );
  };

  // loadingProgress = () => {
  //   return (
  //     <div className={useStyles.root}>
  //       <LinearProgress />
  //       <br />
  //     </div>
  //   )
  // }

  render() {
    console.log(this.props.books);
    return (
      <React.Fragment>
        <div class="page-shop-sidebar left--sidebar bg--white section-padding--lg">
          <div class="container books_container">
            <div class="row m-0">
              <div class="col-lg-3 col-12 order-2 order-lg-1 md-mt-40 sm-mt-40">
                <BrowserView>
                  <div class="shop__sidebar">
                    <aside class="wedget__categories poroduct--cat">
                      <form>
                        <div
                          class="row m-0 d-flex justify-content-between"
                          style={{ borderBottom: "1px solid #2e2e2e" }}
                        >
                          <div class="row m-0">
                            <FontAwesome
                              name="fas fa-sort"
                              style={{
                                color: "black",
                                marginRight: 10,
                                fontSize: 15,
                                marginTop: 3
                              }}
                            />
                            <h3 class="wedget__title">Sort</h3>
                          </div>
                          <p
                            class="text-primary"
                            style={{ cursor: "pointer", fontSize: 15 }}
                          >
                            RESET
                          </p>
                        </div>
                        <ul>
                          <li>
                            <div className="radio">
                              <label>
                                <input
                                  type="radio"
                                  class="mr-2"
                                  value="plowToHigh"
                                  checked={
                                    this.props.selectedOption === "plowToHigh"
                                  }
                                  onChange={this.handleOptionChange}
                                />
                                Price - Low to High
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="radio">
                              <label>
                                <input
                                  type="radio"
                                  class="mr-2"
                                  value="phighToLow"
                                  checked={
                                    this.props.selectedOption === "phighToLow"
                                  }
                                  onChange={this.handleOptionChange}
                                />
                                Price - High to Low
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="radio">
                              <label>
                                <input
                                  type="radio"
                                  class="mr-2"
                                  value="dlowToHigh"
                                  checked={
                                    this.props.selectedOption === "dlowToHigh"
                                  }
                                  onChange={this.handleOptionChange}
                                />
                                Discount - Low to High
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="radio">
                              <label>
                                <input
                                  type="radio"
                                  class="mr-2"
                                  value="dhighToLow"
                                  checked={
                                    this.props.selectedOption === "dhighToLow"
                                  }
                                  onChange={this.handleOptionChange}
                                />
                                Discount - High to Low
                              </label>
                            </div>
                          </li>
                        </ul>
                      </form>
                    </aside>
                    {/* <aside class="wedget__categories poroduct--cat">
                  <div
                    class="row m-0 d-flex justify-content-between"
                    style={{ borderBottom: "1px solid #2e2e2e" }}
                  >
                    <div class="row m-0">
                      <FontAwesome
                        name="fas fa-filter"
                        style={{
                          color: "black",
                          marginRight: 10,
                          fontSize: 20
                        }}
                      />
                      <h3 class="wedget__title">Filter</h3>
                    </div>
                    <p
                      class="text-primary"
                      style={{ cursor: "pointer", fontSize: 15 }}
                    >
                      CLEAR ALL
                    </p>
                  </div>
                  <div class="row m-0 p-2 pt-4">
                    <aside class="wedget__categories poroduct--tag">
                      <ul>
                        <li>
                          <a href="#"> নিষিদ্ধ বই x</a>
                        </li>
                        <li>
                          <a href="#"> বেস্ট সেলার বই x</a>
                        </li>
                        <li>
                          <a href="#">পাঠক কর্নার x</a>
                        </li>
                        <li>
                          <a href="#">ধর্মিয় বই x</a>
                        </li>
                        <li>
                          <a href="#">মুক্তিযুদ্ধ x</a>
                        </li>
                        <li>
                          <a href="#">পশ্চিম বঙ্গের বই x</a>
                        </li>
                        <li>
                          <a href="#">কিশোর সাহিত্য x</a>
                        </li>
                        <li>
                          <a href="#">বিজ্ঞান x</a>
                        </li>
                      </ul>
                    </aside>
                    <h4 style={{ fontWeight: "normal" }}>উপন্যাস</h4>
                    <FontAwesome
                      name="fas fa-sort-down"
                      style={{
                        color: "black",
                        marginRight: 10,
                        fontSize: 20,
                        paddingLeft: 10
                      }}
                    />
                  </div>
                  <ul style={{ height: 300, overflowY: "scroll" }}>
                    <li class="row m-0 ml-4">
                      <p class="pr-2">০</p>
                      <p class="filter_text">সমকালীন উপন্যাস</p>
                    </li>
                    <li class="row m-0 ml-4">
                      <p class="pr-2">০</p>
                      <p class="filter_text">চিরায়ত উপন্যাস</p>
                    </li>
                    <li class="row m-0 ml-4">
                      <p class="pr-2">০</p>
                      <p class="filter_text">সায়েন্স ফিকশন</p>
                    </li>
                    <li class="row m-0 ml-4">
                      <p class="pr-2">০</p>
                      <p class="filter_text">রোমান্টিক উপন্যাস</p>
                    </li>
                    <li class="row m-0 ml-4">
                      <p class="pr-2">০</p>
                      <p class="filter_text">
                        মুক্তিযুদ্ধভিত্তিক ও রাজনৈতিক উপন্যাস
                      </p>
                    </li>
                    <li class="row m-0 ml-4">
                      <p class="pr-2">০</p>
                      <p class="filter_text">শিশু-কিশোর উপন্যাস</p>
                    </li>
                    <li class="row m-0 ml-4">
                      <p class="pr-2">০</p>
                      <p class="filter_text">থ্রিলার ও অ্যাডভেঞ্চার উপন্যাস</p>
                    </li>
                    <li class="row m-0 ml-4">
                      <p class="pr-2">০</p>
                      <p class="filter_text">ঐতিহাসিক উপন্যাস</p>
                    </li>
                  </ul>
                </aside> */}
                    <aside class="wedget__categories poroduct--cat">
                      <form>
                        <div>
                          <h3
                            class="wedget__title"
                            style={{ borderBottom: "1px solid #2e2e2e" }}
                          >
                            Authors
                          </h3>
                        </div>
                        <div class="input-group input-group-sm filter-search mt-1 mb-2">
                          <input
                            type="search"
                            class="form-control js--client_search"
                            placeholder="&#9906;"
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            value={this.state.authorFilterTxt}
                            onChange={e => this.filterAuthor(e)}
                          />
                        </div>
                        <ul style={{ height: 300, overflowY: "scroll" }}>
                          {this.authorSort()}
                        </ul>
                      </form>
                    </aside>
                    <aside class="wedget__categories poroduct--cat">
                      <form>
                        <div>
                          <h3
                            class="wedget__title"
                            style={{ borderBottom: "1px solid #2e2e2e" }}
                          >
                            Publishers
                          </h3>
                        </div>
                        <div class="input-group input-group-sm filter-search mt-1 mb-2">
                          <input
                            type="search"
                            class="form-control js--client_search"
                            placeholder="&#9906;"
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            value={this.state.publisherFilterTxt}
                            onChange={e => this.filterPublisher(e)}
                          />
                        </div>
                        <ul style={{ height: 300, overflowY: "scroll" }}>
                          {this.publisherSort()}
                        </ul>
                      </form>
                    </aside>
                    {/* <aside class="wedget__categories pro--range">
                      <h3 class="wedget__title">Filter by price</h3>
                      <div class="content-shopby">
                        <div class="price_filter s-filter clear">
                          <form action="#" method="GET">
                            <div id="slider-range" />
                            <div class="slider__range--output">
                              <div class="price__output--wrap">
                                <div class="price--output">
                                  <span>Price :</span>
                                  <input type="text" id="amount" readonly="" />
                                </div>
                                <div class="price--filter">
                                  <a href="#">Filter</a>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </aside> */}
                    {/* <aside class="wedget__categories poroduct--cat">
                  <form>
                    <div>
                      <h3
                        class="wedget__title"
                        style={{ borderBottom: "1px solid #2e2e2e" }}
                      >
                        Languages
                      </h3>
                    </div>
                    <ul style={{ height: 300, overflowY: "scroll" }}>
                      <li>
                        <div class="input-group input-group-sm filter-search mt-1">
                          <input
                            type="search"
                            class="form-control js--client_search"
                            placeholder="&#9906;"
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                          />
                        </div>
                      </li>
                      <li>
                        <div className="radio">
                          <label for="exampleCheck22">
                            <input
                              type="checkbox"
                              class="mr-2"
                              id="exampleCheck22"
                              for="exampleCheck22"
                            />
                            ইংরেজি
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="radio">
                          <label for="exampleCheck23">
                            <input
                              type="checkbox"
                              class="mr-2"
                              id="exampleCheck23"
                              for="exampleCheck23"
                            />
                            বাংলা
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="radio">
                          <label for="exampleCheck32">
                            <input
                              type="checkbox"
                              class="mr-2"
                              id="exampleCheck32"
                              for="exampleCheck32"
                            />
                            হিন্দি
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="radio">
                          <label for="exampleCheck43">
                            <input
                              type="checkbox"
                              class="mr-2"
                              id="exampleCheck43"
                              for="exampleCheck43"
                            />
                            আরবী এবং ইংরেজি
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="radio">
                          <label for="exampleCheck52">
                            <input
                              type="checkbox"
                              class="mr-2"
                              id="exampleCheck52"
                              for="exampleCheck52"
                            />
                            বাংলা ও ইংরেজী
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="radio">
                          <label for="exampleCheck62">
                            <input
                              type="checkbox"
                              class="mr-2"
                              id="exampleCheck62"
                              for="exampleCheck62"
                            />
                            আরবী
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="radio">
                          <label for="exampleCheck7">
                            <input
                              type="checkbox"
                              class="mr-2"
                              id="exampleCheck7"
                              for="exampleCheck7"
                            />
                            অন্যান্য ভাষা
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="radio">
                          <label for="exampleCheck96">
                            <input
                              type="checkbox"
                              class="mr-2"
                              id="exampleCheck96"
                              for="exampleCheck96"
                            />
                            উর্দু
                          </label>
                        </div>
                      </li>
                    </ul>
                  </form>
                </aside> */}
                    {/* <aside class="wedget__categories pro--range">
                      <div>
                        <h3
                          class="wedget__title"
                          style={{ borderBottom: "1px solid #2e2e2e" }}
                        >
                          Ratings
                        </h3>
                      </div>
                      <ul>
                        <li>
                          <div className="radio">
                            <label for="exampleCheck25">
                              <input
                                type="checkbox"
                                class="mr-2"
                                id="exampleCheck52"
                                for="exampleCheck52"
                              />
                              <FontAwesome
                                name="fas fa-star"
                                style={{ fontSize: 18, color: "#FF9900" }}
                              />
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="radio">
                            <label for="exampleCheck24">
                              <input
                                type="checkbox"
                                class="mr-2"
                                id="exampleCheck24"
                                for="exampleCheck24"
                              />
                              <FontAwesome
                                name="fas fa-star"
                                style={{
                                  fontSize: 18,
                                  color: "#FF9900",
                                  marginRight: 5
                                }}
                              />
                              <FontAwesome
                                name="fas fa-star"
                                style={{
                                  fontSize: 18,
                                  color: "#FF9900",
                                  marginRight: 5
                                }}
                              />
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="radio">
                            <label for="exampleCheck35">
                              <input
                                type="checkbox"
                                class="mr-2"
                                id="exampleCheck35"
                                for="exampleCheck35"
                              />
                              <FontAwesome
                                name="fas fa-star"
                                style={{
                                  fontSize: 18,
                                  color: "#FF9900",
                                  marginRight: 5
                                }}
                              />
                              <FontAwesome
                                name="fas fa-star"
                                style={{
                                  fontSize: 18,
                                  color: "#FF9900",
                                  marginRight: 5
                                }}
                              />
                              <FontAwesome
                                name="fas fa-star"
                                style={{
                                  fontSize: 18,
                                  color: "#FF9900",
                                  marginRight: 5
                                }}
                              />
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="radio">
                            <label for="exampleCheck44">
                              <input
                                type="checkbox"
                                class="mr-2"
                                id="exampleCheck44"
                                for="exampleCheck44"
                              />
                              <FontAwesome
                                name="fas fa-star"
                                style={{
                                  fontSize: 18,
                                  color: "#FF9900",
                                  marginRight: 5
                                }}
                              />
                              <FontAwesome
                                name="fas fa-star"
                                style={{
                                  fontSize: 18,
                                  color: "#FF9900",
                                  marginRight: 5
                                }}
                              />
                              <FontAwesome
                                name="fas fa-star"
                                style={{
                                  fontSize: 18,
                                  color: "#FF9900",
                                  marginRight: 5
                                }}
                              />
                              <FontAwesome
                                name="fas fa-star"
                                style={{
                                  fontSize: 18,
                                  color: "#FF9900",
                                  marginRight: 5
                                }}
                              />
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="radio">
                            <label for="exampleCheck53">
                              <input
                                type="checkbox"
                                class="mr-2"
                                id="exampleCheck53"
                                for="exampleCheck53"
                              />

                              <FontAwesome
                                name="fas fa-star"
                                style={{
                                  fontSize: 18,
                                  color: "#FF9900",
                                  marginRight: 5
                                }}
                              />
                              <FontAwesome
                                name="fas fa-star"
                                style={{
                                  fontSize: 18,
                                  color: "#FF9900",
                                  marginRight: 5
                                }}
                              />
                              <FontAwesome
                                name="fas fa-star"
                                style={{
                                  fontSize: 18,
                                  color: "#FF9900",
                                  marginRight: 5
                                }}
                              />
                              <FontAwesome
                                name="fas fa-star"
                                style={{
                                  fontSize: 18,
                                  color: "#FF9900",
                                  marginRight: 5
                                }}
                              />
                              <FontAwesome
                                name="fas fa-star"
                                style={{
                                  fontSize: 18,
                                  color: "#FF9900",
                                  marginRight: 5
                                }}
                              />
                            </label>
                          </div>
                        </li>
                      </ul>
                    </aside> */}
                  </div>
                </BrowserView>
              </div>

              <div class="col-lg-9 col-12 order-1 order-lg-2">
                {/* {this.loadingProgress()} */}
                <div class="tab__container">
                  <div
                    class="shop-grid tab-pane fade show active"
                    id="nav-grid"
                    role="tabpanel"
                  >
                    {this.authordetails()}
                    <MobileView>
                      {this.mobileSorting()}
                      {this.mobileFilter()}
                      <div
                        class="row pt-3 pl-2 pr-3 mb-3"
                        style={{ borderBottom: "1px solid gray" }}
                      >
                        <div
                          class="col"
                          style={{ borderRight: "1px solid gray" }}
                          onClick={() => {
                            console.log("book");
                            this.setState({ sortMobile: true });
                          }}
                        >
                          <button class="btn" style={{ background: "none" }}>
                            <i class="fa fa-sort"></i> Sort
                          </button>
                        </div>
                        <div class="col"
                          onClick={() => {
                            this.setState({ filterMobile: true });
                          }}
                        >
                          <button class="btn" style={{ background: "none" }}>
                            <i class="fa fa-filter"></i> Filter
                          </button>
                        </div>
                      </div>
                    </MobileView>
                    <BrowserView>
                      <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                          <li class="breadcrumb-item">
                            <Link to="/">Home</Link>
                          </li>

                          <li class="breadcrumb-item">
                            <Link to="/">Books</Link>
                          </li>
                          <li class="breadcrumb-item">
                            <Link>
                              {this.props.books.author
                                ? "author"
                                : this.props.books.publisher
                                  ? "publisher"
                                  : "category"}
                            </Link>
                          </li>
                          <li
                            class="breadcrumb-item active"
                            aria-current="page"
                          >
                            {this.booksTitle()}
                          </li>
                        </ol>
                      </nav>
                    </BrowserView>
                    <div class="row m-0">
                      <div class="col-lg-12">
                        <h1 style={{ fontSize: "150%", fontWeight: 400 }}>
                          {this.booksTitle()} এর বই সমূহ
                        </h1>

                        {/* <p>(Showing 1 to 60 of 20147 books)</p> */}
                      </div>
                    </div>
                    <div class="row m-0">
                      {this.props.books.books !== null
                        ? this.showBooks()
                        : console.log("no books found")}
                    </div>
                    <ul class="wn__pagination mt-3">{this.pagination()}</ul>
                  </div>
                  <div
                    class="shop-grid tab-pane fade"
                    id="nav-list"
                    role="tabpanel"
                  >
                    {productexData.map((item, index) => {
                      return (
                        <ListBook
                          key={index}
                          image={item.image}
                          scndimage={item.scndimage}
                          tag={item.tag}
                          price={item.price}
                          oldprice={item.oldprice}
                          name={item.name}
                        />
                      );
                    })}
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

shopGrid.propTypes = {
  fetchBooks: PropTypes.func.isRequired,
  selectPublisher: PropTypes.func.isRequired,
  selectAuthor: PropTypes.func.isRequired,
  sortBooks: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
  newBook: PropTypes.object
};

const mapStateToProps = state => ({
  books: state.books.items,
  newBook: state.books.item,
  selectedOption: state.books.selectedOption,
  selectedAuthor: state.books.selectedAuthor,
  selectedPublisher: state.books.selectedPublisher
});

// export default shopGrid;
export default connect(
  mapStateToProps,
  { fetchBooks, sortBooks, selectAuthor, selectPublisher }
)(shopGrid);
