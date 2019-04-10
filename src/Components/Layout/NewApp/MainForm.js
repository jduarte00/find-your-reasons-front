import React, { Component } from "react";
import MyBreadcrumb from "../Breadcrumb";
import TheForm from "./TheForm";
import Message from "./Message";

export default class MainForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.theUser,
      confirmation: null,
      statusNewApp: null
    };
  }

  displayConfirmation = success => {
    this.setState({ confirmation: success });
  };

  changeStatusNewApp = status => {
    this.setState({ statusNewApp: status });
  };

  render() {
    return (
      <div>
        {this.state.statusNewApp === "good" ? (
          <Message
            changeRoute={this.props.changeRoute}
            message={<span>The new app has been added to your account.</span>}
            typeOfMessage="success"
          />
        ) : null}

        {this.state.statusNewApp === "bad" ? (
          <Message
            changeRoute={this.props.changeRoute}
            message={<span>Oops! Something went wrong :(</span>}
            typeOfMessage="danger"
          />
        ) : null}
        <div className="container responsive-padding-sides">
          <MyBreadcrumb routes={[this.state.user.username, "New App"]} />
          <div className="columns is-centered">
            <div className="column is-three-quarters">
              <TheForm
                confirmation={this.displayConfirmation}
                statusNewApp={this.changeStatusNewApp}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
