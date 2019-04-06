import React, { Component } from "react";
import MyBreadcrumb from "../Breadcrumb";
import TheForm from "./TheForm";
import Message from "./Message";

export default class MainForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.theUser,
      confirmation: null
    };
  }

  displayConfirmation = success => {
    this.setState({ confirmation: success });
  };

  render() {
    return (
      <div>
        {this.state.confirmation ? (
          <Message changeRoute={this.props.changeRoute} />
        ) : null}
        <div className="container responsive-padding-sides">
          <MyBreadcrumb routes={[this.state.user.username, "New App"]} />
          <div className="columns is-centered">
            <div className="column is-three-quarters">
              <TheForm confirmation={this.displayConfirmation} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
