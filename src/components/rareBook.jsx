import React, { Component } from "react";
import ProductExtra from "./productextra";
import ListBook from "./listbook";
import productexData from "./../dummyData/productex";
import * as helper from "../helper";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import {
  fetchBooks,
  sortBooks,
  selectAuthor,
  selectPublisher
} from "../actions/bookActions";

class rareBook extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }
  showBooks = () => {
    if (
      this.props.books.books.data != null ||
      this.props.books.books.data != []
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
                : this.props.books.author != null
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
  pagination = () => {
    try {
      if (
        this.props.books.books.data != null ||
        this.props.books.books.data != []
      ) {
        return (
          <React.Fragment>
            <li
              style={{
                display:
                  this.props.books.books.prev_page_url != null
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
                  this.props.books.books.next_page_url != null
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

  render() {
    console.log(this.props.books);
    return (
      <React.Fragment>
        <div class="page-shop-sidebar left--sidebar bg--white section-padding--lg">
          <div class="container books_container">
            <div class="col-lg-12 col-12 order-1 order-lg-2">
              {/* {this.loadingProgress()} */}
              <div class="tab__container">
                <div
                  class="shop-grid tab-pane fade show active"
                  id="nav-grid"
                  role="tabpanel"
                >
                  {this.props.fetchBooks(helper.prefix + "category/" + 1596)}
                  <div class="row m-0">
                    {this.props.books.books != null
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  books: state.books.items,
  newBook: state.books.item,
  selectedOption: state.books.selectedOption,
  selectedAuthor: state.books.selectedAuthor,
  selectedPublisher: state.books.selectedPublisher
});

// export default rareBook;
export default connect(mapStateToProps, {
  fetchBooks,
  sortBooks,
  selectAuthor,
  selectPublisher
})(rareBook);
