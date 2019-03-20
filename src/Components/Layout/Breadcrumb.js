import React from "react";
import { Breadcrumb } from "antd";

export default function MyBreadcrumb(props) {
  let allBreads = props.routes.map((item, current) => {
    return <Breadcrumb.Item>{item}</Breadcrumb.Item>;
  });

  return (
    <Breadcrumb style={{ margin: "16px 20px", textAlign: "left" }}>
      {allBreads}
    </Breadcrumb>
  );
}
