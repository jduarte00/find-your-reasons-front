import React from "react";

export default function WrongRoute() {
  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-three-quarters">
          <img
            src="/resources/error.png"
            alt="Not Found"
            style={{ maxHeight: "150px", marginTop: "50px" }}
          />
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-half">
          <p style={{ marginTop: "50px" }}>Sorry, check your route please :)</p>
        </div>
      </div>
    </div>
  );
}
