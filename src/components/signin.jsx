import React, { Component } from "react";
import loadjs from "loadjs";
import * as helper from "./../helper";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { storeToken } from "../actions/authActions";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login_email: null,
      login_password: null,
      reg_fullname: null,
      reg_email: null,
      reg_pass: null,
      c_password: null,
      login_error: null,
      reg_error: null,
      success: null
    };
    window.scrollTo(0, 0);
    console.log("fucking token ", this.props.token);
  }

  // componentWillMount() {
  //   loadjs("js/vendor/modernizr-3.5.0.min.js", function() {
  //     loadjs("js/vendor/jquery-3.2.1.min.js", function() {
  //       loadjs("js/popper.min.js", function() {
  //         loadjs("js/plugins.js", function() {
  //           loadjs("js/bootstrap.min.js", function() {
  //             loadjs("js/active.js", function() {
  //               loadjs("js/main.js");
  //             });
  //           });
  //         });
  //       });
  //     });
  //   });
  // }

  checkAuth = () => {
    if (Object.keys(this.props.token).length > 0) {
      return <Redirect to="/" />;
    }
  };

  handleLogin = response => {
    if (response.success) {
      this.setState({ success: "Login successfull" });
      this.props.storeToken(response.success.token, response.user);
      alert("Login successfull");
      this.props.history.push(`/`);
    }
    if (response.error) {
      this.setState({ login_error: response.error });
    }
  };

  login = () => {
    if (this.state.login_email != null && this.state.login_password != null) {
      var url = helper.prefix + "login";
      var data = {
        email: this.state.login_email,
        password: this.state.login_password
      };

      fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
          // 'Authorization' : 'Bearer',
        }
      })
        .then(res => res.json())
        .then(response => this.handleLogin(response))
        .catch(error => console.error("Error:", error));
    } else {
      this.setState({ login_error: "please input all field" });
    }
  };

  handleRegister = response => {
    console.log(response);
    if (response.success) {
      this.setState({ success: "Registration successfull" });
      this.props.storeToken(response.success.token, response.user);
      alert("Registration successfull");
      this.props.history.push(`/`);
    }
    if (response.error) {
      this.setState({ reg_error: response.error });
    }
  };

  register = () => {
      if (
        this.state.reg_email != null &&
        this.state.reg_pass != null &&
        this.state.c_password != null &&
        this.state.reg_fullname != null
      ) {
		if (this.state.reg_pass !== this.state.c_password) {
			this.setState({
			  reg_error: "password and confirm password does not matched"
			});
		  } else {
			var url = helper.prefix + "register";
			var data = {
			  name: this.state.reg_fullname,
			  email: this.state.reg_email,
			  password: this.state.reg_pass,
			  c_password: this.state.c_password,
			  phone_no: this.state.phone_no
			};
	
			fetch(url, {
			  method: "POST", // or 'PUT'
			  body: JSON.stringify(data), // data can be `string` or {object}!
			  headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
				// 'Authorization' : 'Bearer',
			  }
			})
			  .then(res => res.json())
			  .then(response => this.handleRegister(response))
			  .catch(error => console.error("Error:", error));
		  }
      } else {
        this.setState({ reg_error: "please input all field" });
      }
  };

  success = () => {
    if (this.state.success != null) {
      return (
        <div class="alert alert-success" role="alert">
          {this.state.success}
        </div>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.checkAuth()}
        <section class="my_account_area pt--20 pb--55 bg--white">
          <div class="container">
            {this.success()}
            <div class="row">
              <div class="col-lg-6 col-12">
                <div class="my__account__wrapper">
                  <h3 class="account__title">Login</h3>
                  <div class="account__form">
                    <div class="input__box">
                      <label>
                        Email address <span>*</span>
                      </label>
                      <input
                        type="email"
                        value={this.state.login_email}
                        onChange={e =>
                          this.setState({ login_email: e.target.value })
                        }
                      />
                    </div>
                    <div class="input__box">
                      <label>
                        Password<span>*</span>
                      </label>
                      <input
                        type="password"
                        value={this.state.login_password}
                        onChange={e =>
                          this.setState({ login_password: e.target.value })
                        }
                      />
                    </div>
                    <span cla="mb-2" style={{ color: "red" }}>
                      {this.state.login_error != null
                        ? this.state.login_error
                        : null}
                    </span>
                    <div class="form__btn">
                      <button onClick={() => this.login()}>Login</button>
                      <label class="label-for-checkbox">
                        <input
                          id="rememberme"
                          class="input-checkbox mr-2"
                          name="rememberme"
                          value="forever"
                          type="checkbox"
                        />
                        <span>Remember me</span>
                      </label>
                    </div>
                    <a class="forget_pass" href="#">
                      Lost your password?
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-12">
                <div class="my__account__wrapper">
                  <h3 class="account__title">Register</h3>
                  <form action="#">
                    <div class="account__form">
                      <div class="input__box">
                        <label>
                          Full Name<span>*</span>
                        </label>
                        <input
                          type="name"
                          value={this.state.reg_fullname}
                          onChange={e =>
                            this.setState({ reg_fullname: e.target.value })
                          }
                        />
                      </div>
                      <div class="input__box">
                        <label>
                          Email address <span>*</span>
                        </label>
                        <input
                          type="email"
                          value={this.state.reg_email}
                          onChange={e =>
                            this.setState({ reg_email: e.target.value })
                          }
                        />
                      </div>
                      <div class="input__box">
                        <label>
                          Phone number<span>*</span>
                        </label>
                        <input
                          type="name"
                          value={this.state.phone_no}
                          onChange={e =>
                            this.setState({ phone_no: e.target.value })
                          }
                        />
                      </div>
                      <div class="input__box">
                        <label>
                          Password<span>*</span>
                        </label>
                        <input
                          type="password"
                          value={this.state.reg_pass}
                          onChange={e =>
                            this.setState({ reg_pass: e.target.value })
                          }
                        />
                      </div>
                      <div class="input__box">
                        <label>
                          Confirm password<span>*</span>
                        </label>
                        <input
                          type="password"
                          value={this.state.c_password}
                          onChange={e =>
                            this.setState({ c_password: e.target.value })
                          }
                        />
                      </div>
                      <span cla="mb-2" style={{ color: "red" }}>
                        {this.state.reg_error != null
                          ? this.state.reg_error
                          : null}
                      </span>
                      <div class="mt-2 form__btn">
                        <button onClick={() => this.register()}>
                          Register
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

Signin.propTypes = {
  fetchBooks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  token: state.auth.token
});

export default connect(
  mapStateToProps,
  { storeToken }
)(Signin);
