import React, { Component } from "react";
import MyBreadcrumb from "../Breadcrumb";
import { Table, Card } from "antd";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";

const data = {
  labels: ["Incomes", "Expenses", "Revenue", "Taxes"],
  datasets: [
    {
      label: "App 1",
      data: [617594, 181045, 153060, 106519],
      backgroundColor: "rgba(255, 99, 132, 0.6)"
    },
    {
      label: "App 2",
      data: [417594, 281045, 753060, 306519],
      backgroundColor: "rgba(0, 99, 132, 0.6)"
    },
    {
      label: "App 3",
      data: [217594, 681045, 353060, 906519],
      backgroundColor: "rgba(100, 99, 132, 0.6)"
    }
  ]
};

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userApps: null,
      user: props.theUser,
      key: "User Score"
    };

    this.columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Actions",
        dataIndex: "view",
        align: "right",
        key: "view",
        render: theId => (
          <div className="field has-addons" id="center-buttons-table">
            <p className="control" id="remove-margin-buttons">
              <a
                className="button is-success is-small"
                href={`http://localhost:3001/viewcompany/${theId}`}
              >
                <span className="icon is-small">
                  <i className="fas fa-align-left" />
                </span>
                <span>View</span>
              </a>
            </p>
            <p className="control" id="remove-margin-buttons">
              <span
                className="button is-info is-small"
                onClick={() => {
                  this.props.changeRoute("viewapp", theId);
                }}
              >
                <span className="icon is-small">
                  <i className="fas fa-align-center" />
                </span>
                <span>Edit</span>
              </span>
            </p>
            <p className="control" id="remove-margin-buttons">
              <span
                className="button is-danger is-small"
                onClick={(e, Id = theId) => {
                  this.deleteApp(Id);
                }}
              >
                <span className="icon is-small">
                  <i className="fas fa-align-right" />
                </span>
                <span>Delete</span>
              </span>
            </p>
          </div>
        )
      }
    ];

    this.tabList = [
      {
        key: "User Score",
        tab: "user score"
      },
      {
        key: "Second Metric",
        tab: "second metric"
      },
      {
        key: "Third Metric",
        tab: "third metric"
      }
    ];

    this.contentList = {
      "User Score": <p className="title"> 659</p>,
      "Second Metric": <p className="title">234</p>,
      "Third Metric": <p className="title">789</p>
    };
  }

  getRegisteredCompanies = () => {
    axios
      .get("http://localhost:3001/user/panel", { withCredentials: true })
      .then(theData => {
        this.setState({ userApps: theData.data });
        return theData.data;
      });
  };

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  componentDidMount = () => {
    this.getRegisteredCompanies();
  };

  deleteApp = appid => {
    console.log(appid, "this is fckn appid");
    axios
      .delete(`http://localhost:3001/app/deleteapp/${appid}`, {
        withCredentials: true
      })
      .then(theIndex => {
        this.getRegisteredCompanies();
      });
  };

  render() {
    return (
      <div>
        <div className="container responsive-padding-sides">
          <MyBreadcrumb routes={[this.state.user.username, "home"]} />
          <div className="columns margin-top">
            <div className="column">
              {this.state.userApps ? (
                <Table
                  columns={this.columns}
                  dataSource={this.state.userApps.tableData}
                  size="middle"
                />
              ) : null}
            </div>
          </div>
          <div className="columns margin-top">
            <div className="column">
              <p className="heading">Total Income</p>
              <p className="title">3,456</p>
            </div>
            <div className="column">
              <p className="heading">Total Expenses</p>
              <p className="title">3,456</p>
            </div>
            <div className="column">
              <p className="heading">Total Revenue</p>
              <p className="title">3,456</p>
            </div>
            <div className="column">
              <p className="heading">Number of Developed Apps</p>
              <p className="title">3,456</p>
            </div>
          </div>
          <div className="columns margin-top">
            <div className="column">
              <Bar
                data={data}
                options={{
                  mantainAspectRatio: false,
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          callback: function(value, index, values) {
                            if (parseInt(value) >= 1000) {
                              return (
                                "$" +
                                value
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              );
                            } else {
                              return "$" + value;
                            }
                          }
                        }
                      }
                    ]
                  }
                }}
              />
            </div>
          </div>
          <div className="columns margin-top">
            <div className="column is-half">
              <Card
                style={{ height: "100%" }}
                title="Main Metrics"
                tabList={this.tabList}
                activeTabKey={this.state.key}
                onTabChange={key => {
                  this.onTabChange(key, "key");
                }}
              >
                {this.contentList[this.state.key]}
              </Card>
            </div>
            <div className="column is-half margin-top-responsive">
              <Pie
                data={data}
                options={{
                  mantainAspectRatio: false,
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          callback: function(value, index, values) {
                            if (parseInt(value) >= 1000) {
                              return (
                                "$" +
                                value
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              );
                            } else {
                              return "$" + value;
                            }
                          }
                        }
                      }
                    ]
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
