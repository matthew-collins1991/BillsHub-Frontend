import React from "react";
import PropTypes from "prop-types";

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";

import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";

import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";

class ShowUtilityCard extends React.Component {


  state = {
    value: 0,
    billDate: "",
    cost: ""
  };

  handleBillChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  findCompany = (utility) => {
    let company = this.props.companyData.find(company => company.id === utility.company_id)
    return company
  }

  getNextBillDate = (bills) => {
    let date = bills[bills.length - 1].bill_date
    return this.formatDate(date)
  } 

  getTimeToNextBill = (date) => {
    let one_day=1000*60*60*24
    let date1 = new Date(date)
    let date2 = new Date()
    let diff = date2.getTime() - date1.getTime()
    let diffPositive = Math.abs(diff)
    return Math.ceil(diffPositive/one_day)
    }

  formatDate = (date) => {
    // const formatDate = date
    //   .split("T")[0]
    //   .split("-")
    //   .reverse()
    //   .join("/")
    var test = new Date(date)
    return test.toDateString()
   }

  getBillCost = (bill) => parseFloat(Math.round(bill * 100) / 100).toFixed(2);

  getNextBillCost = (bills) => parseFloat(Math.round((bills[bills.length - 1].cost) * 100) / 100).toFixed(2);
  
  
  handleFirstDate(date) {
    this.setState({ billDate: date });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleSubmitClick = () => {
    console.log("hello")
  }

  handleButtonClick = (prop) => {
    console.log(prop)
  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, utilityData, userInfo } = this.props;
    const simpleButtons = [
      { color: "success", icon: Edit },
      { color: "danger", icon: Close }
    ].map((prop, key) => {
      return (
        <Button
          style={{padding: 5 + 'px'}}
          color={prop.color}
          simple
          className={classes.actionButton}
          key={key}
          onClick= {()=>this.handleButtonClick(prop)}
        >
          <prop.icon className={classes.icon} />
        </Button>
      );
    });
    return (
     <>
        <GridContainer>
          <GridItem xs={12} sm={4} md={4} lg={4}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>date_range</Icon>
                </CardIcon>
                <p className={classes.cardCategory} >Your next bill date:</p>
                <h3 className={classes.cardTitle}>
                {this.getNextBillDate(utilityData.bills)}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <p>
                    This is {this.getTimeToNextBill(this.getNextBillDate(utilityData.bills))} days from now
                  </p>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={4} md={4} lg={4}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Your next bill cost:</p>
                <h3 className={classes.cardTitle}>£{this.getNextBillCost(utilityData.bills)}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <p>Payment type: {utilityData.payment_type}</p>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          
          <GridItem xs={12} sm={4} md={4} lg={4}>
          <a href={'https://' + this.findCompany(utilityData).url} target="_blank">
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>link</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Open webpage for:</p>
                <h3 className={classes.cardTitle}>{this.findCompany(utilityData).name}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                <Icon>http</Icon>
                {this.findCompany(utilityData).url}
                </div>
              </CardFooter>
            </Card>
            </a>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
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
                <h4 className={classes.cardTitle}>Daily Sales</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  increase in today sales.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              headerColor="primary"
              tabs={[
                {
                  tabName: "Past Bills",
                  tabIcon: Check,
                  tabContent: (
                    <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Cost", "Date", "Actions"]}
                  tableData={
                    utilityData.bills.map((bill, index) => 
                       [index+1, `£${this.getBillCost(bill.cost)}`, this.formatDate(bill.bill_date), simpleButtons]
                    )
                  }
                />
                  )
                },
                {
                  tabName: "New Bill",
                  tabIcon: Add,
                  tabContent: (
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={6} >
                    <FormControl fullWidth style={{paddingTop: 10 +'px'}}>
                      <Datetime
                        onChange={date => this.handleFirstDate(date)}
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Payment Date",
                          name: "billDate",
                          
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Cost"
                    id="cost"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "cost",
                      onChange: this.handleBillChange,
                      type: "number",
                      step: "0.01",
                      min: 0
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6} >
                  <Button color="primary" onClick={this.handleSubmitClick}>
                    Add New Bill
                  </Button>
                  </GridItem>
                </GridContainer>

                  )
                }
                
              ]}
            />
          </GridItem>
        </GridContainer>
     </>
    );
  }
}

ShowUtilityCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(ShowUtilityCard);
