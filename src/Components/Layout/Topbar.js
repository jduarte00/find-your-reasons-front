import React, { Component } from "react";
import { Layout, Avatar, Dropdown, Menu } from "antd";
import AuthService from "../LoginComponents/auth-service";
const { Header } = Layout;

export default class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: props.theUser };
    this.service = new AuthService();
    this.userMenu = (
      <Menu>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.alipay.com/"
          >
            Go to Profile
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.taobao.com/"
          >
            Go to Stats
          </a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.logoutUser} rel="noopener noreferrer" href="/">
            Logout
          </a>
        </Menu.Item>
      </Menu>
    );
  }

  logoutUser = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);
    });
  };

  render() {
    return (
      <Header
        style={{
          background: "#051525",
          padding: "0 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <span className="is-size-2 has-text-white">
          KYR{" "}
          <span className="icon is-large theicon">
            <i className="fas fa-chart-line " />
          </span>
        </span>
        <Dropdown overlay={this.userMenu}>
          <a className="ant-dropdown-link" href="#">
            {/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            {console.log(this.state.user.username */}

            {this.state.loggedInUser.username}
          </a>
        </Dropdown>
      </Header>
    );
  }
}
