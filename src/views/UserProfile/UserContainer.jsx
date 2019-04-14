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
import API from "../../adapters/API";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";
import image from "assets/img/sidebar-2.jpg";

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

class UserContainer extends React.Component{

  state = {
    disabled: true,
    name: '',
    email: '',
    location: '',
    age: '',
    houseSize: '',
    mobileOpen: false,
      miniActive: false,
      image: image,
      color: "blue",
      bgColor: "black",
      hasImage: true,
  }



  handleBgColorClick = bgColor => {
    this.props.handleBgColorClick(bgColor)
    this.setState({
      bgColor: bgColor
    })
  };

  handleColorClick = color => {
    this.props. handleColorClick(color)
    this.setState({
      color: color
    })
  };

  handleImageClick = image => {
    this.props.handleImageClick(image)
    this.setState({
      image: image
    })
  };

  componentWillMount(){
    const { userInfo } = this.props;
    this.setState({
    name: userInfo.name,
    email: userInfo.email,
    location: userInfo.location,
    age: userInfo.age,
    houseSize: userInfo.house_size,
    image: this.props.image,
    color: this.props.color,
    bgColor: this.props.bgColor
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
    this.props.updateUserDetails(user)
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

  handleFirstNameChange = event => {
    const lastName = this.state.name.split(" ")[1]
    this.setState({
      name: event.target.value + " " + lastName
    })
  }

  handleLastNameChange = event => {
    const firstName = this.state.name.split(" ")[0]
    this.setState({
      name:  firstName + " " + event.target.value
    })
  }

render() {
  const { classes,userInfo } = this.props;
  const { name,email,location,age,houseSize, disabled } = this.state;
  const { handleChange } = this;
  return (
    <div>
      <GridContainer>
      <GridItem xs={false} sm={1} md={2} />
        <GridItem xs={12} sm={10} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>{userInfo.name}</h4>
              <p className={classes.cardCategoryWhite}>Your profile</p>
            </CardHeader>
            <CardBody>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: disabled,
                      defaultValue: name.split(" ")[0],
                      name: "firstName",
                      onChange: this.handleFirstNameChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: disabled,
                      defaultValue: name.split(" ")[1],
                      name: "lastName",
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
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: disabled,
                      defaultValue: email,
                      name: "email",
                      onChange: handleChange
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    
                    labelText="Location"
                    id="location"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: disabled,
                      defaultValue: location, 
                      name: "location",
                      onChange: handleChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    
                    labelText="No. of Bedrooms"
                    id="house-size"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: disabled,
                      defaultValue: houseSize, 
                      name: "houseSize",
                      onChange: handleChange 
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    
                    labelText="Age"
                    id="age"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: disabled,
                      defaultValue: age
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
                {    disabled ?
                <GridItem >
              <Button color="primary" onClick={this.handleEditClick}>Edit Profile</Button>
              </GridItem>
              :
              <>
              <GridItem style={{display: 'contents'}}>
              <Button color="primary" onClick={this.handleUpdateClick}>Update Profile</Button>
              <Button color="info" onClick={this.handleCancelClick}>Cancel Changes</Button>
              </GridItem>
              </>
                }
            </CardFooter>
          </Card>
        </GridItem>
        {/* grid item to add padding to user form */}
        <GridItem xs={false} sm={1} md={2} />
      </GridContainer>
      <GridContainer>
      <GridItem xs={false} sm={1} md={2} />
        <GridItem xs={12} sm={10} md={8}>
      <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Theming</h4>
            </CardHeader>
            <CardBody>
        <FixedPlugin
            handleImageClick={this.handleImageClick}
            handleColorClick={this.handleColorClick}
            handleBgColorClick={this.handleBgColorClick}
            handleHasImage={this.handleHasImage}
            color={this.state["color"]}
            bgColor={this.state["bgColor"]}
            bgImage={this.state["image"]}
            miniActive={this.state.miniActive}
          />
        </CardBody>
        </Card>
        </GridItem>
        <GridItem xs={false} sm={1} md={2} />
      </GridContainer>
    </div>
  );
}
}

export default withStyles(styles)(UserContainer);
