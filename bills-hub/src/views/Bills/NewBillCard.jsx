import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
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
import TextField from '@material-ui/core/TextField';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
};

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
  }

  componentWillMount(){
    const { userInfo } = this.props;
    this.setState({
    location: userInfo.location,
    age: userInfo.age,
    houseSize: userInfo.house_size
    })
  }

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
                      onChange: this.handleLastNameChange
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Start Date"
                    id="start-date"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "startDate",
                      onChange: handleChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  
                     <TextField
                     id="renewal-date"
                     label="Renewal Date"
                     type="date"
                     defaultValue="2017-05-24"
                     className={classes.textField}
                     InputLabelProps={{
                       shrink: true,
                       name: "renewalDate",
                      onChange: handleChange
                     }}
                   />
                  
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
                  <CustomInput
                    
                    labelText="Payment Type"
                    id="payment-type"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      name: "paymentType",
                      onChange: handleChange ,
                      type: "select"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    
                    labelText="Payment Frequency"
                    id="payment-frequency"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                        name: "paymentFreq",
                      onChange: handleChange,
                    
                    }}
                  />
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

export default withStyles(styles)(NewBillCard);
