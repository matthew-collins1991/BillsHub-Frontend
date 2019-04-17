/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { returnSeries, GetMonthBillCostsAndLabels, GetYearBillCostsAndLabels, GetNextMonthBillCostsAndLabels, getTimeToNextBill} from '../../variables/DateSort'

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};



class NotificationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false,
      notificationsArray : []
    };
  }
  // to stop the warning of calling setState of unmounted component
  componentWillUnmount() {
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }
  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }

  findCompany = (bill) => {
    let company = this.props.companyData.find(company => company.id === bill.company_id)
    return company
  }


  allBillsArray = () => {
    let allBills = []
    this.props.userInfo.utilities && this.props.userInfo.utilities.map(utility => utility.bills.map(bill => {
      bill.company_id = utility.company_id
      return allBills = [...allBills, bill]
    }))

    return allBills
  }

  allUtilitiesArray = () => {
    let allUtilities = []
      this.props.userInfo.utilities && this.props.userInfo.utilities.map(utility =>  allUtilities = [...allUtilities, utility])
      return allUtilities
  }

  findBillsOverNextWeek = (bills) => {
    let arr= []
    bills.map(bill => {if(getTimeToNextBill(bill.bill_date)> 0 && getTimeToNextBill(bill.bill_date)< 8) {
      bill.daysRemaining = getTimeToNextBill(bill.bill_date)
       arr = [...arr, bill]
      }})
      let sortedArr = arr.sort(function(a,b){return a.daysRemaining-b.daysRemaining})
      return sortedArr
  }

  findUtilitiesRenewNextMonth = (utilities) => {
    let arr= []
    utilities.map(utility => {if(getTimeToNextBill(utility.renewal_date)> 0 && getTimeToNextBill(utility.renewal_date)< 32) {
      utility.daysRemaining = getTimeToNextBill(utility.renewal_date)
       arr = [...arr, utility]
      }})
      let sortedArr = arr.sort(function(a,b){return a.daysRemaining-b.daysRemaining})
      return sortedArr
  }

billMessage = (days) => {
  if (days === 1){
    return ['today', 'danger']
  }else if(days === 2){
    return ['tomorrow', 'warning']
  }else {
    return [`in ${days} days time.`, 'success']
  }
} 

utilityMessage = (days) => {
  if (days === 1){
    return ['today', 'danger']
  }else if(days === 2){
    return ['tomorrow', 'warning']
  }else if(days < 15){
      return [`in ${days} days time.`, 'warning']
  }else {
    return [`in ${days} days time.`, 'success']
  }
} 


  render() {
    const { classes } = this.props;
    return (
      <div>
      <GridContainer>
      <GridItem xs={false} sm={false} md={3}/>
      <GridItem xs={12} sm={12} md={6}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Bill Notifications</h4>
          <p className={classes.cardCategoryWhite}>
            Below are your upcoming bills in the next week 
          </p>
        </CardHeader>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
            {this.props.userInfo && this.findBillsOverNextWeek(this.allBillsArray()).map(bill => {
              return (
               <SnackbarContent
               message={
                 `Your bill for ${this.findCompany(bill).name} is due ${this.billMessage(bill.daysRemaining)[0]}`
               }
               close
               color={this.billMessage(bill.daysRemaining)[1]}
             />
              )
            })}
            </GridItem>
            
          </GridContainer>
        </CardBody>
      </Card>
      </GridItem>
      <GridItem xs={false} sm={false} md={3}/>
      </GridContainer>

       <GridContainer style = {{paddingTop: 30 + 'px'}}>
       <GridItem xs={false} sm={false} md={3}/>
      <GridItem xs={12} sm={12} md={6}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Contract Notifications</h4>
          <p className={classes.cardCategoryWhite}>
           Below are any upcoming contract renewals
          </p>
        </CardHeader>
        <CardBody>
         
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
            {this.props.userInfo && this.findUtilitiesRenewNextMonth(this.allUtilitiesArray()).map(utility => {
              return (
               <SnackbarContent
               message={
                 `Your contract for ${this.findCompany(utility).name} is is up for renewal ${this.utilityMessage(utility.daysRemaining)[0]}`
               }
               close
               color={this.utilityMessage(utility.daysRemaining)[1]}
             />
              )
            })}
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
      </GridItem>
      <GridItem xs={false} sm={false} md={3}/>
    </GridContainer>
    </div>
    
    );
  }
}

export default withStyles(styles)(NotificationContainer);
