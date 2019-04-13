import React, { Component } from "react";
import axios from "axios";
import MyBreadcrumb from "../Breadcrumb";
import { Line, Bar } from "react-chartjs-2";
import { Typography, Table, Divider, Card } from "antd";
const { Title, Text } = Typography;

export default class ViewApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.theUser,
      appData: null,
      appID: props.appID,
      appName: "",
      key: "income"
    };
    /* Create the column array for the display of the table */

    this.columns = [
      {
        title: "Date",
        dataIndex: "dataLabel",
        key: "dataLabel",
        align: "center"
      },
      {
        title: "Sales",
        dataIndex: "sales",
        key: "sales",
        align: "center"
      },
      {
        title: "Expenses",
        dataIndex: "expenses",
        key: "expenses",
        align: "center"
      },
      {
        title: "Users",
        dataIndex: "users",
        key: "users",
        align: "center"
      }
    ];

    this.tabList = [
      {
        key: "income",
        tab: "Income vs Last Month"
      },
      {
        key: "expenses",
        tab: "Expenses vs Last Month"
      },
      {
        key: "users",
        tab: "Users vs Last Month"
      }
    ];
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  createGraphsArrays = appData => {
    const mainChartData = {
      labels: appData.data.dataLabels,
      datasets: [
        {
          label: "Income",
          backgroundColor: "rgba(255,99,132)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: appData.data.incomeDataSeries
        },
        {
          label: "Expenses",
          backgroundColor: "rgba(255,0,0)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,0,0,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: appData.data.expensesDataSeries
        }
      ]
    };

    const userGraphData = {
      labels: appData.data.dataLabels,
      datasets: [
        {
          label: "Average Users per Month",
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: appData.data.usersDataSeries
        }
      ]
    };

    let forecastData = {};
    if (appData.data.forecast) {
      forecastData = {
        labels: appData.data.forecast.labels,
        datasets: [
          {
            label: "Average Users per Month",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: appData.data.forecast.forecastSeries
          }
        ]
      };
      console.log(forecastData, "forecast");
    }

    this.userGraphData = userGraphData;
    this.mainGraphData = mainChartData;
    this.forecastGraphData = forecastData;
  };

  createKpiCard = appData => {
    const content = {
      income: <p className="title"> {appData.data.incomeDifference}</p>,
      expenses: <p className="title"> {appData.data.expensesDifference}</p>,
      users: <p className="title"> {appData.data.userDifference}</p>
    };

    this.contentList = content;
  };

  getTheAppData = appID => {
    axios
      .get(
        `https://find-your-reasons-back.herokuapp.com/app/viewapp/${appID}`,
        {
          withCredentials: true
        }
      )
      .then(appData => {
        console.log(appData, "the app data");
        this.createGraphsArrays(appData);
        this.createKpiCard(appData);
        this.setState({
          appData: appData.data,
          appName: appData.data.theApp.name
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentWillMount = () => {
    this.getTheAppData(this.state.appID);
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <div className="container responsive-padding-sides">
          <MyBreadcrumb
            routes={[this.state.user.username, this.state.appName]}
          />

          {this.state.appData ? (
            <>
              <div className="columns margin-top">
                <div className="column">
                  <Title> {this.state.appName} </Title>
                </div>
              </div>
              {this.state.appData.theApp.months.length > 0 ? (
                <>
                  {/* Intro to the page */}
                  <div className="columns is-centered">
                    <div className="column is-half">
                      <Title level={3}>
                        {" "}
                        {`We have  ${
                          this.state.appData.tableDisplayArray.length
                        } months registered for this app in our database.`}{" "}
                      </Title>
                      <Text>
                        {" "}
                        Add more months to get more precise information.{" "}
                      </Text>{" "}
                    </div>
                  </div>
                  {/* Display the latest incomes, expenses and users of the app */}

                  <div className="margin-top">
                    <Divider
                      className="margin-top"
                      style={{ color: "dark-grey" }}
                    >
                      {" "}
                      Latest Month Numbers
                    </Divider>
                  </div>

                  <div className="columns is-centered">
                    <div className="column is-half">
                      <div className="columns">
                        <div className="column">
                          <p className="heading">Income</p>
                          <p className="title">
                            {
                              this.state.appData.incomeDataSeries[
                                this.state.appData.incomeDataSeries.length - 1
                              ]
                            }
                          </p>
                        </div>
                        <div className="column">
                          <p className="heading">Expenses</p>
                          <p className="title">
                            {" "}
                            {
                              this.state.appData.expensesDataSeries[
                                this.state.appData.expensesDataSeries.length - 1
                              ]
                            }
                          </p>
                        </div>
                        <div className="column">
                          <p className="heading">Users</p>
                          <p className="title">
                            {
                              this.state.appData.usersDataSeries[
                                this.state.appData.usersDataSeries.length - 1
                              ]
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Display of the table if there is at least one element on the app */}

                  {this.state.appData.tableDisplayArray.length ? (
                    <div className="columns margin-top">
                      <div className="column">
                        <Table
                          columns={this.columns}
                          dataSource={this.state.appData.tableDisplayArray}
                        />
                      </div>
                    </div>
                  ) : (
                    <Text>There was a problem displaying this table</Text>
                  )}

                  {/* Conditional to check if there is enough data to present graphs */}

                  {this.state.appData.incomeDataSeries.length === 0 ? (
                    <h1>
                      Sorry, there is not enough data to display this
                      information, add more months and try again!
                    </h1>
                  ) : (
                    /* Data that will be display if there is enough information */
                    <>
                      {/* Main chart with the income and expenses */}
                      <div className="columns margin-top is-centered">
                        <div className="column is-half">
                          <Title level={2}> Incomes and Expenses </Title>
                          <Bar
                            data={this.mainGraphData}
                            options={{
                              mantainAspectRatio: true,
                              scales: {
                                yAxes: [
                                  {
                                    ticks: {
                                      beginAtZero: true
                                    }
                                  }
                                ]
                              }
                            }}
                          />
                        </div>
                        {/* Chart with the number of users */}
                        <div className="column is-half margin-top-responsive">
                          <Title level={2}> Average Users </Title>
                          <Line
                            data={this.userGraphData}
                            options={{
                              mantainAspectRatio: false,
                              responsive: true,
                              scales: {
                                yAxes: [
                                  {
                                    ticks: {
                                      beginAtZero: true
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

                  {/* Conditional to present the KPI card's */}

                  {this.state.appData.kpiError ? (
                    <Title level={2}>
                      Sorry, you need at to provide at least 2 months of data in
                      order for us to give you kpi values{" "}
                    </Title>
                  ) : (
                    <div className="columns margin-top is-centered">
                      {/* KPI against self */}
                      <div className="column">
                        <Title level={2}> You vs yourself </Title>
                        <Card
                          title="Your App Metrics"
                          tabList={this.tabList}
                          activeTabKey={this.state.key}
                          onTabChange={key => {
                            this.onTabChange(key, "key");
                          }}
                        >
                          {this.contentList[this.state.key]}
                        </Card>
                      </div>
                    </div>
                  )}
                  {/* Forecasted graphic */}
                  {this.state.appData.incomeDataSeries.length < 8 ? (
                    <div className="columns margin-top is-centered">
                      <div className="column is-three-quarters">
                        <Title level={2}>
                          Sorry, you need at to provide at least 8 months of
                          data in order for us to give you good forecasted
                          values{" "}
                        </Title>
                      </div>
                    </div>
                  ) : (
                    <div className="columns margin-top is-centered">
                      <div className="column is-three-quarters">
                        <Title level={2}>
                          {" "}
                          Your forecasted sales for the next months!{" "}
                        </Title>
                        <Line
                          data={this.forecastGraphData}
                          options={{
                            mantainAspectRatio: false,
                            responsive: true,
                            scales: {
                              yAxes: [
                                {
                                  ticks: {
                                    beginAtZero: true
                                  }
                                }
                              ]
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}
                </>
              ) : this.state.appData.theApp.incomeGeneration !== "saas" ? (
                <>
                  <div className="columns is-centered">
                    <div className="column is-half">
                      <Title level={3}>
                        {`You sold this app on ${
                          this.state.appData.dayOfCreation
                        } ${this.state.appData.monthOfCreation} ${
                          this.state.appData.yearOfCreation
                        }`}
                      </Title>
                    </div>
                  </div>
                  <div className="margin-top">
                    <Divider
                      className="margin-top"
                      style={{ color: "dark-grey" }}
                    >
                      {" "}
                      Your Sale
                    </Divider>
                  </div>

                  <div className="columns is-centered">
                    <div className="column is-half">
                      <div className="columns">
                        <div className="column">
                          <p className="heading">Sold Price</p>
                          <p className="title">
                            {this.state.appData.theApp.sellingPrice}
                          </p>
                        </div>
                        <div className="column">
                          <p className="heading">Cost of Development</p>
                          <p className="title">
                            {this.state.appData.theApp.totalCostOfDevelopment}
                          </p>
                        </div>
                        <div className="column">
                          <p className="heading">Revenue</p>
                          <p className="title">
                            {this.state.appData.theApp.sellingPrice -
                              this.state.appData.theApp.totalCostOfDevelopment}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <h1>
                    {" "}
                    You need to provide a month to be able to visualize more
                    info!
                  </h1>
                </div>
              )}
            </>
          ) : (
            <span> Loading ...</span>
          )}
        </div>
      </div>
    );
  }
}
