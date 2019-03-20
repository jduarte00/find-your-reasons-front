import React from "react";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["Acid Reason", "ROI", "Sales vs Expenses", "Total Revenue"],
  datasets: [
    {
      label: "2017",
      data: [617594, 181045, 153060, 106519],
      backgroundColor: "rgba(255, 99, 132, 0.6)"
    },
    {
      label: "2018",
      data: [417594, 281045, 753060, 306519],
      backgroundColor: "rgba(0, 99, 132, 0.6)"
    },
    {
      label: "2019",
      data: [217594, 681045, 353060, 906519],
      backgroundColor: "rgba(100, 99, 132, 0.6)"
    }
  ]
};

export default function MainChart() {
  return (
    <div className="has-background-light">
      <div className="container main-chart" id="main-chart">
        <div className="columns level">
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
          <div className="column">
            <h1 className="is-size-2 is-size-4-mobile service-section-description">
              Great Visualizations
            </h1>
            <p className="is-size-5 service-section-description">
              Explore and analyze your information with interactive charts that
              are capable of showing different data sets and a variety of charts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
