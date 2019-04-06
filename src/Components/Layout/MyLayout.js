import React, { Component } from "react";

import { Layout } from "antd";

import "./../../App.css";

import MainPage from "./Panel/MainPage";
import MainForm from "./NewApp/MainForm";
import UserProfile from "./Profile/UserProfile";
import ViewApp from "./ViewApp/ViewApp";
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
            changeRoute={this.props.changeRoute}
          />
        )}
        <Layout>
          <Topbar getUser={this.props.getUser} theUser={this.state.user} />

          <Content>
            {this.props.theContent === "home" ? (
              <MainPage
                theUser={this.state.user}
                changeRoute={this.props.changeRoute}
              />
            ) : null}
            {this.props.theContent === "newapp" ? (
              <MainForm
                theUser={this.state.user}
                changeRoute={this.props.changeRoute}
              />
            ) : null}
            {this.props.theContent === "profile" ? (
              <UserProfile theUser={this.state.user} />
            ) : null}
            {this.props.theContent === "viewapp" ? (
              <ViewApp theUser={this.state.user} appID={this.props.appID} />
            ) : null}
          </Content>
          <Footer
            style={{
              textAlign: "center",
              background: "coral"
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
