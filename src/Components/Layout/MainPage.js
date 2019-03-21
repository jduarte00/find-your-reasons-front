import React, { Component } from "react";
import MyBreadcrumb from "./Breadcrumb";
import { Table } from "antd";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const data = {
  labels: ["Incomes", "Expenses", "Revenue", "Taxes"],
  datasets: [
    {
      label: "Proyect 1",
      data: [617594, 181045, 153060, 106519],
      backgroundColor: "rgba(255, 99, 132, 0.6)"
    },
    {
      label: "Proyect 2",
      data: [417594, 281045, 753060, 306519],
      backgroundColor: "rgba(0, 99, 132, 0.6)"
    },
    {
      label: "Proyect 3",
      data: [217594, 681045, 353060, 906519],
      backgroundColor: "rgba(100, 99, 132, 0.6)"
    }
  ]
};

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registeredCompanies: null,
      user: props.theUser
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
        render: id => (
          <div className="field has-addons" id="center-buttons-table">
            <p className="control">
              <a
                className="button is-success is-small"
                href={`http://localhost:3001/viewcompany/${id}`}
              >
                <span className="icon is-small">
                  <i className="fas fa-align-left" />
                </span>
                <span>View</span>
              </a>
            </p>
            <p className="control">
              <a
                className="button is-info is-small"
                href={`http://localhost:3001/editcompany/${id}`}
              >
                <span className="icon is-small">
                  <i className="fas fa-align-center" />
                </span>
                <span>Edit</span>
              </a>
            </p>
            <p className="control">
              <a
                className="button is-danger is-small"
                href={`http://localhost:3001/deletecompany/${id}`}
              >
                <span className="icon is-small">
                  <i className="fas fa-align-right" />
                </span>
                <span>Delete</span>
              </a>
            </p>
          </div>
        )
      }
    ];
  }

  getRegisteredCompanies = () => {
    axios
      .get("http://localhost:3001/user/panel", { withCredentials: true })
      .then(theData => {
        this.setState({ registeredCompanies: theData.data });
        return theData.data;
      });
  };

  componentDidMount = () => {
    this.getRegisteredCompanies();
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <div className="container">
          <MyBreadcrumb routes={[this.state.user.username, "home"]} />
          <div className="columns">
            <div className="column ">
              {this.state.registeredCompanies ? (
                <Table
                  columns={this.columns}
                  dataSource={this.state.registeredCompanies.tableData}
                  size="middle"
                />
              ) : null}
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <p class="heading">Total Income</p>
              <p class="title">3,456</p>
            </div>
            <div className="column">
              <p class="heading">Total Expenses</p>
              <p class="title">3,456</p>
            </div>
            <div className="column">
              <p class="heading">Total Revenue</p>
              <p class="title">3,456</p>
            </div>
            <div className="column">
              <p class="heading">Number of Developed Apps</p>
              <p class="title">3,456</p>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <Bar
                data={data}
                options={{
                  mantainAspectRatio: true,
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
