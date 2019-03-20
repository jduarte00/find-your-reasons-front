import React, { Component } from "react";

export default class Hero extends Component {
  makeHamburger = () => {
    document.addEventListener("DOMContentLoaded", () => {
      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
      );

      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
          el.addEventListener("click", () => {
            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle("is-active");
            $target.classList.toggle("is-active");
          });
        });
      }
    });
  };

  render() {
    return (
      <div className="hero is-info is-medium">
        <div className="hero-head">
          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <a className="navbar-item">
                  <span className="is-size-2">
                    KYR{" "}
                    <span className="icon is-large theicon">
                      <i className="fas fa-chart-line " />
                    </span>
                  </span>
                </a>
                <span
                  className="navbar-burger burger"
                  data-target="navbarMenuHeroA"
                >
                  <span />
                  <span />
                  <span />
                </span>
              </div>
              <div id="navbarMenuHeroA" className="navbar-menu">
                <div className="navbar-end">
                  <a className="navbar-item is-active">Home</a>
                  <a className="navbar-item" href="/signin">
                    Sign In
                  </a>
                  <a className="navbar-item" href="/signup">
                    Sign Up
                  </a>
                  <span className="navbar-item">
                    <a className="button is-primary is-inverted">
                      <span className="icon">
                        <i className="fab fa-github" />
                      </span>
                      <span>My Code :)</span>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Know Your Reasons</h1>
            <h2 className="subtitle">
              We belive every business have the potential to be big. You just
              need the right intel...
            </h2>
          </div>
        </div>

        <div className="hero-foot">
          <nav className="tabs">
            <div className="container">
              <ul>
                <li>
                  <a href="#services-section">Services</a>
                </li>

                <li>
                  <a href="#main-chart">Visualization</a>
                </li>
                <li>
                  <a href="#kpi-section">Benchmarking</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        {this.makeHamburger()}
      </div>
    );
  }
}
