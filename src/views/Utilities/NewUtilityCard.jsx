import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Datetime from "react-datetime";
// import DataListInput from 'react-datalist-input'
// core components
import GridItem from "components/Grid/GridItem.jsx";

import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import API from "../../adapters/API";
import InputLabel from "@material-ui/core/InputLabel";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import "../../../src/assets/scss/material-dashboard-pro-react/plugins/_plugin-react-datetime.scss";
import {
  paymentTypeArray,
  paymentFreqArray,
  BillRequirements,
  logoImageStyle,
  logoStyle
} from "./UtilitiesStrings.js";
import { Link } from "react-router-dom";
// import Select from 'react-select';

class NewUtilityCard extends React.Component {
  state = {
    companyName: "",
    utilityType: "",
    startDate: "",
    renewalDate: "",
    location: "",
    age: "",
    houseSize: "",
    cost: "",
    paymentType: "",
    paymentFreq: "",
    billDate: "",
    companyUrl: "",
    companyLogo: "/image_placeholder.jpg",
    showLocation: false,
    showAge: false,
    showHouseSize: false
  };

  handleStartDate(date) {
    this.setState({ startDate: date });
  }

  handleRenewalDate(date) {
    this.setState({ renewalDate: date });
  }

  handleFirstDate(date) {
    this.setState({ billDate: date });
  }

  componentWillMount() {
    const { userInfo } = this.props;
    this.setState({
      location: userInfo.location,
      age: userInfo.age,
      houseSize: userInfo.house_size
    });
  }



  handleSubmitClick = () => {

    const { companyName, utilityType,startDate,renewalDate,location,age,houseSize,cost,paymentType,paymentFreq,billDate,companyUrl,companyLogo } = this.state;
    const user = {
      id: this.props.userInfo.id,
      name: this.props.userInfo.name,
      email: this.props.userInfo.email,
      location: location,
      age: age,
      houseSize: houseSize
    };
    this.props.updateUserDetails(user)
    const utility = {
    user_id: this.props.userInfo.id,
    utility_type: utilityType,
    start_date: startDate,
    renewal_date: renewalDate,
    payment_type: paymentType,
    paymentFreq: paymentFreq,
    active: true,
    name: companyName,
    url: companyUrl,
    logo: companyLogo,
    cost: cost,
    bill_date: billDate
    }
    const localUtility = {
    id: this.findLastUtilityId(),
    company_id: this.findLastCompanyId(),
    user_id: this.props.userInfo.id,
    utility_type: utilityType,
    start_date: startDate,
    renewal_date: renewalDate,
    payment_type: paymentType,
    paymentFreq: paymentFreq,
    active: true,
    bills: [{
      cost: cost,
      bill_date: billDate
    }]
    }
    const localCompany = {
      id: this.findLastCompanyId(),
      name: companyName,
      url: companyUrl,
      logo: companyLogo,
      }
    this.props.addCompanyLocal(localCompany)
    this.props.addUtilityLocal(localUtility)
    API.updateUserInBill(user).then(data => {
      if (data.error) {
        alert("something is wrong!");
      } 
    });
    API.createUtility(utility).then(data => {
      if (data.error) {
        alert("something is wrong!");
      } else {
        alert("Utility Created!")
      }
    });
  };

  findLastUtilityId = () => {
    return this.props.userInfo.utilities.slice(-1)[0].id+1
  }

  findLastCompanyId = () => {
    return this.props.companyData.slice(-1)[0].id+1
  }

