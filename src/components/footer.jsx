
import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import loadjs from "loadjs";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
class Footer extends Component {
    constructor(props) {
    super(props);
    }
    render() {
    return (
    <footer
      class="page-footer font-small blue-grey lighten-5"
      style={{ margin: 0 }}
      >
      <BrowserView>
      <div class="container text-center text-md-left mt-3">
        <div
          class="row mt-5 pt-5 dark-grey-text"
          style={{ background: "#fff" }}
          >
          <div
            class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4"
            >
            <h6 class="font-weight-bold">Site Map</h6>
            <p>
              <a class="dark-grey-text" href="./">
                Book
              </a>
            </p>
            <p>
              <a class="dark-grey-text" href="./rareBook">
                Rare/Antique Book
              </a>
            </p>
            <p>
              <a class="dark-grey-text" href="./readerCorner">
                Reader Corner
              </a>
            </p>
            <p>
              <a class="dark-grey-text" href="./institutionalOrder">
                Institutional Order
              </a>
            </p>
            <p>
              <a class="dark-grey-text" href="./blog">
                Blog
              </a>
            </p>
            <p>
              <a class="dark-grey-text" href="./bookFair">
                Book Fair
              </a>
            </p>
          </div>
          <div
            class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4"
            
            >
            <h6 class="font-weight-bold">About Us</h6>
            <p>
              <a class="dark-grey-text" href="./ourMission">
                Our Mission
              </a>
            </p>
            <p>
              <a class="dark-grey-text" href="./history">
                History
              </a>
            </p>
            <p>
              <a class="dark-grey-text" href="./termsCondition">
              Terms & Condition
              </a>
            </p>
            <p>
              <a class="dark-grey-text" href="./privacyPolicy">
                Privacy & Policy
              </a>
            </p>
            <p>
              <a class="dark-grey-text" href="./cookiesPolicy">
                Cookies Policy
              </a>
            </p>
            <p>
              <a class="dark-grey-text" href="./about">
                About Gronthik
              </a>
            </p>
          </div>
          <div
            class="col-md-3 col-lg-4 col-xl-3 mb-4"
            
            >
            <h6 class="font-weight-bold">Gronthik Media</h6>
            <div class="row m-0">
              <div
                class="d-flex justify-content-center align-items-center"
                style={{ width: "20%" }}
                >
                <img style={{ width: 25 }} src="images/icons/mobile.png" />
              </div>
              <div style={{ width: "80%" }}>
                  <p>+88 02 719 1747</p>
                  <p>+88 01616 313 957</p>
              </div>
            </div>
            <div class="row m-0">
              <div
                class="d-flex justify-content-center align-items-center"
                style={{ width: "20%" }}
                >
                <img style={{ width: 25 }} src="images/icons/email.png" />
              </div>
              <div style={{ width: "80%" }}>
                <p>info@gronthik.com</p>
              </div>
            </div>
            <div class="row m-0 mt-2">
              <div
                class="d-flex justify-content-center align-items-center"
                style={{ width: "20%" }}
                >
                <img style={{ width: 20 }} src="images/icons/Address.png" />
              </div>
              <div style={{ width: "80%" }}>
                <p>110 Aliza Tower (3rd floor)</p>
                  <p>Fokirapool, Dhaka-1000</p>
              </div>
            </div>
            <ul>
              <div class="row m-0 ml-4 mt-2">
                <a target="_blank" href="https://www.facebook.com/gronthik.com19">
                  <img
                  class="social_icon"
                  src="images/icons/HELPLINE_fb.png"
                  />
                </a>
                <a target="_blank" href="https://www.youtube.com/channel/UCxTKi6rOVcYgmIjwRizB95w?fbclid=IwAR1VHkwi93u82l7b87zxBjmhkFQQUuzN4I2z6_5XtIN2Vxu4lBk9hP1QnPs">
                  <img
                  class="social_icon"
                  src="images/icons/HELPLINE_tube.png"
                  />
                </a>
                <li>
                  <img
                  class="social_icon"
                  src="images/icons/HELPLINE_inst.png"
                  />
                </li>
                <li>
                  <img
                  class="social_icon"
                  src="images/icons/HELPLINE_twt.png"
                  />
                </li>
              </div>
            </ul>
          </div>
          <div class="col-md-3 col-lg-2 col-xl-4 mx-auto mb-4">
            <h6 class="text-uppercase font-weight-bold">Like & Message on Facebook Page</h6>
            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fgronthik.com19%2F&tabs&width=340&height=214&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="340" height="214" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
          </div>
          </div>
        </div>
        </BrowserView>
        <MobileView>
        <div class="container text-center text-md-left mt-2">
          <div
            class="row mt-3 pt-3 dark-grey-text"
            style={{ background: "#fff" }}
            >
            <div class="col-md-3 col-lg-4 col-xl-3 mb-4"
            style={{ color: "#000" }}>
              <h5 class="font-weight-bold mb-2">
              Gronthik Media
              </h5>
              <div class="row m-0">
                <div
                  class="d-flex justify-content-center align-items-center"
                  style={{ width: "30%" }}
                  >
                  <img style={{ width: 25 }} src="images/icons/mobile.png" />
                </div>
                <div style={{ width: "70%", textAlign: "start" }}>
                  <p>+88 02 719 1747</p>
                  <p>+88 01616 313 957</p>
                </div>
              </div>
              <div class="row m-0">
                <div
                  class="d-flex justify-content-center align-items-center"
                  style={{ width: "30%" }}
                  >
                  <img style={{ width: 25 }} src="images/icons/email.png" />
                </div>
                <div style={{ width: "70%", textAlign: "start" }}>
                  <p>info@gronthik.com</p>
                </div>
              </div>
              <div class="row m-0 mt-2">
                <div
                  class="d-flex justify-content-center align-items-center"
                  style={{ width: "30%" }}
                  >
                  <img style={{ width: 20 }} src="images/icons/Address.png" />
                </div>
                <div style={{ width: "70%", textAlign: "start" }}>
                  <p>110 Aliza Tower (3rd floor)</p>
                  <p>Fokirapool, Dhaka-1000</p>
                </div>
              </div>
              <ul>
                <div class="row d-flex justify-content-center mt-2">
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
                </div>
              </ul>
            </div>
          </div>
        </div>
        </MobileView>
        <BrowserView>
        <div class="container mt-3">
          <div
            style={{
            background: "#fff",
            width: "100%",
            height: 100,
            borderRadius: 8
            }}
            >
            <div>
              <p class="payment-text" style={{ textAlign: "left" }}>
                We accept payment via
              </p>
            </div>
            <div class="row m-0 pl-0 pb-0">
              <div class="payment-box col-1">
                <img class="payment-img" src="images/icons/visa.png" />
              </div>
              <div class="payment-box col-1">
                <img class="payment-img" src="images/icons/master_card.png" />
              </div>
              <div class="payment-box col-1">
                <img class="payment-img" src="images/icons/american_ex.png" />
              </div>
              <div class="payment-box col-1">
                <img class="payment-img" src="images/icons/brac_bank.jpg" />
              </div>
              <div class="payment-box col-1">
                <img class="payment-img" src="images/icons/dbbl-nexus.png" />
              </div>
              <div class="payment-box col-1">
                <img class="payment-img" src="images/icons/city-bank.png" />
              </div>
              <div class="payment-box col-1">
                <img class="payment-img" src="images/icons/payoneer.png" />
              </div>
              <div class="payment-box col-1">
                <img class="payment-img" src="images/icons/bkash.png" />
              </div>
              <div class="payment-box col-1">
                <img class="payment-img" src="images/icons/paypal.png" />
              </div>
              <div class="payment-box col-1">
                <img class="payment-img" src="images/icons/nogod.png" />
              </div>
              <div class="payment-box col-1">
                <img class="payment-img" src="images/icons/ucash.png" />
              </div>
              <div class="payment-box col-1">
                <img class="payment-img" src="images/icons/surecase.png" />
              </div>
              
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row d-flex justify-content-center align-items-center pt-4 pb-4">
            <p style={{ fontSize: 18, textAlign: "center",background: "white" }}>
              <span class="font-weight-bold">
                গ্রন্থিক.কম {" "}
              </span>
              
              {" "}
            </p>
            <p style={{ textAlign: "center" ,background: "white"}}>। বাংলাদেশের অনলাইন ভিত্তিক বুক শপগুলোর মধ্যে অন্যতম । বইয়ের এক ভিন্নধর্মী প্লাটফর্ম গড়ে তুলতে আমাদের এই যাত্রা  {" "}
            </p>
            <p style={{ textAlign: "center" }}>
            </p>
            <p style={{ textAlign: "center" ,background: "white"}}>
              । নতুন, পুরাতন এবং দূর্লভ সব বই পৌঁছে দিতে আমরা কাজ করছি নিরলস ।
            </p>
            
          </div>
        </div>
        <div
          class="footer-copyright text-center text-black-50 py-2"
          style={{ background: "#fff" }}
          >
          <a class="dark-grey-text" href="#">
            {" "}
           gronthik.com © 2019
          </a>
        </div>
        </BrowserView>
        <MobileView>
        <div class="container mt-3">
          <div
            style={{ background: "#fff", height: 50 }}
            >
            <div>
              <p class="payment-text mt-3" style={{ textAlign: "left" }}>
                We accept payment via
              </p>
            </div>
            <div class="row m-0 d-flex justify-content-center">
              <div class="payment-box-mb">
                <img class="payment-img-mb" src="images/icons/visa.png" />
              </div>
              <div class="payment-box-mb">
                <img
                class="payment-img-mb"
                src="images/icons/master_card.png"
                />
              </div>
              <div class="payment-box-mb">
                <img
                class="payment-img-mb-1"
                src="images/icons/american_ex.png"
                />
              </div>
              <div class="payment-box-mb">
                <img
                class="payment-img-mb"
                src="images/icons/brac_bank.jpg-1"
                />
              </div>
              <div class="payment-box-mb">
                <img
                class="payment-img-mb"
                src="images/icons/dbbl-nexus.png"
                />
              </div>
              <div class="payment-box-mb">
                <img
                class="payment-img-mb-1"
                src="images/icons/city-bank.png"
                />
              </div>
              <div class="payment-box-mb">
                <img class="payment-img-mb" 
                src="images/icons/payoneer.png" />
              </div>
              <div class="payment-box-mb">
                <img class="payment-img-mb" 
                src="images/icons/bkash.png" />
              </div>
              <div class="payment-box-mb">
                <img class="payment-img-mb" 
                src="images/icons/paypal.png" />
              </div>
              <div class="payment-box-mb">
                <img class="payment-img-mb" 
                src="images/icons/nogod.png" />
              </div>
              <div class="payment-box-mb">
                <img class="payment-img-mb" 
                src="images/icons/ucash.png" />
              </div>
              <div class="payment-box-mb">
                <img class="payment-img-mb" 
                src="images/icons/surecase.png" />
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row d-flex justify-content-center align-items-center p-4">
            <p style={{ fontSize: 18, textAlign: "center" }}>
              <span class="font-weight-bold">
                গ্রন্থিক.কম । {" "}
              </span>
              
              {" "}
            </p>
            <p style={{ textAlign: "center" }}> বাংলাদেশের অনলাইন ভিত্তিক বুক শপগুলোর মধ্যে অন্যতম । বইয়ের এক ভিন্নধর্মী প্লাটফর্ম গড়ে তুলতে আমাদের এই যাত্রা ।
              
            </p>
            <p style={{ textAlign: "center" }}>
            </p>
            <p style={{ textAlign: "center" }}>
               নতুন, পুরাতন এবং দূর্লভ সব বই
              পৌঁছে দিতে আমরা কাজ করছি নিরলস ।{" "}
            </p>
          </div>
        </div>
        <div
          class="footer-copyright text-center text-black-50 py-2"
          style={{ background: "#fff" }}
          >
          <a class="dark-grey-text" href="#">
            {" "}
          gronthik.com © 2019
          </a>
        </div>
        </MobileView>
      </footer>
      );
      }
      }

export default Footer;
