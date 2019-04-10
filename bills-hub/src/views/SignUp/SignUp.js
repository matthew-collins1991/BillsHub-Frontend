

import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { NavLink } from "react-router-dom"
import API from '../../adapters/API'


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
  }
};



class SignUp extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = {
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown show",
      mobileOpen: false,
      firstName:"",
      lastName: "",
      email: "",
      password: ""
    };
  }


  handleSubmit = () => {
    const { signUp, history } = this.props;
    const user = {
      name: `${this.state.firstName} ${this.state.lastName}`,
      email: this.state.email,
      password: this.state.password
    };
    API.signUp(user).then(data => {
      if (data.error) {
        alert("something is wrong!");
      } else {
        signUp(data);
        history.push("/admin/bills");
      }
    });
  };

  handleFirstNameChange = event =>
    this.setState({ firstName: event.target.value });

  handleLastNameChange = event => 
    this.setState({ lastName: event.target.value });

  handleEmailChange = event =>
    this.setState({ email: event.target.value });

  handlePasswordChange = event =>
    this.setState({ password: event.target.value });
  
render(){
  const { classes } = this.props;
  return (
    <div>
      <GridContainer>
      <GridItem xs={false} sm={1} md={2} />
        <GridItem xs={12} sm={10} md={8}>
          <Card>
          <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Sign Up</h4>
          <p className={classes.cardCategoryWhite}>
            If you have an account, log in{" "}
            <a href="/login" style={{color: "white"}}>
              here
            </a>
          </p>
        </CardHeader>
            <CardBody>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true,
                      onChange: this.handleFirstNameChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true,
                      onChange: this.handleLastNameChange
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                      onChange: this.handleEmailChange,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true,
                      onChange: this.handlePasswordChange,
                    }}
                    inputProps={{
                      type: "password"
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Confirm Password"
                    id="confirm-password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "password"
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
                <NavLink to="/admin/bills" >
              <Button color="primary" onClick={this.handleSubmit}>Sign Up</Button>
                </NavLink>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={false} sm={1} md={2} />
      </GridContainer>
    </div>
  );
}
}

export default withStyles(styles)(SignUp);