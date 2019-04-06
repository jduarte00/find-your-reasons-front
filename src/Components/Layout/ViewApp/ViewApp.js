import React, { Component } from "react";
import axios from "axios";
import MyBreadcrumb from "../Breadcrumb";
import { Line } from "react-chartjs-2";
import { List } from "antd";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,0,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

export default class ViewApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.theUser,
      appData: null,
      appID: props.appID
    };
  }

  getTheAppData = appID => {
    setTimeout(() => {
      axios
        .get(`http://localhost:3001/app/viewapp/${appID}`, {
          withCredentials: true
        })
        .then(appData => {
          this.setState({ appData: appData.data });
        });
    }, 2000);
  };

  componentWillMount = () => {
    this.getTheAppData(this.state.appID);
  };
  render() {
    return (
      <div>
        <div className="container responsive-padding-sides">
          <MyBreadcrumb routes={[this.state.user.username, "view app"]} />

          {this.state.appData ? (
            <>
              <div className="columns margin-top">
                <div className="column">
                  <h1>{this.state.appData.name}</h1>
                </div>
              </div>
              <div className="columns margin-top">
                <div className="column is-half">lol</div>
              </div>
              <div className="columns margin-top is-centered">
                <div className="column is-three-quarters">
                  <Line data={data} options={{ mantainAspectRatio: false }} />
                </div>
              </div>
            </>
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </div>
    );
  }
}
