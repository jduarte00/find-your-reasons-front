import React, { Component } from "react";
import "./App.css";
import Home from "./Components/Home";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import store from "./Store";
import MyLayout from "./Components/MyLayout";
/* import Adder from "./Components/Adder";
import AdderSecond from "./Components/Adder2"; */

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={MyLayout} />
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
