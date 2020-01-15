import React, { Component } from "react";
import loadjs from "loadjs";
import Product from "./../components/product";
import productexData from "./../dummyData/productex";
import ProductExtra from "./../components/productextra";
import discountProduct from "./../dummyData/discountProduct";
import StarRatings from "react-star-ratings";
import Modal from "react-modal";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import Slider from "react-slick";

import { Link, Redirect, Prompt } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import * as helper from "./../helper";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchBook,
  fetchBooks,
  addtoCart,
  fetchReviews
} from "../actions/bookActions";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
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
        borderBottomRightRadius: 10
      }}
      onClick={onClick}
    >
      <img class="mr-auto" src="images/icons/prevIcon.png" />
    </div>
  );
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginTop: 80,
    marginLeft: 20,
    marginRight: 10,
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class Productz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: discountProduct,
      review_rating: 0,
      review_text: null,
      fivestar: null,
      fourstar: null,
      threestar: null,
      twostar: null,
      onestar: null,
      modalIsOpen: false,
      bookPages: null
    };
    window.scrollTo(0, 0);
    this.fetchReviewBar();
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  

  changeRating = newRating => {
    this.setState({
      review_rating: newRating
    });
  };

  componentWillMount() {
    // this.props.fetchBook();
    console.log("aa ddd f  fggg ",this.props.book.book)
  }
  

  openModal() {
    if(this.props.book.pages.length > 0){
      this.setState({ modalIsOpen: true });
    }
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  
  title = () => {
    try {
      if (this.props.book.book) {
        return this.props.book.book.title;
      }
    } catch (error) {
      console.log(error);
    }
  };
  category_id = () => {
    try {
      if (this.props.book.book) {
        return this.props.book.book.category_id;
      }
    } catch (error) {
      console.log(error);
    }
  };
  summary = () => {
    try {
      if (this.props.book.book) {
        return this.props.book.book.summary;
      }
    } catch (error) {
      console.log(error);
    }
  };
  new_price = () => {
    try {
      if (this.props.book.book) {
        return this.props.book.book.new_price;
      }
    } catch (error) {
      console.log(error);
    }
  };
  old_price = () => {
    try {
      if (this.props.book.book) {
        return this.props.book.book.old_price;
      }
    } catch (error) {
      console.log(error);
    }
  };
  description = () => {
    try {
      if (this.props.book.book) {
        return this.props.book.book.description;
      }
    } catch (error) {
      console.log(error);
    }
  };

  category = () => {
    try {
      if (this.props.book.book) {
        return this.props.book.book.category;
      }
    } catch (error) {
      console.log(error);
    }
  };
  rating = () => {
    try {
      if (this.props.book.book) {
        return (
          <StarRatings
            rating={parseFloat(this.averageRating())}
            starRatedColor="#FF9900"
            starDimension="12px"
            numberOfStars={5}
            name="rating"
          />
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  cover = () => {
    try {
      if (this.props.book.book) {
        return this.props.book.book.cover;
      }
    } catch (error) {
      console.log(error);
    }
  };
  country = () => {
    try {
      if (this.props.book.book) {
        return this.props.book.book.country;
      }
    } catch (error) {
      console.log(error);
    }
  };
  page = () => {
    try {
      if (this.props.book.book) {
        return this.props.book.book.page;
      }
    } catch (error) {
      console.log(error);
    }
  };
  language = () => {
    try {
      if (this.props.book.book) {
        return this.props.book.book.language;
      }
    } catch (error) {
      console.log(error);
    }
  };
  author_id = () => {
    try {
      if (this.props.book.book) {
        return this.props.book.book.author_id;
      }
    } catch (error) {
      console.log(error);
    }
  };
  publisher_id = () => {
    try {
      if (this.props.book.book) {
        return this.props.book.book.publisher_id;
      }
    } catch (error) {
      console.log(error);
    }
  };
  discount = () => {
    try {
      if (this.props.book.book) {
        return this.props.book.book.discount;
      }
    } catch (error) {
      console.log(error);
    }
  };
  upcoming = () => {
    try {
      if (this.props.book.book) {
        return this.props.book.book.upcoming;
      }
    } catch (error) {
      console.log(error);
    }
  };

  author = () => {
    try {
      if (this.props.book.book) {
        return this.props.book.book.author;
      }
    } catch (error) {
      console.log(error);
    }
  };

  publisher = () => {
    try {
      if (this.props.book.book) {
        return this.props.book.book.publisher;
      }
    } catch (error) {
      console.log(error);
    }
  };

  publisher_id = () => {
    try {
      if (this.props.book.book) {
        return this.props.book.book.publisher_id;
      }
    } catch (error) {
      console.log(error);
    }
  };

  stock = () => {
    try {
      if (this.props.book.book) {
        return this.props.book.book.stock;
      }
    } catch (error) {
      console.log(error);
    }
  };

  discount = () => {
    try {
      if (this.props.book.book) {
        return this.props.book.book.discount;
      }
    } catch (error) {
      console.log(error);
    }
  };

  isbn = () => {
    try {
      if (this.props.book.book) {
        return this.props.book.book.isbn;
      }
    } catch (error) {
      console.log(error);
    }
  };

  addtoCart = () => {
    try {
      if (this.props.book.book) {
        this.props.addtoCart(this.props.book.book);
      }
    } catch (error) {
      console.log(error);
    }
  };

  reviews = () => {
    try {
      if (this.props.reviews.reviews.length > 0) {
        return this.props.reviews.reviews.map((review, index) => {
          return (
            <div class="row mt-3" style={{ borderBottom: "1px solid #E9ECEF" }}>
              <div class="col-sm-2 content--review__user-info">
                <div>
                  <img
                    class="align-items-center rounded-circle"
                    src="http://conferenceoeh.com/wp-content/uploads/profile-pic-dummy.png"
                    style={{ width: 80, height: 80 }}
                  />
                  <br />
                  <span class="ml-auto mr-auto"> {review.username} </span>
                </div>
                <br />
                <span class="ml-auto mr-auto"> {review.updated_at} </span>
                <StarRatings
                  rating={parseFloat(review.rating)}
                  starRatedColor="#FF9900"
                  starDimension="12px"
                  numberOfStars={5}
                  name="rating"
                />
              </div>
              <div class="col-sm-10 content--review__user-comment">
                <div class="user-review-container">
                  <div
                    class="user-review-container--description"
                    style={{ maxHeight: 3000 }}
                  >
                    {review.review_text}
                  </div>
  
                  <div class="read-more-overlay--container">
                    <div class="read-more-overlay"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        });
      }
    } catch (error) {
      console.log(error)
    }
  };

  averageRating = () => {
    let fivestar = this.props.reviews.fivestar;
    let fourstar = this.props.reviews.fourstar;
    let threestar = this.props.reviews.threestar;
    let twostar = this.props.reviews.twostar;
    let onestar = this.props.reviews.onestar;

    if (
      fivestar > fourstar &&
      fivestar > threestar &&
      fivestar > twostar &&
      fivestar > onestar
    ) {
      return parseFloat(5.0).toFixed(1);
    } else if (
      fourstar > fivestar &&
      fourstar > threestar &&
      fourstar > twostar &&
      fourstar > onestar
    ) {
      return parseFloat(4.0).toFixed(1);
    } else if (
      threestar > fivestar &&
      threestar > fourstar &&
      threestar > twostar &&
      threestar > onestar
    ) {
      return parseFloat(3.0).toFixed(1);
    } else if (
      twostar > fivestar &&
      twostar > threestar &&
      twostar > fourstar &&
      twostar > onestar
    ) {
      return parseFloat(2.0).toFixed(1);
    } else if (
      onestar > fivestar &&
      onestar > threestar &&
      onestar > twostar &&
      onestar > fourstar
    ) {
      return parseFloat(1.0).toFixed(1);
    } else {
      return parseFloat(0.0).toFixed(1);
    }
  };

  submitReview = () => {
    if (this.state.review_rating > 0) {
      var url = helper.prefix + "review";
      var data = {
        book_id: this.props.book.book.id,
        review_text: this.state.review_text,
        rating: this.state.review_rating
      };

      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.props.token
        }
      })
        .then(res => res.json())
        .then(response => this.handleReview(response))
        .catch(error => console.error("Error:", error));
    }
  };

  handleReview = response => {
    if (response.success) {
      alert("Success submiting review");
      this.setState({ review_rating: 0, review_text: null });
      this.props.fetchReviews(
        helper.prefix + "book/reviews/" + this.props.book.book.id
      );
    }
  };

  checkRating = () => {
    if (Object.keys(this.props.token).length > 0) {
      return (
        <div class="ratings-review__content--form">
          <p class="review-text"></p>
          <form>
            <div class="form-group">
              <textarea
                class="form-control"
                id="js--review-writing"
                rows="5"
                onChange={e =>
                  this.setState({
                    review_text: e.target.value
                  })
                }
                placeholder="Please write your review and give rating here"
              >
                {this.state.review_text}
              </textarea>
            </div>
            <StarRatings
              rating={this.state.review_rating}
              starRatedColor="#FF9900"
              starHoverColor="#FF9900"
              starDimension="20px"
              changeRating={e => this.changeRating(e)}
              numberOfStars={5}
              name="rating"
            />
            <button
              onClick={() => this.submitReview()}
              type="button"
              class="btn btn-success ml-2"
            >
              Submit
            </button>
          </form>

          <p></p>
        </div>
      );
    } else {
      return (
        <div
          class="ratings-review__content--form d-flex align-items-center"
          style={{ height: "100%", width: "100%", border: "1px solid #E9ECEF" }}
        >
          <p
            class="ml-auto mr-auto"
            style={{ textAlign: "center", fontSize: 18 }}
          >
            Please log in to write review
            <Link to="/signin" class="ml-2 btn btn-success">
              Log in
            </Link>
          </p>
        </div>
      );
    }
  };

  fetchReviewBar = () => {
    var arr = {};
    arr["fivestar"] = this.props.reviews.fivestar;
    arr["fourstar"] = this.props.reviews.fourstar;
    arr["threestar"] = this.props.reviews.threestar;
    arr["twostar"] = this.props.reviews.twostar;
    arr["onestar"] = this.props.reviews.onestar;

    let sum = Object.keys(arr).reduce((s, k) => (s += arr[k]), 0);

    var result = Object.keys(arr).map(k => ({
      [k]: ((arr[k] / sum) * 100).toFixed(2) + "%"
    }));

    console.log("asdasd asd asd", result[0].fivestar.toString());
    this.setState({
      fivestar: result[0].fivestar.toString(),
      fourstar: result[1].fourstar.toString(),
      threestar: result[2].threestar.toString(),
      twostar: result[3].twostar.toString(),
      onestar: result[4].onestar.toString()
    });
  };

  readBook = () =>{
    if(this.props.book.pages != null && this.props.book.pages != []){
      return(
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div  class="row m-0 p-2 pt-0">
          <FontAwesome name="times" onClick={this.closeModal} style={{fontSize: 25, color: "red", marginLeft: 'auto'}} />
          </div>
          <div
            style={{
              height: 570,
              overflowY: "scroll",
              border: "10px solid gray"
            }}
          >
            {this.props.book.pages.map((item, index) =>{
              return(
                <img src={item.image} style={{width: '100%'}}/>
              )
            })}
          </div>
        </Modal>
      )
    }
  }

  totalReview = () =>{
    try {
      if(this.props.reviews.reviews.length > 0){
       return this.props.reviews.reviews.length 
      }else{
        return 0
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.readBook()}
        <div class="maincontent bg--white pt--40 pb--55">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="wn__single__product">
                  <div class="row">
                    <div class="col-lg-6 col-12 d-flex justify-content-center">
                      <div class="book-bg-bg d-flex justify-content-center border-1">
                        <img
                          class="readsome_badge"
                          src="images/badges/lookInside.png"
                        />
                        <div class="book-bg" onClick={() => {this.openModal();
                        }}>
                          <div
                            class="book-cover"
                            style={{
                              height: 344,
                              width: 238,
                              backgroundImage: "url(images/books/dummy.png)",
                              backgroundSize: "cover"
                            }}
                          >
                            <img
                              class="bookCover"
                              src={this.cover()}
                              style={{ height: 344, width: 238 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 col-12">
                      <div class="product__info__main">
                        {console.log("mother fuck ", this.title())}
                        <h1 class="mb-4">{this.title()}</h1>
                        {/**/}
                        <Link
                          style={{ fontSize: 16 }}
                          to="/shopGrid"
                          onClick={() => {
                            this.props.fetchBooks(
                              helper.prefix +
                                "author/books/" +
                                this.publisher_id()
                            );
                          }}
                        >
                          {this.author()}
                        </Link>
                        <div class="price-box">
                          <p class="details-book-info__content-book-price">
                            {this.new_price()} Tk.
                            <strike class="original-price">
                              {this.old_price()} Tk.
                            </strike>
                            <span class="price-off">
                              {this.discount() ? "(" : null}
                              <span class="js--save-message">
                                {this.discount() ? "You can Save " : null}
                              </span>
                              {this.discount() ? this.discount() + "%)" : null}
                            </span>
                          </p>
                        </div>
                        {/* <p class="text-success">
                        <span class="mr-2">
                          <FontAwesome name="circle" dtyle={{ fontSize: 15 }} />
                        </span>
                        অনলাইনে পেমেন্ট বিকাশ করলেই ২০% ইন্সট্যান্ট ক্যাশব্যাক।
                        (শর্ত প্রযোজ্য)
                      </p> */}
                        <div class="product__overview">
                          <p>{this.description()}</p>
                        </div>
                        <div>
                          <div class="product-addto-links clearfix pb-3 row ml-0 d-flex align-items-center">
                            <a class="wishlist" href="#" />{" "}
                            <p class="pl-2">Add to booklist</p>
                          </div>
                        </div>
                        <div class="box-tocart d-flex">
                          <button
                            type="button"
                            class="btn btn-outline-dark mr-2"
                          >
                            একটু পড়ে দেখুন
                          </button>
                          <div class="addtocart__actions">
                            <BrowserView>
                              <button
                                class="tocart"
                                type="submit"
                                title="Add to Cart"
                                onClick={() => {
                                  this.addtoCart();
                                }}
                              >
                                Add to Cart
                              </button>
                            </BrowserView>
                            <MobileView>
                              <button
                                class="tocart"
                                type="submit"
                                title="Add to Cart"
                                onClick={() => {
                                  this.addtoCart();
                                }}
                              >
                                Add Cart
                              </button>
                            </MobileView>
                          </div>
                        </div>
                        <div class="product_meta">
                          <span class="posted_in">
                            Category:
                            <Link
                              to="/shopGrid"
                              onClick={() => {
                                this.props.fetchBooks(
                                  helper.prefix +
                                    "category/" +
                                    this.category_id()
                                );
                              }}
                            >
                              {this.category()}
                            </Link>
                          </span>
                        </div>
                        <div class="product-reviews-summary d-flex">
                          <ul class="rating-summary d-flex">{this.rating()}</ul>
                        </div>
                        <div class="product-share">
                          <ul>
                            <li class="categories-title mr-2">Share :</li>
                            <li>
                              <img class="social_icon" src="images/icons/HELPLINE_fb.png"/>  
                            </li>
                            <li>
                              <img class="social_icon" src="images/icons/HELPLINE_tube.png"/>  
                            </li>
                            <li>
                            <img class="social_icon" src="images/icons/HELPLINE_inst.png"/>
                            </li>
                            <li>
                            <img class="social_icon" src="images/icons/HELPLINE_twt.png"/>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="product__info__detailed">
                  <div
                    class="pro_details_nav nav justify-content-start"
                    role="tablist"
                  >
                    <a
                      class="nav-item nav-link"
                      data-toggle="tab"
                      href="#nav-details"
                      role="tab"
                    >
                      Summary
                    </a>
                    <a
                      class="nav-item nav-link active"
                      data-toggle="tab"
                      href="#nav-specification"
                      role="tab"
                    >
                      Specification
                    </a>
                    <a
                      class="nav-item nav-link"
                      data-toggle="tab"
                      href="#nav-review"
                      role="tab"
                    >
                      Reviews
                    </a>
                  </div>
                  <div class="tab__container">
                    <div
                      class="pro__tab_label tab-pane fade"
                      id="nav-details"
                      role="tabpanel"
                    >
                      <div class="description__attribute">
                        <p>{this.summary()}</p>
                      </div>
                    </div>
                    <div
                      class="pro__tab_label tab-pane fade show active"
                      id="nav-specification"
                      role="tabpanel"
                    >
                      <div class="description__attribute">
                        <table class="table table-bordered">
                          <tbody>
                            <tr>
                              <td>Title</td>
                              <td>{this.title()} </td>
                            </tr>

                            <tr>
                              <td>Author</td>
                              <td class="author-link">
                                <Link
                                  class="lnk-1"
                                  to="/shopGrid"
                                  onClick={() => {
                                    this.props.fetchBooks(
                                      helper.prefix +
                                        "author/books/" +
                                        this.author_id()
                                    );
                                  }}
                                >
                                  {this.author()}
                                </Link>
                              </td>
                            </tr>

                            <tr>
                              <td>Publisher</td>
                              <td class="publisher-link">
                                <Link
                                  class="lnk-1"
                                  to="/shopGrid"
                                  onClick={() => {
                                    this.props.fetchBooks(
                                      helper.prefix +
                                        "publisher/books/" +
                                        this.publisher_id()
                                    );
                                  }}
                                >
                                  {this.publisher()}
                                </Link>
                              </td>
                            </tr>

                            <tr>
                            <td>ISBN</td>
                            <td>{this.isbn()}</td>
                          </tr>

                            <tr>
                              <td>Number of Pages</td>
                              <td>{this.page()}</td>
                            </tr>

                            <tr>
                              <td>Country</td>
                              <td>{this.country()}</td>
                            </tr>

                            <tr>
                              <td>Language</td>
                              <td>{this.language()}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div
                      class="pro__tab_label tab-pane fade"
                      id="nav-review"
                      role="tabpanel"
                    >
                      <div class="row">
                        <div class="col">
                          <h1 style={{ fontWeight: "normal" }}>
                            Reviews and Ratings
                          </h1>
                          <p class="text-muted mt-1">Submit Review-Rating</p>
                        </div>
                        &gt;
                      </div>
                      <div class="row mb-4">
                        <div class="col-sm-7">{this.checkRating()}</div>

                        <div class="col-sm-5">
                          <div class="media ratings-review__content--rating">
                            <h2 style={{ fontWeight: "normal" }} class="pt-2">
                              {this.averageRating()}
                            </h2>

                            <div class="media-body ml-4 mb-3">
                              <p class="text-secondary">
                                {this.totalReview()}{" "}
                                Ratings Reviews
                              </p>
                              <StarRatings
                                rating={parseFloat(5)}
                                starRatedColor="#FF9900"
                                starDimension="18px"
                                numberOfStars={5}
                                name="rating"
                              />
                            </div>
                          </div>
                          <div class="row">
                            <div
                              class="col-sm-5 text-warning pl-4"
                              style={{ width: "50%" }}
                            >
                              <div>
                                <StarRatings
                                  rating={parseFloat(5)}
                                  starRatedColor="#FF9900"
                                  starDimension="12px"
                                  numberOfStars={5}
                                  name="rating"
                                />
                              </div>
                              <div>
                                <StarRatings
                                  rating={parseFloat(4)}
                                  starRatedColor="#FF9900"
                                  starDimension="12px"
                                  numberOfStars={5}
                                  name="rating"
                                />
                              </div>
                              <div>
                                <StarRatings
                                  rating={parseFloat(3)}
                                  starRatedColor="#FF9900"
                                  starDimension="12px"
                                  numberOfStars={5}
                                  name="rating"
                                />
                              </div>
                              <div>
                                <StarRatings
                                  rating={parseFloat(2)}
                                  starRatedColor="#FF9900"
                                  starDimension="12px"
                                  numberOfStars={5}
                                  name="rating"
                                />
                              </div>
                              <div>
                                <StarRatings
                                  rating={parseFloat(1)}
                                  starRatedColor="#FF9900"
                                  starDimension="12px"
                                  numberOfStars={5}
                                  name="rating"
                                />
                              </div>
                            </div>
                            <div
                              class="col-sm-5"
                              id="ratingChart"
                              style={{ width: "50%" }}
                            >
                              <div class="row">
                                <div style={{ width: "10%" }}>
                                  [{this.props.reviews.fivestar}]
                                </div>
                                <div style={{ width: "90%" }}>
                                  <div class="progress rating-bar mt-2">
                                    <div
                                      class="progress-bar bg-warning"
                                      role="progressbar"
                                      style={{
                                        width:
                                          this.state.fivestar != null
                                            ? this.state.fivestar
                                            : "0%"
                                      }}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div style={{ width: "10%" }}>
                                  [{this.props.reviews.fourstar}]
                                </div>
                                <div style={{ width: "90%" }}>
                                  <div class="progress rating-bar mt-2">
                                    <div
                                      class="progress-bar bg-warning"
                                      role="progressbar"
                                      style={{ width: "0%" }}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div style={{ width: "10%" }}>
                                  [{this.props.reviews.threestar}]
                                </div>
                                <div style={{ width: "90%" }}>
                                  <div class="progress rating-bar mt-2">
                                    <div
                                      class="progress-bar bg-warning"
                                      role="progressbar"
                                      style={{ width: "0%" }}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div style={{ width: "10%" }}>
                                  [{this.props.reviews.twostar}]
                                </div>
                                <div style={{ width: "90%" }}>
                                  <div class="progress rating-bar mt-2">
                                    <div
                                      class="progress-bar bg-warning"
                                      role="progressbar"
                                      style={{ width: "0%" }}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div style={{ width: "15%" }}>
                                  [{this.props.reviews.onestar}]
                                </div>
                                <div style={{ width: "85%" }}>
                                  <div class="progress rating-bar mt-2">
                                    <div
                                      class="progress-bar bg-warning"
                                      role="progressbar"
                                      style={{ width: "0%" }}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {this.reviews()}
                    </div>
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

Productz.propTypes = {
  fetchBook: PropTypes.func.isRequired,
  fetchBooks: PropTypes.func.isRequired,
  books: PropTypes.object.isRequired,
  addtoCart: PropTypes.func.isRequired,
  fetchReviews: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  book: state.books.item,
  reviews: state.books.reviews,
  token: state.auth.token
});

export default connect(
  mapStateToProps,
  { fetchBook, fetchBooks, addtoCart, fetchReviews }
)(Productz);
