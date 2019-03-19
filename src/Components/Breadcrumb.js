import React from "react";
import { Breadcrumb } from "antd";

export default function MyBreadcrumb() {
  return (
    <Breadcrumb style={{ margin: "16px 20px", textAlign: "left" }}>
      <Breadcrumb.Item>User</Breadcrumb.Item>
      <Breadcrumb.Item>Bill</Breadcrumb.Item>
    </Breadcrumb>
  );
}
