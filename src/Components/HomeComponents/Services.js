import React from "react";

export default function Services() {
  return (
    <div className="container services-section" id="services-section">
      <div className="columns is-centered">
        <div className="column is-half">
          <h1 className="is-size-2 is-size-4-mobile service-section-description">
            Wide number of finantial ratios and indicators to help you to know
            your business
          </h1>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <i className="fas fa-sort-numeric-down fa-4x" />
          <hr />
          <h3>Total Income</h3>
          <hr />
          <p className="is-family-monospace">
            It doesn't matter how many apps you have, we help you keep track of
            you total income regardless of the number of users or the way you
            generate income.
          </p>
        </div>
        <div className="column">
          <i className="fas fa-chart-pie fa-4x" />
          <hr />
          <h3>Total Expenses</h3>
          <hr />
          <p className="is-family-monospace">
            Controlling your expenses is an important part of your career, we
            help you know how much you spent on each category.
          </p>
        </div>
        <div className="column">
          <i className="fas fa-piggy-bank fa-4x" />
          <hr />
          <h3>Total Users</h3>
          <hr />
          <p className="is-family-monospace">
            Look at trends and be able to know if your database of users is
            growing or not, so you can implement the right measures at the right
            time
          </p>
        </div>
      </div>
    </div>
  );
}
