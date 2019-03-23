import React, { Component } from "react";
import MyBreadcrumb from "../Breadcrumb";
import axios from "axios";

export default class UserProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.theUser.username,
      password: "",
      newPassword: "",
      errorChanging: false
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    console.log(this.state);
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <div className="container responsive-padding-sides">
          <MyBreadcrumb routes={[this.state.user, "profile"]} />
          <div className="columns is-centered">
            <div className="column is-half">
              <span className="icon is-large">
                <i class="fas fa-user-edit fa-3x" />
              </span>
            </div>
          </div>
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="field has-addons">
                <div className="control">
                  <a className="button is-info">Username</a>
                </div>
                <div className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    name="user"
                    placeholder={this.state.user}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="field has-addons">
                <div className="control">
                  <a className="button is-info">Old Password</a>
                </div>
                <div className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    name="password"
                    placeholder="Type old password"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="field has-addons">
                <div className="control">
                  <a className="button is-info">New Password</a>
                </div>
                <div className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    name="newPassword"
                    placeholder="Type new password"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          {this.state.errorChanging ? (
            <div className="columns is-centered">
              <div className="column is-half">
                <div class="notification is-danger">
                  Your old password is not right, please check it and introduce
                  it again.
                </div>
              </div>
            </div>
          ) : null}
          <div className="columns is-centered">
            <div className="column is-half">
              <a className="button is-success is-fullwidth is-rounded">
                Commit Changes!
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
