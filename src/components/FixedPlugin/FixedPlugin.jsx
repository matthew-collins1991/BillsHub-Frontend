/*eslint-disable*/
import React, { Component } from "react";


import withStyles from "@material-ui/core/styles/withStyles";


import styles from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

import imagine1 from "assets/img/sidebar-1.jpg";
import imagine2 from "assets/img/sidebar-2.jpg";
import imagine3 from "assets/img/sidebar-3.jpg";
import imagine4 from "assets/img/sidebar-4.jpg";



class FixedPlugin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: "dropdown show",
      bg_checked: true,
      bgImage: this.props.bgImage,
      showImage: true
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.handleFixedClick();
  }
  handleChange = name => event => {
    switch (name) {
      case "miniActive":
        this.props.sidebarMinimize();
        break;
      case "image":
        if (event.target.checked) {
          this.props.handleImageClick(this.state.bgImage);
        } else {
          this.props.handleImageClick();
        }
        this.setState({ showImage: event.target.checked });
        break;
      default:
        break;
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div
        className={
          "fixed-plugin" + (this.props.rtlActive ? " fixed-plugin-rtl" : "")
        }
      >
        <div id="fixedPluginClasses" className={this.props.fixedClasses}>
          <ul className="dropdown-menu">
            <li className="header-title">SIDEBAR FILTERS</li>
            <li className="adjustments-line">
              <a className="switch-trigger active-color">
                <div className="badge-colors text-center">
                  <span
                    className={
                      this.props.color === "purple"
                        ? "badge filter badge-purple active"
                        : "badge filter badge-purple"
                    }
                    data-color="purple"
                    onClick={() => {
                      this.props.handleColorClick("purple");
                    }}
                  />
                  <span
                    className={
                      this.props.color === "blue"
                        ? "badge filter badge-blue active"
                        : "badge filter badge-blue"
                    }
                    data-color="blue"
                    onClick={() => {
                      this.props.handleColorClick("blue");
                    }}
                  />
                  <span
                    className={
                      this.props.color === "green"
                        ? "badge filter badge-green active"
                        : "badge filter badge-green"
                    }
                    data-color="green"
                    onClick={() => {
                      this.props.handleColorClick("green");
                    }}
                  />
                  <span
                    className={
                      this.props.color === "red"
                        ? "badge filter badge-red active"
                        : "badge filter badge-red"
                    }
                    data-color="red"
                    onClick={() => {
                      this.props.handleColorClick("red");
                    }}
                  />
                  <span
                    className={
                      this.props.color === "orange"
                        ? "badge filter badge-orange active"
                        : "badge filter badge-orange"
                    }
                    data-color="orange"
                    onClick={() => {
                      this.props.handleColorClick("orange");
                    }}
                  />
                </div>
                {/* <div className="clearfix" /> */}
              </a>
            </li>
            <li className="header-title">SIDEBAR BACKGROUND</li>
            <li className="adjustments-line">
              <a className="switch-trigger active-color">
                <div className="badge-colors text-center">
                  <span
                    className={
                      this.props.bgColor === "blue"
                        ? "badge filter badge-blue active"
                        : "badge filter badge-blue"
                    }
                    data-color="blue"
                    onClick={() => {
                      this.props.handleBgColorClick("blue");
                    }}
                  />
                  <span
                    className={
                      this.props.bgColor === "black"
                        ? "badge filter badge-black active"
                        : "badge filter badge-black"
                    }
                    data-color="black"
                    onClick={() => {
                      this.props.handleBgColorClick("black");
                    }}
                  />
                </div>
                <div className="clearfix" />
              </a>
            </li>
            <li className="header-title">BACKGROUND IMAGE</li>
            <li className={this.state["bgImage"] === imagine1 ? "active" : ""}>
              <a
                className="img-holder switch-trigger"
                onClick={() => {
                  this.setState({ showImage: true, bgImage: imagine1 });
                  this.props.handleImageClick(imagine1);
                }}
              >
                <img src={imagine1} alt="..." />
              </a>
            </li>
            <li className={this.state["bgImage"] === imagine2 ? "active" : ""}>
              <a
                className="img-holder switch-trigger"
                onClick={() => {
                  this.setState({ showImage: true, bgImage: imagine2 });
                  this.props.handleImageClick(imagine2);
                }}
              >
                <img src={imagine2} alt="..." />
              </a>
            </li>
            <li className={this.state["bgImage"] === imagine3 ? "active" : ""}>
              <a
                className="img-holder switch-trigger"
                onClick={() => {
                  this.setState({ showImage: true, bgImage: imagine3 });
                  this.props.handleImageClick(imagine3);
                }}
              >
                <img src={imagine3} alt="..." />
              </a>
            </li>
            <li className={this.state["bgImage"] === imagine4 ? "active" : ""}>
              <a
                className="img-holder switch-trigger"
                onClick={() => {
                  this.setState({ showImage: true, bgImage: imagine4 });
                  this.props.handleImageClick(imagine4);
                }}
              >
                <img src={imagine4} alt="..." />

              </a>
            </li>
            
          </ul>
          <br />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FixedPlugin);
