import React, { Component } from "react";
import MyBreadcrumb from "../Breadcrumb";
import TheForm from "./TheForm";
import Message from "../NewApp/Message";

export default class MainForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.theUser,
      confirmation: null,
      statusNewMonth: null
    };
  }

  displayConfirmation = success => {
    this.setState({ confirmation: success });
  };

  changeStatusNewMonth = status => {
    this.setState({ statusNewMonth: status });
  };

  render() {
    return (
      <div>
        {this.state.statusNewMonth === "good" ? (
          <Message
            changeRoute={this.props.changeRoute}
            message={<span>The new month has been added successfully.</span>}
            typeOfMessage="success"
          />
        ) : null}

        {this.state.statusNewApp === "bad" ? (
          <Message
            changeRoute={this.props.changeRoute}
            message={
              <span>
                Oops! Something went wrong :(, please try again later.
              </span>
            }
            typeOfMessage="danger"
          />
        ) : null}

        <div className="container responsive-padding-sides">
          <MyBreadcrumb routes={[this.state.user.username, "New Month"]} />
          <div className="columns is-centered">
            <div className="column is-three-quarters">
              <TheForm statusNewMonth={this.changeStatusNewMonth} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
