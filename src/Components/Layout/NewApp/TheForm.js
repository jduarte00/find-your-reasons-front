import React, { Component } from "react";
import axios from "axios";

import {
  Form,
  Input,
  Tooltip,
  Icon,
  Select,
  Button,
  AutoComplete,
  Radio
} from "antd";

const { Option } = Select;

class TheFormClass extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const infoToSend = this.props.form.getFieldsValue();
        axios
          .post(
            "http://localhost:3001/app/createapp",
            { infoToSend },
            { withCredentials: true }
          )
          .then(response => {
            console.log("all fine mate!");
            return response;
          });
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 10,
          offset: 8
        }
      }
    };

    console.log(this.props.form.getFieldsValue());

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Name" hasFeedback>
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please input the name of your App"
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Category" hasFeedback>
          {getFieldDecorator("category", {
            rules: [
              {
                required: true,
                message: "Please select the category of your app"
              }
            ]
          })(
            <Select placeholder="Please select a category">
              <Option value="productivity">Productivity</Option>
              <Option value="finance">Finance</Option>
              <Option value="game">Games</Option>
              <Option value="utility">Utilities</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label={
            <span>
              Size of the App&nbsp;
              <Tooltip title="Small for apps with 5,000 users or less, Medium for apps with 10,000 users or less and Big for apps over 10k">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("size", {
            rules: [{ required: true, message: "Please select a size" }]
          })(
            <Radio.Group>
              <Radio.Button value="small">Small</Radio.Button>
              <Radio.Button value="medium">Medium</Radio.Button>
              <Radio.Button value="big">Big</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>

        <Form.Item label="Income Generation" hasFeedback>
          {getFieldDecorator("incomeGeneration", {
            rules: [
              {
                required: true,
                message: "Please select the type of income of your app"
              }
            ]
          })(
            <Select placeholder="How do you plan to make money?">
              <Option value="sell">Selling my app</Option>
              <Option value="saas">SaaS</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Select platforms" hasFeedback>
          {getFieldDecorator("supportedPlatforms", {
            rules: [
              {
                required: true,
                message: "Please select all the platforms",
                type: "array"
              }
            ]
          })(
            <Select
              mode="multiple"
              placeholder="Please select the supported platforms"
            >
              <Option value="windows">Windows</Option>
              <Option value="osx">OSX</Option>
              <Option value="ios">iOS</Option>
              <Option value="android">Android</Option>
              <Option value="web">Web App</Option>
              <Option value="other">Other</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Create new App!
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const TheForm = Form.create({ name: "register" })(TheFormClass);

export default TheForm;
