import React, { Component, Fragment } from "react";
// import ReactDOM from "react-dom";
import "./App.css";
import store from "./store";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Alerts from "./components/layout/Alerts";
import HomePage from "./components/MainPage";
import { loadUser } from "./actions/authAction";
import Register from "./components/accounts/Register";
import Login from "./components/accounts/Login";
import PrivateRoute from "./components/accounts/PrivateRoute";

const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Alerts />
              <div>
                <Switch>
                  <PrivateRoute exact path="/" component={HomePage} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
