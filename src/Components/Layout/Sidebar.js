import React from "react";

import { Layout, Menu, Icon } from "antd";

const { Sider } = Layout;

const SubMenu = Menu.SubMenu;

export default function Sidebar(props) {
  return (
    <Sider
      collapsible
      collapsed={props.collapsed}
      onCollapse={props.handleOnCollapse}
    >
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item
          key="1"
          onClick={() => {
            props.changeRoute("home");
          }}
          style={{ paddingLeft: "0" }}
        >
          <Icon type="home" />
          <span>Home</span>
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => {
            props.changeRoute("newapp");
          }}
        >
          <Icon type="plus" />
          <span>New App</span>
        </Menu.Item>

        <Menu.Item
          selected={true}
          key="4"
          onClick={() => {
            props.changeRoute("newmonth");
          }}
        >
          <Icon type="calendar" />
          <span>New Month</span>
        </Menu.Item>

        <Menu.Item
          key="3"
          onClick={() => {
            props.changeRoute("profile");
          }}
        >
          <Icon type="user" />
          <span>Profile</span>
        </Menu.Item>

        {/* <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="user" />
              <span>User</span>
            </span>
          }
        >
          
          {props.nameOfApps.map((objectWithName, index) => {
            return (
              <Menu.Item
                key={index + 5}
                onClick={() => {
                  props.changeRoute("viewapp", objectWithName.appID);
                }}
              >
                {objectWithName.name}
              </Menu.Item>
            );
          })}
        </SubMenu> */}
      </Menu>
    </Sider>
  );
}
