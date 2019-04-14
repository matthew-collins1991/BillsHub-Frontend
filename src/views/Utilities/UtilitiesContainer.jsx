
import React from "react";
import PropTypes from "prop-types";
import {  Route, Switch, Redirect } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import iconsStyle from "assets/jss/material-dashboard-pro-react/views/iconsStyle.jsx";
import Utilities from "./Utilities";
import NewUtilityCard from "./NewUtilityCard";
import ShowUtilityCard from './ShowUtilityCard';

class UtilitiesContainer extends React.Component{

  state = {
    selectedUtility: {}
  }

  handleUtilityClick=(utility)=>{
    this.setState({
    selectedUtility: utility
  })
}

render() {
  const { userInfo, companyData } = this.props;
  return (
   
  
    <Switch>
      <Route exact path="/admin/utilities" component={routerProps => (
              <Utilities userInfo={userInfo} companyData={companyData} handleUtilityClick={(utility)=>this.handleUtilityClick(utility)} {...routerProps} />
              )}
          />
      <Route exact path="/admin/utilities/new" component={routerProps => (
              <NewUtilityCard userInfo={userInfo}
               companyData={companyData} 
               {...routerProps} 
               updateUserDetails={(user) => this.props.updateUserDetails(user)} 
               addUtilityLocal = {(utility) => this.props.addUtilityLocal(utility)}
               addCompanyLocal = {(company) => this.props.addCompanyLocal(company) }
               />
              )}
          />
      <Route exact path="/admin/utilities/show" component={routerProps => (
              <ShowUtilityCard 
              userInfo={userInfo} 
              utilityData={this.state.selectedUtility} 
              companyData={companyData} 
              addBillLocal = {(bill) => this.props.addBillLocal(bill)} 
              deleteBillLocal = {(bill) => this.props.deleteBillLocal(bill)}
              updateBillLocal = {(bill) => this.props.updateBillLocal(bill)}
              {...routerProps} />
              )}
          />
      <Redirect from="/" to="/signup" />
    </Switch>
  )
}
}

UtilitiesContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(iconsStyle)(UtilitiesContainer);
