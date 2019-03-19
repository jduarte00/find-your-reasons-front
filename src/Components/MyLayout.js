import React, { Component } from "react";

import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";

import "../App.css";

import Home from "./Home";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import MyBreadcrumb from "./Breadcrumb";

const { Content, Footer } = Layout;

export default class MyLayout extends Component {
  state = {
    collapsed: true,
    currentRoute: "home"
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar
          handleOnCollapse={this.onCollapse}
          collapsed={this.state.collapsed}
        />
        <Layout>
          <Topbar />
          {this.state.currentRoute === "home" ? null : (
            <MyBreadcrumb currentRoute={this.state.currentRoute} />
          )}
          <Content>
            <Switch>
              <Route exact path="/home" component={Home} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Creado por José Duarte utilizando{" "}
            <a href="https://reactjs.org/">React</a> y{" "}
            <a href="https://ant.design">AntDesign</a> 🖤
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
