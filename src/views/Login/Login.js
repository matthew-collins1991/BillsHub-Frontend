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
import API from '../../adapters/API'
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import Icon from "@material-ui/core/Icon";
import login from "assets/img/login.jpeg";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";





class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown show",
      mobileOpen: false,
      email: "matt@matt.com",
      password: "London"
    };
  }

  getBgImage = () => {
      return login;
  };


  handleSubmit = () => {
    const { login, history } = this.props;
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    API.login(user).then(data => {
      if (data.error) {
        alert("something is wrong!");
      } else {
        login(data)
        history.push("/admin/dashboard");
      }
    });
  };

  handleEmailChange = event =>
    this.setState({ email: event.target.value });

  handlePasswordChange = event =>
    this.setState({ password: event.target.value });

  render(){
    const { classes } = this.props;
    return (
      <div className={classes.wrapper} ref="wrapper">
      <div
            className={classes.fullPage}
            style={{ backgroundImage: "url(" + this.getBgImage() + ")" }}
          >

      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <Card login className={classes}>
            <CardHeader color="primary" className={`${classes.cardHeader} ${classes.textCenter}`}>
            <h4 className={classes.cardTitleWhite}>Log In</h4>
            <p className={classes.cardCategoryWhite}>
              Or sign up {" "}
              <a href="/signup" style={{color: "white"}}>
                here
              </a>
            </p>
          </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Email address"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true,
                        onChange: this.handleEmailChange
                      }}
                      inputProps={{
                        type: "email",
                        value: 'matt@matt.com',
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        )
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
                        type: "password",
                        onSubmit: this.handleSubmit,
                        value: 'London',
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputAdornmentIcon}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                  
                <Button color="primary" onClick={this.handleSubmit} >Log In</Button>
                  
              </CardFooter>
            </Card>
          </GridItem>

        </GridContainer>
      </div>
      </div>
      </div>
    );
  }

}

export default withStyles(loginPageStyle)(Login);
