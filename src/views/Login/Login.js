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
      <div>
        <GridContainer>
        <GridItem xs={false} sm={1} md={2} />
          <GridItem xs={12} sm={10} md={8}>
            <Card>
            <CardHeader color="primary">
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
                        type: "email"
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
                        onSubmit: this.handleSubmit
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                  
                <Button color="primary" onClick={this.handleSubmit}>Log In</Button>
                  
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={false} sm={1} md={2} />
        </GridContainer>
      </div>
    );
  }

}

export default withStyles(styles)(Login);
