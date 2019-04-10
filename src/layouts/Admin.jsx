/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import routes from "routes.js";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";
import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import API from "../adapters/API";


const switchRoutes = (state, that) => (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => prop.component({ ...props, 
              userInfo: state.userInfo, 
              companyData: state.companyData, 
              updateUserDetails: (user) => that.updateUserDetails(user), 
              addUtilityLocal: (utility) => that.addUtilityLocal(utility),
              addCompanyLocal: (company) => that.addCompanyLocal(company)
            })}
            key={key}
          />
        );
      }
    })}
  </Switch>
);

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: image,
      color: "blue",
      bgColor: "black",
      hasImage: true,
      fixedClasses: "dropdown show",
      mobileOpen: false,
      userInfo: {},
      companyData: []
    };
  }

  updateUserDetails = (user) => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        name: user.name,
        email: user.email,
        age: user.age,
        location: user.location,
        houseSize: user.houseSize
      }
    })
  }

  addCompanyLocal = (company) => {this.setState({
    companyData: [...this.state.companyData, company]
    })
    console.log(company)
    console.log(this.state.companyData)
  }

  addUtilityLocal = (utility) => {
    console.log(utility)
    console.log(this.state.userInfo)

    this.setState({
      userInfo: {
        ...this.state.userInfo,
        utilities: [...this.state.userInfo.utilities, utility]
      }
    })
    console.log(this.state.userInfo)
  }
  

  handleImageClick = image => {
    this.setState({ image: image });
  };

  handleColorClick = color => {
    this.setState({ color: color });
  };

  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  getRoute() {
    return this.props.location.pathname !== "/admin/maps";
  }

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };

  componentDidMount() {
    this.setState({
      userInfo: this.props.userInfo,
      companyData: this.props.companyData
    })
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText={"BillsHub"}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          bgColor={this.state.bgColor}
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <AdminNavbar
            routes={routes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes(this.state, this)}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes(this.state, this)}</div>
          )}
          {this.getRoute() ? <Footer /> : null}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
