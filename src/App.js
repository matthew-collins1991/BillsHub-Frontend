import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import Login from "views/Login/Login"
import SignUp from "views/SignUp/SignUp"
import "assets/css/material-dashboard-pro-react.css?v=1.6.0";
import API from 'adapters/API'

const hist = createBrowserHistory();

class App extends React.Component{

state = {
  userInfo: undefined,
  companyData: []
}

componentDidMount(){
  API.getCompanies().then(companies => this.setState({
    companyData: companies
  }))
}

login = (data) => {
  this.setState({
    userInfo: data
  })
}

clearState = () => {
  this.setState({
    userInfo: undefined
  })
}



updateUserDetails = (user) => {
  this.setState({
    userInfo: user
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
              <Admin userInfo={this.state.userInfo} companyData={this.state.companyData} clearState={()=>this.clearState()} {...routerProps} updateUserDetails={(user)=>this.updateUserDetails(user)}/>
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