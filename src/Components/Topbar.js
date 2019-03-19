import React from "react";
import { Layout, Avatar, Dropdown, Menu } from "antd";
const { Header } = Layout;

const userMenu = (
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
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        Go to hell
      </a>
    </Menu.Item>
  </Menu>
);

export default function Topbar() {
  return (
    <Header
      style={{
        background: "#ff220c",
        padding: "0 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <span>Logo Placeholder</span>
      <Dropdown overlay={userMenu}>
        <a className="ant-dropdown-link" href="#">
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </a>
      </Dropdown>
    </Header>
  );
}
