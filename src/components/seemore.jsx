import React, { Component } from "react";
import * as helper from "./../helper";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBooks } from "../actions/bookActions";
import FontAwesome from "react-fontawesome";

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

class seeMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: null,
      categories: null,
      publishers: null
    };
    window.scrollTo(0, 0);
    this.fetchData();
  }

  fetchData = () => {
    fetch(helper.prefix + "authors/all")
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          this.setState({ authors: response.authors });
        }
      });
    fetch(helper.prefix + "category/all")
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          this.setState({ categories: response.categories });
        }
      });
    fetch(helper.prefix + "publisher/all")
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          this.setState({ publishers: response.publishers });
        }
      });
    // }
  };

  changePage = (url) =>{
    if (this.props.type === "author"){
      fetch( url)
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          this.setState({ authors: response.authors });
        }
      });
    }else if(this.props.type === "publisher"){
      fetch( url)
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          this.setState({ publishers: response.publishers });
        }
      });
    }else if(this.props.type === "category"){
      fetch( url)
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          this.setState({ categories: response.categories });
        }
      });
    }
  }

  pagination = () => {
    let data = null;
    if (this.props.type === "author"){
      data = this.state.authors
    }else if(this.props.type === "publisher"){
      data = this.state.publishers
    }else if(this.props.type === "category"){
      data = this.state.categories
    }
    try {
      if (
        data != null ||
        data != []
      ) {
        return (
          <React.Fragment>
            <li
              style={{
                display:
                  data.prev_page_url != null
                    ? "inline"
                    : "none"
              }}
            >
              <Link
                onClick={() => {
                  this.changePage(data.prev_page_url);
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
                {data.current_page}
              </Link>{" "}
              of{" "}
              <span style={{ fontWeight: "bold", fontSize: 18 }}>
                {data.last_page}
              </span>
            </li>
            <li
              style={{
                display:
                  data.next_page_url != null
                    ? "inline"
                    : "none"
              }}
            >
              <Link
                onClick={() => {
                  this.changePage(data.next_page_url);
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

  fetchItems = () => {
    if (this.props.type === "author") {
      if (this.state.authors != null) {
        return this.state.authors.data.map((author, index) => {
          return (
            <div class="col-md-3 mb-3" key={index}>
              <Link
                to="/shopGrid"
                onClick={() => {
                  this.props.fetchBooks(
                    helper.prefix + "author/books/" + author.id
                  );
                  console.log(author.id);
                }}
              >
                <div class="d-flex justify-content-center">
                  
                    <img
                      class="m-pubp-img"
                      src={author.image == null ? "images/default/default-avatar.png" : author.image}
                      style={{
                        borderRadius: "100%",
                        width: 120,
                        height: 120,
                        backgroundColor: "#F1F2EE",
                        borderRadius: "100%"
                      }}
                    />
        
                </div>
                <p style={{ color: "black", textAlign: "center" }}>
                  {author.name}
                </p>
              </Link>
            </div>
          );
        });
      }
    } else if (this.props.type === "publisher") {
      if (this.state.publishers != null) {
        return this.state.publishers.data.map((publisher, index) => {
          return (
            <div class="col-md-3 mb-3" key={index}>
              <Link
                to="/shopGrid"
                onClick={() => {
                  this.props.fetchBooks(
                    helper.prefix + "publisher/books/" + publisher.id
                  );
                  console.log(publisher.id);
                }}
              >
                <div class="d-flex justify-content-center">
                    <img
                      class="m-pubp-img"
                      src={publisher.image == null ? "images/default/publisher.png" : publisher.image}
                      style={{
                        borderRadius: "100%",
                        width: 120,
                        height: 120
                      }}
                    />
                </div>
                <p style={{ color: "black", textAlign: "center" }}>
                  {publisher.name}
                </p>
              </Link>
            </div>
          );
        });
      }
    } else if (this.props.type === "category") {
      if (this.state.categories != null) {
        return this.state.categories.data.map((category, index) => {
          return (
            <div class="col-md-3 mb-3" key={index}>
               <Link
                to="/shopGrid"
                onClick={() => {
                  this.props.fetchBooks(
                    helper.prefix + "category/" + category.id
                  );
                  console.log(category  .id);
                }}
              >
              <div
                class="d-flex align-items-center seeMcat"
                style={{
                  background: "#F1F2EE",
                  height: 150,
                  width: "100%",
                  borderRadius: 10,
                  cursor: 'pointer'
                }}
              >
                <p
                  class="seeMcatP ml-auto mr-auto"
                  style={{ textAlign: "center", width: '80%'}}
                >
                  {category.name}
                </p>
              </div>
              </Link>
            </div>
          );
        });
      }
    }
  };

  render() {
    console.log(this.props.books);
    return (
      <React.Fragment>
        <div class="container">
          <div class="row d-flex justify-content-center mt-4">
            <p class="search_fv ">Search your favorite {this.props.type}</p>
            <div class="col-md-6 input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="enter keyword"
              />
              <div
                class="input-group-append"
                style={{ background: "gray", width: 39 }}
              >
                <FontAwesome
                  name="search"
                  style={{ color: "white", padding: 10, cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
          <div class="row mt-3">{this.fetchItems()}</div>
          <ul class="wn__pagination mt-3">{this.pagination()}</ul>
        </div>
      </React.Fragment>
    );
  }
}

seeMore.propTypes = {
  fetchBooks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  type: state.books.seemore
});

// export default seeMore;
export default connect(
  mapStateToProps,
  { fetchBooks }
)(seeMore);
