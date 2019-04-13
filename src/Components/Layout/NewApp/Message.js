import React from "react";
import { Alert } from "antd";

export default function Message(props) {
  return (
    <Alert
      message={props.message}
      showIcon={true}
      banner
      type={props.typeOfMessage}
      closable
    />
  );
}
