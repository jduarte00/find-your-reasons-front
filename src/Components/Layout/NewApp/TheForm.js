import React, { Component } from "react";
import axios from "axios";

import { Form, Input, Tooltip, Icon, Select, Button, Radio } from "antd";

const { Option } = Select;

let idDynamicForm = 0;

class TheFormClass extends Component {
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
            console.log(response);
            return response;
          })
          .catch(err => {
            //IMPROVEMENT: SHOW AN UI MESSAGE WHEN SOMETHING GOES WRONG!
            console.log(err);
          });
      }
    });
  };

  //Method to delete an item from the dynamic form

  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    //I think i might be able to delete this part because i'm not using data binding
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  //Method to add an item to the dynamic form

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(idDynamicForm++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
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
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 }
      }
    };

    const formItemLayoutDynamic = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };

    //Code for generating dynamic input layout

    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayoutDynamic : formItemLayoutWithOutLabel)}
        label={index === 0 ? "User type" : ""}
        required={false}
        key={k}
      >
        {getFieldDecorator(`userTypes[${k}]`, {
          validateTrigger: ["onChange", "onBlur"],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input passenger's name or delete this field."
            }
          ]
        })(
          <Input
            placeholder="user type name"
            style={{ width: "60%", marginRight: 8 }}
          />
        )}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));

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

        {formItems}

        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
            <Icon type="plus" /> Add field
          </Button>
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
