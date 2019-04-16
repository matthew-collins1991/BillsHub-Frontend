
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AccessTime from "@material-ui/icons/AccessTime";
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.jsx";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardBody from "components/Card/CardBody.jsx";
import iconsStyle from "assets/jss/material-dashboard-pro-react/views/iconsStyle.jsx";
import { Link } from 'react-router-dom'
// import API from "../../adapters/API";
import {
  logoImageStyle,
  logoStyle
} from "./UtilitiesStrings.js";



class Utilities extends React.Component{

 

findCompany = (utility) => {
  let company = this.props.companyData.find(company => company.id === utility.company_id)
  return company
}

render() {
  const { classes } = this.props;
  const { userInfo } = this.props;


 
  return (
   
   <div>
     <GridContainer>

     <GridItem xs={12} sm={6} md={6} lg={4} >

     <Link to="/admin/utilities/new" >
            <Card style={{width: 50+'%'}} >
            <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>add_circle_outline</Icon>
                </CardIcon>
                </CardHeader>
                <CardBody>
                <h4 className={classes.cardTitle}>Create New</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    
                  </span>{" "}
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  
                </div>
              </CardFooter>
            </Card>
            </Link >
            
          </GridItem>
      {userInfo.utilities && userInfo.utilities.map(utility => 
        <>
          <GridItem xs={12} sm={6} md={6} lg={4} onClick={()=>this.props.handleUtilityClick(utility)}>
          <Link to="/admin/utilities/show" >
            <Card chart>
              <CardHeader color="info" style={{background: "white"}}>
                <div className="fileinput text-center" style={logoStyle}>
                      <div className="thumbnail">
                        <img
                          src={this.findCompany(utility).logo}
                          alt="..."
                          style={logoImageStyle}
                        />
                      </div>
                    </div>
              </CardHeader>
              <CardBody >
                <h4 className={classes.cardTitle}>{utility.utility_type}</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    Your upcoming bill is £{utility.bills.slice(-1)[0].cost}
                  </span>{" "}
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
            </Link>
          </GridItem>
          
          
          </>
         )}
    </GridContainer>
    
  </div>
      )
}

}

Utilities.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(iconsStyle)(Utilities);
