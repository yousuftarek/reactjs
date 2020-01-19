import React, { Component } from "react";
import {
  Route,
  BrowserRouter
  // Link,
  // NavLink,
  // Redirect,
  // Prompt
} from "react-router-dom";
import Footer from "./components/footer";

import logo from "./logo.svg";
import "./App.css";
import Home from "./screens/home";
import Navbar from "./components/navbar";
// import MainSlider from "./components/mainSlider";
import SingleProduct from "./components/singleProduct";
import ShopGrid from "./components/shopGrid";
import Signin from "./components/signin";
import Shopingcart from "./components/shopingcart";
import Shipping from "./components/shipping";
import Orders from "./components/orders";
import Account from "./components/account";
import Seemore from "./components/seemore";
import RareBook from "./components/rareBook";
import ReaderCorner from "./components/readerCorner";
import Blog from "./components/blog";
import InstitutionalOrder from "./components/institutionalOrder";
import BookFair from "./components/bookFair";
import OurMission from "./components/ourMission";
import History from "./components/history";
import TermsCondition from "./components/termsCondition";
import PrivacyPolicy from "./components/privacyPolicy";
import CookiesPolicy from "./components/cookiesPolicy";
import About from "./components/about";

// import { Style } from "react-style-tag";
import {Provider} from 'react-redux'
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import loadjs from "loadjs";
import store from './store';


class App extends Component {
  //componentWillMount() {
    // loadjs("js/vendor/modernizr-3.5.0.min.js", function() {
    //   loadjs("js/vendor/jquery-3.2.1.min.js", function() {
    //     loadjs("js/popper.min.js", function() {
    //       loadjs("js/plugins.js", function() {
    //         loadjs("js/bootstrap.min.js", function() {
    //           loadjs("js/active.js", function() {
    //             loadjs("js/main.js");
    //           });
    //         });
    //       });
    //     });
    //   });
    // });
    //}
  
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
        <div class="wrapper" id="wrapper">

          <Navbar   />

          <Route
            exact
            path="/"
            exact
            strict
            render={props => <Home {...props} />}
          />

          <Route
            exact
            path="/product/:id"
            exact
            strict
            render={props => <SingleProduct {...props}/>}
          />

          <Route
            exact
            strict
            path="/shopGrid"
            exact
            
            handler={ShopGrid}
            render={props => <ShopGrid {...props}/>}
          />

          <Route
            exact
            path="/signin"
            exact
            strict
            render={props => <Signin {...props}/>}
          />

          <Route
            exact
            path="/cart"
            exact
            strict
            render={props => <Shopingcart {...props}/>}
          />

          <Route
            exact
            path="/shipping"
            exact
            strict
            render={props => <Shipping {...props}/>}
          />

          <Route
            exact
            path="/myorders"
            exact
            strict
            render={props => <Orders {...props}/>}
          />

          <Route
            exact
            path="/myaccount"
            exact
            strict
            render={props => <Account {...props}/>}
          />

          <Route
            exact
            path="/seemore"
            exact
            strict
            render={props => <Seemore {...props}/>}
          />
          <Route
            exact
            path="/rareBook"
            exact
            strict
            render={props => <RareBook/>}
          />
           <Route
            exact
            path="/readerCorner"
            exact
            strict
            render={props => <ReaderCorner/>}
          />
          <Route
            exact
            path="/blog"
            exact
            strict
            render={props => <Blog/>}
          />
          <Route
            exact
            path="/institutionalOrder"
            exact
            strict
            render={props => <InstitutionalOrder/>}
          />
          <Route
            exact
            path="/bookFair"
            exact
            strict
            render={props => <BookFair/>}
          />
          <Route
            exact
            path="/ourMission"
            exact
            strict
            render={props => <OurMission/>}
          />
          <Route
            exact
            path="/history"
            exact
            strict
            render={props => <History/>}
          />
          <Route
            exact
            path="/termsCondition"
            exact
            strict
            render={props => <TermsCondition/>}
          />
          <Route
            exact
            path="/privacyPolicy"
            exact
            strict
            render={props => <PrivacyPolicy/>}
          />
          <Route
            exact
            path="/cookiesPolicy"
            exact
            strict
            render={props => <CookiesPolicy/>}
          />
          <Route
            exact
            path="/about"
            exact
            strict
            render={props => <About/>}
          />
          <Footer />
        </div>
      </BrowserRouter>
      </Provider>
      
    );
  }
}

export default App;
