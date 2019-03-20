import React, { Component } from "react";
import MyBreadcrumb from "./Breadcrumb";
import { Table, Divider, Tag } from "antd";

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="container">
          <MyBreadcrumb routes={[this.props.theUser.username, "home"]} />
          <h1>This is where the content goes</h1>
        </div>
      </div>
    );
  }
}
