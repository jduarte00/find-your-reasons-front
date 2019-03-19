import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./Store";
import MyLayout from "./Components/MyLayout";
/* import Adder from "./Components/Adder";
import AdderSecond from "./Components/Adder2"; */

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <MyLayout />
        </div>
      </Provider>
    );
  }
}

export default App;
