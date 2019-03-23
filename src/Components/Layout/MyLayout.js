import React, { Component } from "react";

import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";

import "./../../App.css";

import MainPage from "./Panel/MainPage";
import UserProfile from "./Profile/UserProfile";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

const { Content, Footer } = Layout;

export default class MyLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      user: props.theUser,
      isSmall: false,
      currentRoute: "home"
    };
  }

  updatePredicate = () => {
    this.setState({ isSmall: window.innerWidth < 640 });
  };

  componentDidMount = () => {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updatePredicate);
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ ...this.state, user: nextProps["theUser"] });
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        {this.state.isSmall ? null : (
          <Sidebar
            breakpoint="lg"
            collapsedWidth="0"
            handleOnCollapse={this.onCollapse}
            collapsed={this.state.collapsed}
          />
        )}
        <Layout>
          <Topbar getUser={this.props.getUser} theUser={this.state.user} />

          <Content>{this.props.theContent}</Content>
          <Footer
            style={{
              textAlign: "center",
              background: "darkgray"
            }}
            className="margin-top"
          >
            Creado por José Duarte utilizando{" "}
            <a href="https://reactjs.org/">React</a> y{" "}
            <a href="https://ant.design">AntDesign</a> 🖤
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
