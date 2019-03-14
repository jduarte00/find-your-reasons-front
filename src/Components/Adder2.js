import React, { Component } from "react";
import { connect } from "react-redux";

class AdderSecond extends Component {
  render() {
    return (
      <div>
        <p>{this.props.counter}</p>
        <button onClick={() => this.props.dispatch({ type: "ADD2" })}>
          ADD
        </button>
        <button onClick={() => this.props.dispatch({ type: "SUBSTRACT2" })}>
          SUBSTRACT
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  counter: state.secondNumber.contador
});

export default connect(mapStateToProps)(AdderSecond);
