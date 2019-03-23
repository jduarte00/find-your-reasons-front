import React, { Component } from "react";
import axios from "axios";
import MyBreadcrumb from "../Breadcrumb";

export default class MainForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.theUser
    };
  }

  render() {
    return (
      <div>
        <div className="container responsive-padding-sides">
          <MyBreadcrumb routes={[this.state.user.username, "New App"]} />
          <div className="columns is-centered">
            <div className="column">lol</div>
          </div>
        </div>
      </div>
    );
  }
}
