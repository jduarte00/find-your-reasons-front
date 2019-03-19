import React from "react";

import { Button, Icon } from "antd";

export default function Home() {
  return (
    <div>
      <div className="heroReasons">
        <div className="logo">
          <img
            src="http://www.stickpng.com/assets/images/584d4b6e0a44bd1070d5d493.png"
            alt="logo"
            className="mainLogo"
          />
        </div>
        <div className="mainDescription">
          <h1 className="appMainName">Find your reasons</h1>
          <div className="appMainDescription">
            <p>
              We think every business have the potential to be sucessfull, you
              just need the right intel...
            </p>
          </div>
          <div className="mainButtonSection">
            <Button shape="round"> Our offer to you</Button>
            <Button shape="round"> Create an account with us</Button>
          </div>
        </div>
      </div>
      <div className="ourMainServices">
        <div className="ant-row">
          <div className="ant-col-md-6">
            <Icon type="dashboard" style={{ fontSize: "2rem" }} />
            <h3>Acid Reason</h3>
            <hr />
            <p>Would you like to know how fuck your organization is?</p>
          </div>
        </div>
      </div>
    </div>
  );
}
