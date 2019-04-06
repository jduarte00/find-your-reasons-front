import React from "react";
import { Alert } from "antd";

export default function Message(props) {
  return (
    <Alert
      message={
        <span>
          The new app has been added to your account. You can{" "}
          <a
            onClick={() => {
              props.changeRoute("home");
            }}
          >
            add monthly information here
          </a>{" "}
          or return to your{" "}
          <a
            onClick={() => {
              props.changeRoute("home");
            }}
          >
            profile
          </a>
        </span>
      }
      showIcon={true}
      banner
      type="success"
      closable
    />
  );
}
