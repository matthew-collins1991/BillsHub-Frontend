
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AccessTime from "@material-ui/icons/AccessTime";
import ChartistGraph from "react-chartist";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardBody from "components/Card/CardBody.jsx";
import {dailySalesChart} from "variables/charts.jsx";
import iconsStyle from "assets/jss/material-dashboard-pro-react/views/iconsStyle.jsx";
import { Link } from 'react-router-dom'





class Bills extends React.Component{

openNewCard = () => {
    this.props.openNewCard()
}

MyLink = props => {
    console.log("hello")
    {
return <Link to="/admin/bills/new" {...props} />
    }
}

render() {
  const { classes } = this.props;
  const { userInfo } = this.props;
 
  return (
   
   <div>
     <GridContainer>

     <GridItem xs={12} sm={12} md={6} lg={4}>
            <Card chart onClick={() => this.MyLink()}>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
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
          </GridItem>
      {userInfo.utilities && userInfo.utilities.map(utility => 
        <>
          <GridItem xs={12} sm={12} md={6} lg={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
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
          </GridItem>
          
          
          </>
         )}
    </GridContainer>
    
  </div>
      )
}

}

Bills.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(iconsStyle)(Bills);