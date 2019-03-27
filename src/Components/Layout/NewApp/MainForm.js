import React, { Component } from "react";
import MyBreadcrumb from "../Breadcrumb";
import TheForm from "./TheForm";

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
            <div className="column">
              <TheForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
