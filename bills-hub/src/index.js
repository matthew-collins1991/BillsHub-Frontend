import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
// core components
import Test from "./Test"


import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();



ReactDOM.render(
  <Test />,
  document.getElementById("root")
);
