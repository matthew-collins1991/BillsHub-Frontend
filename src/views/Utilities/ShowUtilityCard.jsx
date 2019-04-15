import React from "react";
import PropTypes from "prop-types";

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import Add from "@material-ui/icons/Add";
import Modal from '@material-ui/core/Modal';
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import API from "../../adapters/API";
import InnerModal from './InnerModal'
import GetMonthlyLabels from '../../variables/Labels'
import {sortDatesHighToLow, returnSeries} from '../../variables/DateSort'



import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";

function getModalStyle() {
  return {
    position: 'absolute',
    // top: `${50}%`,
    left: 'auto',
    width: 400 + 'px',
    padding: 200 + 'px',
    // transform: `translate(-${50}%, -${45}%)`,
  };
}


// CHARTS

var Chartist = require("chartist");

var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

const dailySalesChart = (that) => ({
  data: {
    labels: GetMonthlyLabels(),
    series: returnSeries(that.props.utilityData.bills.sort(sortDatesHighToLow))
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 90, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },
  // for animation
  animation: {
    draw: function(data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
});



class ShowUtilityCard extends React.Component {


  state = {
    value: 0,
    billDate: "",
    cost: "",
    open: false,
    billData: {}
  };



  

  sortedBills = () => this.props.utilityData.bills.sort(sortDatesHighToLow)

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  handleBillChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  findCompany = (utility) => {
    let company = this.props.companyData.find(company => company.id === utility.company_id)
    return company
  }

  getNextBillDate = (bills) => {
    let date = bills[0].bill_date
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
    var test = new Date(date)
    return test.toDateString()
   }

  getBillCost = (bill) => parseFloat(Math.round(bill * 100) / 100).toFixed(2);

  getNextBillCost = (bills) => parseFloat(Math.round((bills[0].cost) * 100) / 100).toFixed(2);
  
  
  handleFirstDate(date) {
    this.setState({ billDate: date });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleSubmitClick = () => {
    const bill = {
      bill_date: this.state.billDate,
      cost: this.state.cost,
      utility_id: this.props.utilityData.id
    }
    this.props.addBillLocal(bill)
    API.addNewBill(bill).then(data => {
      if (data.error) {
        alert("something is wrong!");
      } else {
        alert("Bill Added!")
      }
    });
  }


  handleButtonClick = (prop) => {
    if(prop.color === "success"){ 
      this.setState({
        billData: prop.bill
      })
      this.handleOpen()
  } else{
    this.props.deleteBillLocal(prop.bill)
    API.deleteBill(prop.bill).then(data => {
      if (data.error) {
        alert("something is wrong!");
      } else {
        alert("Bill Deleted!")
      }
    });
  }
}

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, utilityData, userInfo } = this.props;
    const simpleButtons = (bill) => [
      { color: "success", icon: Edit, bill: bill },
      { color: "danger", icon: Close, bill: bill }
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
                {this.getNextBillDate(this.sortedBills())}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <p>
                    This is {this.getTimeToNextBill(this.sortedBills())} days from now
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
                <h3 className={classes.cardTitle}>£{this.getNextBillCost(this.sortedBills())}</h3>
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
                  data={dailySalesChart(this).data}
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
                    this.sortedBills().map((bill, index) => 
                       [index+1, `£${this.getBillCost(bill.cost)}`, this.formatDate(bill.bill_date), simpleButtons(bill)]
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
        <GridContainer>
        <GridItem xs={12} sm={12} md={6} >
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <InnerModal billData = {this.state.billData} handleClose={this.handleClose} updateBillLocal = {(bill)=>this.props.updateBillLocal(bill)}/>

          </div>
        </Modal>
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
