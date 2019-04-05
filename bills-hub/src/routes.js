import React from 'react'
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Notifications from "@material-ui/icons/Notifications";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserContainer from "views/UserProfile/UserContainer.jsx";
import CompareContainer from "views/Compare/CompareContainer.jsx";
import BillContainer from "views/Bills/BillContainer.jsx";
import NotificationContainer from "views/Notifications/NotificationContainer.jsx";








const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: (props) => <DashboardPage {...props} />,
    layout: "/admin"
  },
  {
    path: "/bills",
    name: "Bills",
    icon: "content_paste",
    component: (props) => <BillContainer {...props} />,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Profile",
    icon: Person,
    component: (props) => <UserContainer {...props} />,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: (props) => <NotificationContainer {...props} />,
    layout: "/admin"
  },
  {
    path: "/compare",
    name: "Compare",
    icon: BubbleChart,
    component: (props) => <CompareContainer {...props} />,
    layout: "/admin"
  }
];

export default dashboardRoutes;
