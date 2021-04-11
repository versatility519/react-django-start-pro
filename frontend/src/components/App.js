import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import {transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";
import Dashboard from "./lead/Dashboard";
import Alerts from "./layout/Alerts";

import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";
import PageNotFound from './PageNotFound';
import { loadUser } from "../actions/auth";

//react-redux module bring the two together i.e react n redux together
import { Provider } from "react-redux";
import store from "../store";

//Alert Options
const alertOptions = {
  timeout: 3000,
  position:  positions.BOTTOM_CENTER,
   // you can also just use 'scale'
   transition: transitions.SCALE
};

class App extends Component {
    
  componentDidMount() {
    //this fires immediately when the App loads/when the component mounted
    //it returns error if there is no valid token for the current user
    store.dispatch(loadUser()); //we call the store directly to load the user
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <Fragment>
              <Header />
              {/* <Alerts /> */}
              <div className="container">
                <Switch>
                  
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                   <Route component={PageNotFound} />

                </Switch>
              </div>
            </Fragment>
          </AlertProvider>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
