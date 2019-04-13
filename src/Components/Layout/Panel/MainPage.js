import React, { Component } from "react";
import MyBreadcrumb from "../Breadcrumb";
import { Table, Card } from "antd";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";

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
      .get("http://localhost:3001/user/panel", { withCredentials: true })
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
      .delete(`http://localhost:3001/app/deleteapp/${appid}`, {
        withCredentials: true
      })
      .then(theIndex => {
        this.getRegisteredCompanies();
      });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <div className="container responsive-padding-sides">
          {this.state.userApps ? (
            <>
              <MyBreadcrumb routes={[this.state.user.username, "home"]} />

              {this.state.userApps.noData ? (
                <div>
                  <h1>NO HAY DATA</h1>
                </div>
              ) : (
                <>
                  <div className="columns margin-top">
                    <div className="column">
                      <Table
                        columns={this.columns}
                        dataSource={this.state.userApps.tableData}
                        size="middle"
                      />
                    </div>
                  </div>
                  {this.state.userApps.noMonths ? (
                    <div>
                      <h1>NO HAY MESES</h1>
                    </div>
                  ) : (
                    <>
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
              <h1>LOADING...</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}
