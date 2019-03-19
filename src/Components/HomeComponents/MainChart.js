import React from "react";

export default function MainChart() {
  return (
    <div className="container main-chart">
      <div className="columns is-centered">
        <div className="column is-half">
          <h1 className="is-size-3 is-size-4-mobile service-section-description">
            Great Visualizations
          </h1>
        </div>
      </div>
      <div className="columns level">
        <div className="column">
          <img
            src="https://docs.moodle.org/dev/images_dev/c/c5/bar_chart.png"
            alt="a chart"
          />
        </div>
        <div className="column">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A ducimus
            ad molestias obcaecati odio commodi cupiditate quaerat rerum, quae,
            ex sequi perspiciatis soluta delectus eaque totam voluptas.
          </p>
        </div>
      </div>
    </div>
  );
}
