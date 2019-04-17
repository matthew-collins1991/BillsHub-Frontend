import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.jsx";
// @material-ui/icons
// import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
// import DateRange from "@material-ui/icons/DateRange";
// import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
// import Accessibility from "@material-ui/icons/Accessibility";
// import BugReport from "@material-ui/icons/BugReport";
// import Code from "@material-ui/icons/Code";
// import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
// import Table from "components/Table/Table.jsx";
// import Tasks from "components/Tasks/Tasks.jsx";
// import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
// import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
// import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import {GetMonthlyLabels, ThisMonth} from '../../variables/Labels'
import { returnSeries, GetMonthBillCostsAndLabels, GetYearBillCostsAndLabels, GetNextMonthBillCostsAndLabels} from '../../variables/DateSort'
import Timeline from "@material-ui/icons/Timeline";
import chartsStyle from "assets/jss/material-dashboard-pro-react/views/chartsStyle.jsx";
import "assets/css/material-dashboard-pro-react.css";

// import { bugs, website, server } from "variables/general.jsx";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";


var Chartist = require("chartist");

var delays = 80,
  durations = 500;
  var delays2 = 80,
  durations2 = 500;

  const yearlyPieChart = (that) => ({
    data: {
      labels: that.props.userInfo.utilities && that.getYearlyBillLabels(),
      series: that.props.userInfo.utilities && that.getYearlyBillCosts().flat()
    },
    options: {
      height: "400px",
      labelOffset: 80,
      chartPadding: 60,
      donut: true,
      donutWidth: 60,
      donutSolid: false,
      startAngle: 270,
    }
  });

  const monthlyPieChart = (that) => ({
    data: {
      labels: that.props.userInfo.utilities && that.getMonthlyBillLabels(),
      series: that.props.userInfo.utilities && that.getMonthlyBillCosts().flat()
    },
    options: {
      height: "400px",
      labelOffset: 80,
      chartPadding: 60,
      donut: true,
      donutWidth: 60,
      donutSolid: false,
      startAngle: 270,
    }
  });



const MonthlyBillChart = (that) => ({
  data: {
    labels: GetMonthlyLabels(),
    series: returnSeries(that.allBillsArray())
  },
  options: {
    style: chartsStyle,
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 10,
    }),
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 20,
      left: 0
    },
    axisY: {
      showGrid: true,
      offset: 40
    },
    axisX: {
      showGrid: false
    },
    low: that.minValue(),
    high: that.maxValue(),
    showPoint: true,
    showArea: true
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

const MonthlyBillBarChart = (that) => ({
  data: {
    labels: that.props.userInfo.utilities && that.getMonthlyBillLabels(),
    series: that.props.userInfo.utilities && that.getMonthlyBillCosts()
  },
  options: {
    // reverseData: true,

    axisX: {
      showGrid: false,
      // offset: 70
    },
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0
    }
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function(value) {
            return value[0];
          }
        }
      }
    ]
  ],
  animation: {
    draw: function(data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }

});





class Dashboard extends React.Component {
  state = {
    value: 0,
    allBills: {}
  };

  maxValue = () => {
    let arr = returnSeries(this.allBillsArray()).flat()
    let max = Math.max(...arr)
    return (max+(max*0.2))
  }
    
  minValue = () => {
    let arr = returnSeries(this.allBillsArray()).flat()
    let min = Math.min(...arr)
    return (min-(min*0.5))
  }

allUtilitiesArray = () => {
  let allUtilities = []
    this.props.userInfo.utilities && this.props.userInfo.utilities.map(utility =>  allUtilities = [...allUtilities, utility])
    return allUtilities
}

getMonthlyBillLabels = () => {
  return (GetMonthBillCostsAndLabels(this.allUtilitiesArray()).map(bill => bill.utility_type))
}

getMonthlyBillCosts = () => {
  return [(GetMonthBillCostsAndLabels(this.allUtilitiesArray()).map(bill => bill.cost))]
}

getYearlyBillLabels = () => {
  return (GetYearBillCostsAndLabels(this.allUtilitiesArray()).map(bill => bill.utility_type))
}

  getYearlyBillCosts = () => {
    return [(GetYearBillCostsAndLabels(this.allUtilitiesArray()).map(bill => bill.cost))]
  }

getTotalMonthlyOutgoings = () => {
  let totalCost = 0
  GetMonthBillCostsAndLabels(this.allUtilitiesArray()).map(bill => totalCost = totalCost + bill.cost)
  return parseFloat(Math.round(totalCost * 100) / 100).toFixed(2)
  }

  getTotalNextMonthlyOutgoings = () => {
    let totalCost = 0
    GetNextMonthBillCostsAndLabels(this.allUtilitiesArray()).map(bill => totalCost = totalCost + bill.cost)
    return parseFloat(Math.round(totalCost * 100) / 100).toFixed(2)
  }

allBillsArray = () => {
    let allBills = []
    this.props.userInfo.utilities && this.props.userInfo.utilities.map(utility => utility.bills.map(bill => {
      return allBills = [...allBills, bill]
    }))
    return allBills
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  thisYear = () => {
    var date = new Date()
    let year = date.getFullYear()
    return year
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={MonthlyBillChart(this).data}
                  type="Line"
                  options={MonthlyBillChart(this).options}
                  listener={MonthlyBillChart(this).animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Yearly outgoings by month</h4>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>  
        <GridContainer>
          
         
          <GridItem xs={12} sm={12} md={4} lg={4}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>date_range</Icon>
                </CardIcon>
                <p className={classes.cardCategory} >Your total monthly outgoings for {ThisMonth()}:</p>
                <h3 className={classes.cardTitle}>
                £{this.getTotalMonthlyOutgoings()}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                    <Warning />
                  <p>
                    Your predicted outgoings for next month is £{this.getTotalNextMonthlyOutgoings()}
                  </p>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card chart>
              <CardHeader color="info">
                <ChartistGraph
                  className="ct-chart"
                  data={MonthlyBillBarChart(this).data}
                  type="Bar"
                  options={MonthlyBillBarChart(this).options}
                  responsiveOptions={MonthlyBillBarChart(this).responsiveOptions}
                  listener={MonthlyBillBarChart(this).animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Total payments by utility type for {ThisMonth()}</h4>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <Update /> all values are in pounds(£)
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="danger" icon>
                <CardIcon color="danger">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Distribution of payments for {ThisMonth()}:</h4>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={monthlyPieChart(this).data}
                  type="Pie"
                  options={monthlyPieChart(this).options}
                />
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="danger" icon>
                <CardIcon color="danger">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Distribution of payments for {this.thisYear()}:</h4>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={yearlyPieChart(this).data}
                  type="Pie"
                  options={yearlyPieChart(this).options}
                />
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
