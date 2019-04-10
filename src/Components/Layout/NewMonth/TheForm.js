import React, { Component } from "react";
import axios from "axios";

import {
  Form,
  Input,
  Tooltip,
  Select,
  Button,
  InputNumber,
  DatePicker
} from "antd";

const { Option } = Select;
const { MonthPicker } = DatePicker;

class TheFormClass extends Component {
  state = {
    confirmDirty: false,
    nameOfAppsArray: [],
    selectedApp: "",
    selectedMonth: "",
    selectedYear: "",
    typeOfApp: "",
    usersOfApp: [],
    nameMonth: "",
    appID: null
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const infoToSend = this.props.form.getFieldsValue();
        infoToSend.month = this.state.selectedMonth;
        infoToSend.year = this.state.selectedYear;
        infoToSend.now = new Date();
        infoToSend.nameMonth = this.state.nameMonth;

        axios
          .post(
            "http://localhost:3001/app/newmonth/" + this.state.appID,
            { infoToSend },
            { withCredentials: true }
          )
          .then(response => {
            this.props.statusNewMonth("good");
            this.props.form.resetFields();
          })
          .catch(err => {
            this.props.statusNewMonth("bad");
          });
      }
    });
  };

  getAppNamesTypeAndUsers = () => {
    axios
      .get("http://localhost:3001/user/get-income-type", {
        withCredentials: true
      })
      .then(response => {
        this.setState({ nameOfAppsArray: response.data });
      });
  };

  componentDidMount = () => {
    this.getAppNamesTypeAndUsers();
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
    const config = {};

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        {/* Input to select the app */}
        <h1>Select the app to add the new month below</h1>
        <Form.Item label="App to add Month" hasFeedback>
          {getFieldDecorator("selectedApp", {
            rules: [
              {
                required: true,
                message: "Please select the App to add the new month"
              }
            ],
            onChange: e => {
              const selApp = this.state.nameOfAppsArray.filter(objectApp => {
                return objectApp.name === e;
              });
              this.setState({
                selectedApp: e,
                typeOfApp: selApp[0].type,
                usersOfApp: selApp[0].users,
                appID: selApp[0].appID
              });
            }
          })(
            <Select placeholder="Please select the app you want to add the new month to">
              {this.state.nameOfAppsArray.map((appObject, index) => {
                return (
                  <Option key={index} value={appObject.name}>
                    {" "}
                    {appObject.name}{" "}
                  </Option>
                );
              })}
            </Select>
          )}
        </Form.Item>

        {/* Conditional to check if the app is of SaSS type and display the calendar */}
        {this.state.selectedApp !== "" ? (
          this.state.typeOfApp === "sell" ? (
            <p>
              {" "}
              Sorry, this app was registered with an income generetion type of
              selling, you cannot add monthly info to it
            </p>
          ) : (
            <>
              <Form.Item label="Select the Month">
                {getFieldDecorator("selectedMonth", {
                  rules: [
                    {
                      type: "object",
                      required: true,
                      message: "Please select time!"
                    }
                  ],
                  onChange: e => {
                    if (e) {
                      this.setState({
                        selectedMonth: e.month(),
                        selectedYear: e.year(),
                        nameMonth: e.toString().split(" ")[1]
                      });
                    }
                  }
                })(<MonthPicker />)}
              </Form.Item>
              <h1>
                Indicate the subscription price charged to each of the user
                types
              </h1>
              {this.state.usersOfApp.map((user, index) => {
                return (
                  <Form.Item label={user} key={index} hasFeedback>
                    {getFieldDecorator("userPrice" + index, {
                      rules: [
                        {
                          required: true,
                          message: "Please input the price of the suscription"
                        }
                      ]
                    })(<InputNumber min={0} placeholder="0" />)}
                  </Form.Item>
                );
              })}

              <h1>
                Indicate the average number of each type of user during the
                month
              </h1>
              {this.state.usersOfApp.map((user, index) => {
                return (
                  <Form.Item key={index} label={user}>
                    {getFieldDecorator("userAmount" + index, {
                      rules: [
                        {
                          required: true,
                          message: "Please indicate the number of users"
                        }
                      ]
                    })(<InputNumber min={0} placeholder="0" />)}
                    <span className="ant-form-text"> users </span>
                  </Form.Item>
                );
              })}
              <h1>Indicate the expenses of the month</h1>
              <Form.Item label="Hosting" hasFeedback>
                {getFieldDecorator("hosting", {
                  rules: [
                    {
                      required: true,
                      message: "Please input the monthly cost of your hosting"
                    }
                  ]
                })(<InputNumber min={0} placeholder="0" />)}
              </Form.Item>

              <Form.Item label="Domain" hasFeedback>
                {getFieldDecorator("domain", {
                  rules: [
                    {
                      required: true,
                      message: "Please input the monthly price of your domain"
                    }
                  ]
                })(<InputNumber min={0} placeholder="0" />)}
              </Form.Item>

              <Form.Item label="Database" hasFeedback>
                {getFieldDecorator("database", {
                  rules: [
                    {
                      required: true,
                      message: "Please input the monthly price of your datbase"
                    }
                  ]
                })(<InputNumber min={0} placeholder="0" />)}
              </Form.Item>

              <Form.Item label="Bucket" hasFeedback>
                {getFieldDecorator("bucket", {
                  rules: [
                    {
                      required: true,
                      message: "Please input the monthly price of your bucket"
                    }
                  ]
                })(<InputNumber min={0} placeholder="0" />)}
              </Form.Item>

              <Form.Item label="Others" hasFeedback>
                {getFieldDecorator("others", {
                  rules: [
                    {
                      required: true
                    }
                  ]
                })(<InputNumber min={0} placeholder="0" />)}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Submit month information!
                </Button>
              </Form.Item>
            </>
          )
        ) : null}
      </Form>
    );
  }
}

const TheForm = Form.create({
  name: "register"
})(TheFormClass);

export default TheForm;

{
  /*  <Form.Item label="Name" hasFeedback>
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Please input the name of your App"
                  }
                ]
              })(<Input />)}
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
          */
}
