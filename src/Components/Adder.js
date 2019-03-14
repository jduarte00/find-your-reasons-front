import React, { Component } from "react";
import { connect } from "react-redux";

class Adder extends Component {
  render() {
    return (
      <div>
        <p>{this.props.counter}</p>
        <button onClick={() => this.props.dispatch({ type: "ADD" })}>
          ADD
        </button>
        <button onClick={() => this.props.dispatch({ type: "SUBSTRACT" })}>
          SUBSTRACT
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  counter: state.number.counter
});

export default connect(mapStateToProps)(Adder);
