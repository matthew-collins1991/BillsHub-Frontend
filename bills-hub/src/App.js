import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import Login from "views/Login/Login"
import SignUp from "views/SignUp/SignUp"
import "assets/css/material-dashboard-pro-react.css?v=1.6.0";

const hist = createBrowserHistory();

class App extends React.Component{

state = {
  userInfo: undefined
}

login = (data) => {
  this.setState({
    userInfo: data
  })
}

updateUser = (data) => {
  this.setState({
    userInfo: data
  })
}

render(){
  return(
    this.state.userInfo === undefined ? 
  <Router history={hist}>
    <Switch>
    <Route path="/signup" component={routerProps => (
              <SignUp userInfo={this.state.userInfo} {...routerProps} signup={(data)=>this.login(data)}/>
              )}
          />
      <Route path="/login" component={routerProps => (
              <Login userInfo={this.state.userInfo} {...routerProps} login={(data)=>this.login(data)}/>
              )}
          />
      <Redirect from="/" to="/login" />
    </Switch>
  </Router>
    :
    <Router history={hist}>
    <Switch>
      <Route path="/admin" component={routerProps => (
              <Admin userInfo={this.state.userInfo} {...routerProps} updateUser={(data)=>this.updateUser(data)}/>
              )}
          />
      <Route path="/signup" component={routerProps => (
              <SignUp userInfo={this.state.userInfo} {...routerProps} signup={(data)=>this.login(data)}/>
              )}
          />
      <Route path="/login" component={routerProps => (
              <Login userInfo={this.state.userInfo} {...routerProps} login={(data)=>this.login(data)}/>
              )}
          />
      <Redirect from="/" to="/signup" />
    </Switch>
  </Router>
  
  )
}

}

export default App