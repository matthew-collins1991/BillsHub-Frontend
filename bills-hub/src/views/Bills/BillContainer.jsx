
import React from "react";
import PropTypes from "prop-types";
import {  Route, Switch, Redirect } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import iconsStyle from "assets/jss/material-dashboard-react/views/iconsStyle.jsx";
import Bills from "./Bills";
import NewBillCard from "./NewBillCard";
import ShowBillCard from './ShowBillCard';

class BillContainer extends React.Component{

state = {
  windowViewing: "bills"
}

openNewCard = () => {
  this.setState({
    windowViewing: "new"
  })
  console.log("hello")
  return <Redirect to="/admin/bills/new" />
}



render() {
  const { classes } = this.props;
  const { userInfo } = this.props;
  return (
   
  
    <Switch>
      <Route path="/admin/bills/new" component={routerProps => (
              <Bills userInfo={userInfo} openNewCard={()=>this.openNewCard()} {...routerProps} />
              )}
          />
      <Route path="/admin/bills" component={routerProps => (
              <NewBillCard userInfo={userInfo} {...routerProps} />
              )}
          />
      <Route path="/admin/bills/show" component={routerProps => (
              <ShowBillCard userInfo={userInfo} {...routerProps} />
              )}
          />
      <Redirect from="/" to="/signup" />
    </Switch>
  )
}
}

BillContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(iconsStyle)(BillContainer);
