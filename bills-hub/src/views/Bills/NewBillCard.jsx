import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Datetime from "react-datetime";
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

import Today from "@material-ui/icons/Today";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import AvTimer from "@material-ui/icons/AvTimer";
// core components


import "../../../src/assets/scss/material-dashboard-pro-react/plugins/_plugin-react-datetime.scss"

import CardIcon from "components/Card/CardIcon.jsx";





class NewBillCard extends React.Component{

  state = {
    companyName: '',
    utilityType: '',
    startDate: '',
    renewalDate: '',
    location: '',
    age: '',
    houseSize: '',
    cost: '',
    paymentType: '',
    paymentFreq: '',
    date: ''
  }

  handleStartDate(date){
    this.setState({startDate: date}); 
 };

 handleRenewalDate(date){
  this.setState({renewalDate: date}); 
};

  componentWillMount(){
    const { userInfo } = this.props;
    this.setState({
    location: userInfo.location,
    age: userInfo.age,
    houseSize: userInfo.house_size
    })
  }

  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleEditClick = () => {
    this.setState({
      disabled: !this.state.disabled
    })
  }

  handleUpdateClick = () => {
    const { name,email,location,age,houseSize } = this.state;
    const user = {
      id: this.props.userInfo.id,
      name: name,
      email: email,
      location: location,
      age: age,
      houseSize: houseSize
    };
    API.updateUser(user).then(data => {
      if (data.error) {
        alert("something is wrong!");
      } else {
        alert("Profile updated!");
        this.handleEditClick()
      }
    });
  }

  handleCancelClick = () => {
    const { userInfo } = this.props;
    this.setState({
      disabled: !this.state.disabled,
      name: userInfo.name,
      email: userInfo.email,
      location: userInfo.location,
      age: userInfo.age,
      houseSize: userInfo.house_size
    })
  }

  handleChange = event =>
  this.setState({ [event.target.name]: event.target.value });

render() {
  const { classes,userInfo } = this.props;
//   const { companyName, utilityType, startDate, renewalDate, location, age, houseSize, cost, paymentType, paymentFreq } = this.state;
  const { handleChange } = this;
  return (
    <div>
      <GridContainer>
          {/* grid item to add padding to user form */}
      <GridItem xs={false} sm={1} md={2} />
        <GridItem xs={12} sm={10} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>New Bill</h4>
              <p className={classes.cardCategoryWhite}>Fill out the bill details below:</p>
            </CardHeader>
            <CardBody>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Company Name"
                    id="company-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "companyName",
                      onChange: handleChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Utility Type"
                    id="utility-type"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "utilityType",
                      onChange: handleChange
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                <FormControl fullWidth>
                    <Datetime
                      onChange={(date) => this.handleStartDate(date)}
                      timeFormat={false}
                      inputProps={{ 
                        placeholder: "Start Date",
                        name: "startDate",
                        onChange: handleChange
                        
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl fullWidth>
                    <Datetime
                      onChange={(date) => this.handleRenewalDate(date)}
                      timeFormat={false}
                      inputProps={{ 
                        placeholder: "Renewal Date",
                        name: "renewalDate",
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
                      fullWidth: true,
                    }}
                    inputProps={{
                      name: "cost",
                      onChange: handleChange,
                      type: "number"
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
                            style={{color: "#495057"}}
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
                            onChange={this.handleSimple}
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
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Credit Card"
                            >
                              Credit Card
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Debit Card"
                            >
                              Debit Card
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Direct Debit"
                            >
                              Direct Debit
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Cash"
                            >
                              Cash
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Payment Meter"
                            >
                              Payment Meter
                            </MenuItem>
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
                            style={{color: "#495057"}}
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
                            onChange={this.handleSimple}
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
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Weekly"
                            >
                              Weekly
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Monthly"
                            >
                              Monthly
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Quaterly"
                            >
                              Quaterly
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Yearly"
                            >
                              YEarly
                            </MenuItem>
                          </Select>
                        </FormControl>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
            <GridItem style={{display: "contents"}}>
              <Button color="primary" onClick={this.handleUpdateClick}>Submit New Bill</Button>
              <Button color="info" onClick={this.handleCancelClick} style={{float: "right"}}>Back</Button>
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

export default withStyles(extendedFormsStyle)(NewBillCard);
