import React, { Component } from "react";
import MyBreadcrumb from "../Breadcrumb";
import { Table, Card, Icon, Divider, Typography } from "antd";

import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";

const { Title, Paragraph, Text } = Typography;
export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userApps: null,
      user: props.theUser,
      key: "income"
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
        render: theId => {
          return (
            <div className="field has-addons" id="center-buttons-table">
              <p className="control" id="remove-margin-buttons">
                <a
                  className="button is-success is-small"
                  onClick={() => {
                    this.props.changeRoute("viewapp", theId);
                  }}
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
                  onClick={(e, theId) => {
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
          );
        }
      }
    ];

    this.tabList = [
      {
        key: "income",
        tab: "Income Diff"
      },
      {
        key: "expenses",
        tab: "Expenses Diff"
      },
      {
        key: "users",
        tab: "Users Diff"
      }
    ];
  }

  makeKpiInfo = theData => {
    const valueIndicators = {
      incomeDifference:
        theData.data.incomeDifference >= 0
          ? "+" + "$" + theData.data.incomeDifference
          : "-" + "$" + Math.abs(theData.data.incomeDifference),
      expensesDifference:
        theData.data.expensesDifference >= 0
          ? "+" + "$" + theData.data.expensesDifference
          : "-" + "$" + Math.abs(theData.data.expensesDifference),
      usersDifference:
        theData.data.usersDifference >= 0
          ? "+" + theData.data.usersDifference
          : "-" + Math.abs(theData.data.usersDifference)
    };

    this.contentList = {
      income: <p className="title"> {valueIndicators.incomeDifference}</p>,
      expenses: <p className="title"> {valueIndicators.expensesDifference}</p>,
      users: <p className="title">{valueIndicators.usersDifference}</p>
    };
  };

  makeMainChartData = theData => {
    this.dataMainChart = {
      labels: ["Incomes", "Expenses", "Users"],
      datasets: theData.data.mainGraphArray
    };
  };

  makeExpensesChartData = theData => {
    this.dataExpensesChart = {
      labels: theData.data.expensesGraphArray.labels,
      datasets: [
        {
          data: theData.data.expensesGraphArray.dataSeries,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB"
          ]
        }
      ]
    };
  };

  getRegisteredCompanies = () => {
    axios
      .get("https://find-your-reasons-back.herokuapp.com/user/panel", {
        withCredentials: true
      })
      .then(theData => {
        if (!(theData.data.noData || theData.data.noMonths)) {
          this.makeKpiInfo(theData);
          this.makeMainChartData(theData);
          this.makeExpensesChartData(theData);
        }

        this.setState({ userApps: theData.data });
      });
  };

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  componentDidMount = () => {
    this.getRegisteredCompanies();
  };

  deleteApp = appid => {
    axios
      .delete(
        `https://find-your-reasons-back.herokuapp.com/app/deleteapp/${appid}`,
        {
          withCredentials: true
        }
      )
      .then(theIndex => {
        this.getRegisteredCompanies();
      });
  };

  render() {
    return (
      <div>
        <div className="container responsive-padding-sides">
          {this.state.userApps ? (
            <>
              <MyBreadcrumb routes={[this.state.user.username, "home"]} />

              {this.state.userApps.noData ? (
                <div style={{ marginTop: "150px" }}>
                  <Title level={3}>
                    {" "}
                    You have not registered any app yet, please do so!
                  </Title>
                  <Icon
                    type="eye-invisible"
                    style={{ fontSize: "100px", marginTop: "50px" }}
                  />
                </div>
              ) : (
                <>
                  <Divider>Welcome Back</Divider>
                  <div
                    className="columns is-centered"
                    style={{ marginTop: "50px" }}
                  >
                    <div className="column is-half">
                      <Title level={2}>
                        {" "}
                        This are your monthly kpi's and numbers
                      </Title>
                      <Icon
                        type="arrow-down"
                        style={{ fontSize: "50px", marginTop: "15px" }}
                      />
                    </div>
                  </div>
                  <Divider orientation="left" style={{ marginTop: "100px" }}>
                    Your registered apps
                  </Divider>
                  <div className="columns margin-top">
                    <div className="column">
                      <Table
                        columns={this.columns}
                        dataSource={this.state.userApps.tableData}
                        size="middle"
                        style={{ marginTop: "20px" }}
                      />
                    </div>
                  </div>
                  {this.state.userApps.noMonths ? (
                    <div>
                      <h1 style={{ marginTop: "200px" }}>
                        Add apps with months (SasS income generation type) and
                        add months to be able to see this information!
                      </h1>
                    </div>
                  ) : (
                    <>
                      <Divider
                        orientation="left"
                        style={{ marginTop: "150px" }}
                      >
                        Your monthly numbers
                      </Divider>
                      <div className="columns margin-top">
                        <div className="column">
                          <p className="heading">Total Income</p>
                          <p className="title">
                            {this.state.userApps.allIncomes}
                          </p>
                        </div>
                        <div className="column">
                          <p className="heading">Total Expenses</p>
                          <p className="title">
                            {this.state.userApps.allExpenses}
                          </p>
                        </div>
                        <div className="column">
                          <p className="heading">Total Users</p>
                          <p className="title">
                            {this.state.userApps.allUsers}
                          </p>
                        </div>
                      </div>
                      <Divider style={{ marginTop: "150px" }}>
                        Your apps performance
                      </Divider>
                      <div className="columns margin-top">
                        <div className="column">
                          <Bar
                            data={this.dataMainChart}
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
                                              .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                              )
                                          );
                                        } else {
                                          return "$" + value;
                                        }
                                      },
                                      beginAtZero: true
                                    }
                                  }
                                ]
                              }
                            }}
                          />
                        </div>
                      </div>
                      <Divider
                        orientation="left"
                        style={{ marginTop: "150px" }}
                      >
                        {" "}
                        KPI's and Expenses of the Month
                      </Divider>
                      <div className="columns margin-top">
                        <div className="column is-half">
                          {this.state.userApps.incomeDifference ? (
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
                          ) : (
                            <div>
                              <h1>
                                You need to provide info about the past month to
                                be able to see this information
                              </h1>
                            </div>
                          )}
                        </div>
                        <div className="column is-half margin-top-responsive">
                          <Pie
                            data={this.dataExpensesChart}
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
                                              .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                              )
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
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <div>
              <Icon type="loading" style={{ marginTop: "300px" }} />
              <h1>Loading...</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}
