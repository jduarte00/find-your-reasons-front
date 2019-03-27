import React, { Component } from "react";
import "./App.css";
import Home from "./Components/HomeComponents/Home";
import WrappedNormalLoginForm from "./Components/LoginComponents/Login";
import WrappedNormalSignupForm from "./Components/LoginComponents/Signup";
import { Switch, Route } from "react-router-dom";
import MyLayout from "./Components/Layout/MyLayout";
import AuthService from "./Components/LoginComponents/auth-service";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      currentPath: "home",
      idApp: ""
    };
    this.service = new AuthService();
  }

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  };

  getTheUser = userObj => {
    this.setState({ loggedInUser: userObj });
  };

  changeCurrentRoute = (route, appID) => {
    this.setState({ currentPath: route, idApp: appID });
  };

  render() {
    this.fetchUser();
    if (this.state.loggedInUser) {
      return (
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/home"
              render={() => (
                <MyLayout
                  theUser={this.state.loggedInUser}
                  theContent={this.state.currentPath}
                  changeRoute={this.changeCurrentRoute}
                  appID={this.state.idApp}
                  /* theContent={<MainPage theUser={this.state.loggedInUser} />} */
                />
              )}
            />
            {/* <Route
              exact
              path="/profile"
              render={() => (
                <MyLayout
                  theUser={this.state.loggedInUser}
                  theContent={<UserProfile theUser={this.state.loggedInUser} />}
                />
              )}
            />
            <Route
              exact
              path="/newapp"
              render={() => (
                <MyLayout
                  theUser={this.state.loggedInUser}
                  theContent={<MainForm theUser={this.state.loggedInUser} />}
                /> */}
            )} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/signin"
              render={() => (
                <WrappedNormalLoginForm getUser={this.getTheUser} />
              )}
            />
            <Route
              exact
              path="/signup"
              render={() => (
                <WrappedNormalSignupForm getUser={this.getTheUser} />
              )}
            />
          </Switch>
        </div>
      );
    }
  }
}

export default App;
