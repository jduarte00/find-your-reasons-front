import React, { Component } from "react";
import { Form, Icon, Input, Button } from "antd";
import { Redirect } from "react-router-dom";
import AuthService from "./auth-service";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false,
      errorLoginIn: false
    };
    this.service = new AuthService();
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  makeHamburger = () => {
    document.addEventListener("DOMContentLoaded", () => {
      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
      );

      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
          el.addEventListener("click", () => {
            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle("is-active");
            $target.classList.toggle("is-active");
          });
        });
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {});
    const username = this.state.username;
    const password = this.state.password;
    this.service
      .login(username, password)
      .then(response => {
        this.setState({ username: "", password: "", redirect: true });
        this.props.getUser(response);
      })
      .catch(error => {
        this.setState({ errorLoginIn: true });
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {this.state.redirect ? <Redirect to="/home" /> : null}
        <nav className="navbar is-info">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <span className="is-size-2">
                  KYR{" "}
                  <span className="icon is-large theicon">
                    <i className="fas fa-chart-line " />
                  </span>
                </span>
              </a>
              <span
                className="navbar-burger burger"
                data-target="navbarMenuHeroA"
              >
                <span />
                <span />
                <span />
              </span>
            </div>
            <div id="navbarMenuHeroA" className="navbar-menu">
              <div className="navbar-end">
                <a className="navbar-item" href="/">
                  Home
                </a>
                <a className="navbar-item is-active" href="/signin">
                  Sign In
                </a>
                <a className="navbar-item" href="/signup">
                  Sign Up
                </a>
                <span className="navbar-item">
                  <a
                    className="button is-primary is-inverted"
                    href="https://github.com/jduarte00"
                  >
                    <span className="icon">
                      <i className="fab fa-github" />
                    </span>
                    <span>My Code :)</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </nav>

        <div className="container form-container">
          <div className="columns is-centered">
            <div className="column is-one-third">
              <h1 className="is-size-3">Hey, Welcome Back! Sign in!</h1>
              <div className="icon-form">
                <span className="icon is-large">
                  <i className="fas fa-id-card fa-3x" />
                </span>
              </div>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator("userName", {
                    rules: [
                      { required: true, message: "Please input your username!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Username"
                      name="username"
                      onChange={this.handleChange}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "Please input your Password!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChange}
                    />
                  )}
                </Form.Item>

                <Form.Item>
                  <div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Log in
                    </Button>
                    Or <a href="/signup">register now!</a>
                  </div>
                </Form.Item>
              </Form>
              {this.state.errorLoginIn ? (
                <div className="notification is-danger">
                  Wrong username and password, please check them and try again!
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {this.makeHamburger()}
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login);

export default WrappedNormalLoginForm;
