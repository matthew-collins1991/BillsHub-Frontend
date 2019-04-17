import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";

// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
// import Search from "@material-ui/icons/Search";

// core components

import Button from "components/CustomButtons/Button.jsx";
import { Link } from "react-router-dom";

import adminNavbarLinksStyle from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.jsx";

class HeaderLinks extends React.Component {
  state = {
    open: false,
    profileOpen: false
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  handleProfileClick = () => {
    this.setState({ profileOpen: !this.state.profileOpen });
  };
  handleClose = () => {
    this.setState({ open: false,
      profileOpen: false });
  };
  handleSignOut = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes, rtlActive } = this.props;
    const { open, profileOpen } = this.state;
    // const searchButton =
    //   classes.top +
    //   " " +
    //   classes.searchButton +
    //   " " +
    //   classNames({
    //     [classes.searchRTL]: rtlActive
    //   });
    const dropdownItem = classNames(
      classes.dropdownItem,
      classes.primaryHover,
      { [classes.dropdownItemRTL]: rtlActive }
    );
    const wrapper = classNames({
      [classes.wrapperRTL]: rtlActive
    });
    const managerClasses = classNames({
      [classes.managerClasses]: true
    });
    return (
      <div className={wrapper}>
      <Link to='/admin/dashboard'>
        <Button
          color="transparent"
          simple
          aria-label="Dashboard"
          justIcon
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : ""
          }}
        >
          <Dashboard
            className={
              classes.headerLinksSvg +
              " " +
              (rtlActive
                ? classes.links + " " + classes.linksRTL
                : classes.links)
            }
          />
          <Hidden mdUp implementation="css">
            <span className={classes.linkText}>
              {rtlActive ? "لوحة القيادة" : "Dashboard"}
            </span>
          </Hidden>
        </Button>
        </Link>
        <div className={managerClasses}>
        <Link to='/admin/notifications'>
          <Button
            color="transparent"
            justIcon
            aria-label="Notifications"
            aria-owns={open ? "menu-list" : null}
            aria-haspopup="true"
            onClick={this.handleClick}
            className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
            muiClasses={{
              label: rtlActive ? classes.labelRTL : ""
            }}
            buttonRef={node => {
              this.anchorEl = node;
            }}
          >
            <Notifications
              className={
                classes.headerLinksSvg +
                " " +
                (rtlActive
                  ? classes.links + " " + classes.linksRTL
                  : classes.links)
              }
            />
            <Hidden mdUp implementation="css">
              <span onClick={this.handleClick} className={classes.linkText}>
                {rtlActive ? "إعلام" : "Notification"}
              </span>
            </Hidden>
          </Button>
          </Link>
        </div>
        <div className={managerClasses}>
          <Button
            color="transparent"
            justIcon
            aria-label="Profile"
            aria-owns={open ? "menu-list" : null}
            aria-haspopup="true"
            onClick={this.handleProfileClick}
            className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
            muiClasses={{
              label: rtlActive ? classes.labelRTL : ""
            }}
            buttonRef={node => {
              this.anchorEl = node;
            }}
          >
            <Person
              className={
                classes.headerLinksSvg +
                " " +
                (rtlActive
                  ? classes.links + " " + classes.linksRTL
                  : classes.links)
              }
            />
            {/* <span className={classes.notifications}>5</span> */}
            <Hidden mdUp implementation="css">
              <span onClick={this.handleProfileClick} className={classes.linkText}>
                Profile
              </span>
            </Hidden>
          </Button>
          <Popper
            open={profileOpen}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            placement="bottom"
            className={classNames({
              [classes.popperClose]: !profileOpen,
              [classes.pooperResponsive]: true,
              [classes.pooperNav]: true
            })}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                    <Link to='/admin/user'>
                      <MenuItem
                        onClick={this.handleClose}
                        className={dropdownItem}
                      >
                          User Profile
                      </MenuItem>
                      </Link>
                      <Link to='/login'>
                      <MenuItem
                        onClick={this.handleSignOut}
                        className={dropdownItem}
                      >
                       Sign Out
                      </MenuItem>
                      </Link>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  rtlActive: PropTypes.bool
};

export default withStyles(adminNavbarLinksStyle)(HeaderLinks);
