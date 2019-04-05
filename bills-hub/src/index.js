import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import Login from "views/Login/Login"
import SignUp from "views/SignUp/SignUp"


import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
      <Redirect from="/" to="/signup" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
