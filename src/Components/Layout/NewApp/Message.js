import React from "react";
import { Alert } from "antd";

export default function Message(props) {
  console.log("corri message");
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
