import React from "react";

export default function Footer() {
  return (
    <div
      className="has-background-black has-text-white footer-section"
      id="footer-section"
    >
      <div className="container footer-container">
        <h1 className="has-text-white is-size-2 is-size-4-mobile">
          Sign up and know your reasons
        </h1>
        <div className="columns is-centered">
          <div className="column is-half">
            <p className="is-size-5 service-section-description">
              All the information you submit is <u>confidential</u> and can only
              be seen by you. Know your reasons only use it to calculate the
              different global sector KPI's and ratios in an anonymous way.
            </p>
          </div>
        </div>
        <div className="logo-footer">
          <span className="is-size-2">
            KYR{" "}
            <span className="icon is-large theicon">
              <i class="fas fa-chart-line " />
            </span>
          </span>
        </div>

        <a
          href="/home"
          className="button is-rounded is-warning is-medium is-size-3"
        >
          <span>Sign up now!</span>{" "}
          <span className="icon is-small theicon">
            <i class="fas fa-user-plus" />
          </span>
        </a>
      </div>
      <div className="columns is-centered low-bar has-background-grey-light has-text-black">
        <div className="column is-half">
          <span>
            Made by <a href="https://github.com/jduarte00">Jose Duarte</a> using{" "}
            <a href="https://bulma.io/">Bulma</a>,{" "}
            <a href="https://ant.design/">Ant Design</a> and{" "}
            <a href="https://reactjs.org/">React</a>{" "}
          </span>
          <span className="icon is-small">
            <i class="fas fa-laptop" />
          </span>
        </div>
      </div>
    </div>
  );
}