  handleCancelClick = () => console.log(this.props.userInfo)

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleCompanyChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    API.findLogo(event.target.value).then(logo => {
      logo.length > 0
        ? this.setState({
            companyUrl: logo[0].domain,
            companyLogo: logo[0].logo
          })
        : this.setState({
            companyUrl: "",
            companyLogo: "/image_placeholder.jpg"
          });
    });
  };

  handleUtilityChange = event => {
    let fullBill=[]
    fullBill = BillRequirements.find(type => type[0] === event.target.value)
    this.setState({ 
      utilityType: event.target.value,
      showLocation: fullBill[2],
      showAge: fullBill[3],
      showHouseSize: fullBill[1]
    });
  };


  render() {
    const { classes } = this.props;
      const { showHouseSize, showAge, showLocation } = this.state;
    const { handleChange, handleCompanyChange } = this;

    return (
      <div>
        <GridContainer>
          {/* grid item to add padding to user form */}
          <GridItem xs={false} sm={1} md={2} />
          <GridItem xs={12} sm={10} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>New Bill</h4>
                <p className={classes.cardCategoryWhite}>
                  Fill out the bill details below:
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={4}>
                    <CustomInput
                      labelText="Company Name"
                      id="company-name"
                      MenuProps={{
                        className: classes.selectMenu
                      }}
                      classes={{
                        select: classes.select
                      }}
                      inputProps={{
                        name: "companyName",
                        onChange: handleCompanyChange,
                        type: 'datalist'
                      }}
                    >
                        </CustomInput>
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4}>
                    <CustomInput
                      labelText="Company URL"
                      id="company-url"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.companyUrl,
                        disabled: true,
                        name: "companyUrl"
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4}>
                    <div className="fileinput text-center" style={logoStyle}>
                      <div className="thumbnail">
                        <img
                          src={this.state.companyLogo}
                          alt="..."
                          style={logoImageStyle}
                        />
                      </div>
                    </div>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}
                        style={{ color: "#495057" }}
                      >
                        Utility Type
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={this.state.utilityType}
                        onChange={this.handleUtilityChange}
                        inputProps={{
                          name: "utilityType",
                          id: "simple-select"
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Utility Type
                        </MenuItem>
                        {BillRequirements.map(utility => (
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value={utility[0]}
                          >
                            {utility[0]}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                  {
                  showHouseSize ?
                     <GridItem xs={12} sm={4} md={4}>
                    <CustomInput
                      labelText="Number of Bedrooms"
                      id="company-namehouse-size"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        defaultValue: this.state.houseSize,
                        type: 'number',
                        name: "houseSize",
                        onChange: handleChange
                      }}
                    />
                  </GridItem>
                  : null}
                      {
                  showLocation ?
                     <GridItem xs={12} sm={4} md={4}>
                    <CustomInput
                      labelText="Location"
                      id="company-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        defaultValue: this.state.location,
                        name: "location",
                        onChange: handleChange
                      }}
                    />
                  </GridItem>
                  : null}
                      {
                  showAge ?
                     <GridItem xs={12} sm={4} md={4}>
                    <CustomInput
                      labelText="Age"
                      id="age"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        defaultValue: this.state.age,
                        type: "number",
                        name: "age",
                        min: 0,
                        onChange: handleChange
                      }}
                    />
                  </GridItem>
                  : null}
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl fullWidth>
                      <Datetime
                        onChange={date => this.handleStartDate(date)}
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Start Date",
                          name: "startDate",
                          onChange: handleChange
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl fullWidth>
                      <Datetime
                        onChange={date => this.handleRenewalDate(date)}
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Renewal Date",
                          name: "renewalDate",
                          onChange: handleChange
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl fullWidth>
                      <Datetime
                        onChange={date => this.handleFirstDate(date)}
                        timeFormat={false}
                        inputProps={{
                          placeholder: "First Payment Date",
                          name: "billDate",
                          onChange: handleChange
                        }}
                      />
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Cost"
                      id="cost"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "cost",
                        onChange: handleChange,
                        type: "number",
                        step: "0.01",
                        min: 0
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}
                        style={{ color: "#495057" }}
                      >
                        Payment Type
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={this.state.paymentType}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "paymentType",
                          id: "simple-select"
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Payment Type
                        </MenuItem>
                        {paymentTypeArray.map(payment => (
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value={payment}
                          >
                            {payment}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}
                        style={{ color: "#495057" }}
                      >
                        Payment Frequency
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={this.state.paymentFreq}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "paymentFreq",
                          id: "simple-select"
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Payment Frequency
                        </MenuItem>
                        {paymentFreqArray.map(time => (
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value={time}
                          >
                            {time}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <GridItem style={{ display: "contents" }}>
                <Link to="/admin/utilities">
                  <Button color="primary" onClick={this.handleSubmitClick}>
                    Submit New Bill
                  </Button>
                  </Link>
                  <Link to="/admin/utilities">
                    <Button
                      color="info"
                      onClick={this.handleCancelClick}
                      style={{ float: "right" }}
                    >
                      Back
                    </Button>
                  </Link>
                </GridItem>
              </CardFooter>
            </Card>
          </GridItem>
          {/* grid item to add padding to user form */}
          <GridItem xs={false} sm={1} md={2} />
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(extendedFormsStyle)(NewUtilityCard);
