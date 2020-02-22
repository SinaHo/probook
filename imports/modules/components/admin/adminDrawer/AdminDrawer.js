import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Tooltip, Grid, Button, Hidden } from "@material-ui/core";
import { withRouter } from "react-router";
import progel from "../../../../core/progel";
import { withTracker } from "meteor/react-meteor-data";
import Avatar from "@material-ui/core/Avatar";

// import Box from "@material-ui/core/Box";

const drawerWidth = 220;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: 70,
    backgroundColor: progel.$c.secondary,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing.unit * 11,
      width: `calc(100% - ${theme.spacing.unit * 11}px)`
    },
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 10,
    backgroundColor: "white"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    backgroundColor: "red"
  },
  drawerOpen: {
    width: drawerWidth,
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing.unit * 11
    },
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 0,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 11
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "start",
    justifyContent: "flex-start",
    // backgroundimage: `url(${"/img/images.jpeg"})`,
    // backgroundRepeat: "repeat",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    paddingTop: 85,
    paddingLeft: 20
  },
  Button: {
    "&:hover": {
      backgroundColor: progel.$c.secondary,
      color: "white",
      cursor: "pointer"
    }
  },
  icons: {
    paddingTop: 10,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 8
    }
  }
});
// ***********************************************************************************
class AdminDrawer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      interval: undefined,
      date: undefined,
      open: false
    };
  }
  // ---------------------------------------------------------
  componentWillMount() {
    this.setDate();
    this.setState({
      interval: setInterval(this.setDate, 1000)
    });
  }
  // ---------------------------------------------------------
  componentWillUnmount() {
    try {
      clearInterval(this.interval);
    } catch (e) {
      console.log(e);
    }
    this.setState({ interval: undefined });
  }
  // ---------------------------------------------------------
  setDate = () => {
    let date = new Date();
    this.setState({
      date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    });
  };
  // ---------------------------------------------------------
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  // ---------------------------------------------------------
  render() {
    const { classes, theme, AdminSwitch } = this.props;
    // ********************************************************************************
    try {
      return (
        <div className={classes.root}>
          {/* ------------------------------------------------------------------------------------ */}
          <AppBar
            height="inherit"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.open
            })}
          >
            {/* ----------------------------------------------------------------- */}
            <Grid
              container
              justify="space-between"
              alignItems="center"
              className={classes.icons}
            >
              <Grid item xs={8}>
                {/* ----------------------------------------------------------------- */}
                <Grid container style={{ marginLeft: 10 }}>
                  <Toolbar disableGutters={!this.state.open}>
                    {/* ----------------------------------------------------------------- */}
                    <IconButton
                      color="inherit"
                      aria-label="Open drawer"
                      onClick={this.handleDrawerOpen}
                      className={classNames(classes.menuButton, {
                        [classes.hide]: this.state.open
                      })}
                      style={{ backgroundColor: progel.$c.secondary }}
                    >
                      <MenuIcon />
                    </IconButton>
                    {/* ----------------------------------------------------------------- */}
                    <Grid
                      item
                      xs={3}
                      style={{
                        marginLeft: 15,
                        marginRight: 5,
                        marginTop: 2
                      }}
                    >
                      <img src="/img/logowhite128.png" style={{ height: 30 }} />
                    </Grid>
                    {/* ----------------------------------------------------------------- */}
                    <Grid item xs={9}>
                      <Typography variant="h4" color="inherit">
                        <Hidden smDown> ProBook</Hidden>
                        <Hidden mdUp> PB</Hidden>
                      </Typography>
                    </Grid>
                    {/* ----------------------------------------------------------------- */}
                  </Toolbar>
                </Grid>
              </Grid>
              {/* ---------------------------------------------------------------------------------------- */}
              {/* <Grid
                item
                xs={2}
                md={3}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center"
                }}
              >
                {this.state.date}
              </Grid> */}
              {/* ----------------------------------------------------------------- */}

              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  justifyContent: "flex-end"
                }}
              >
                <Tooltip
                  title="logout"
                  placement="left"
                  aria-label="logout"
                  style={{ marginRight: 15 }}
                >
                  <Avatar
                    color="primary"
                    src={"./../../../../img/user128.png"}
                  />
                </Tooltip>
                {/* ----------------------------------------------------------------- */}
                <Tooltip title="Logout" placement="left" aria-label="Logout">
                  <Avatar
                    color="primary"
                    onClick={() => {
                      Meteor.logout();
                    }}
                    src={"./../../../../img/logoutnew64.png"}
                  />
                </Tooltip>
                {/* ----------------------------------------------------------------- */}
              </Grid>
            </Grid>
          </AppBar>
          {/* -------------------------------- */}
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open
              })
            }}
            open={this.state.open}
          >
            {/* ------------------------------------------------------------ */}
            <div className={classes.toolbar}>
              <IconButton
                onClick={this.handleDrawerClose}
                style={{ marginTop: 5 }}
              >
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            {/* <Divider /> */}
            {/* ---------------------------------------------------------------- */}
            <List>
              <ListItem
                className={this.props.classes.Button}
                onClick={() => this.props.history.push("/admin/dashboard")}
                disabled={
                  !Meteor.user().profile.accesslist.includes("dashboard")
                }
              >
                <ListItemIcon>
                  <Tooltip
                    title="DashBoard"
                    placement="right"
                    aria-label="Home"
                    className={this.props.classes.menuButton}
                    disableFocusListener={this.state.open}
                    disableHoverListener={this.state.open}
                    disableTouchListener={this.state.open}
                  >
                    <Avatar
                      color="primary"
                      src={"./../../../../img/home128.png"}
                    />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="DashBoard" color="primary" />
              </ListItem>
              {/* ----------------------------------------------------------------- */}
              <ListItem
                className={this.props.classes.Button}
                onClick={() =>
                  this.props.history.push("/admin/dashboard/admin-management")
                }
                disabled={
                  !Meteor.user().profile.accesslist.includes("editAdmins")
                }
              >
                <ListItemIcon>
                  <Tooltip
                    title="Admins"
                    placement="right"
                    aria-label="Group"
                    className={this.props.classes.menuButton}
                    disableFocusListener={this.state.open}
                    disableHoverListener={this.state.open}
                    disableTouchListener={this.state.open}
                  >
                    <Avatar
                      color="primary"
                      src={"./../../../../img/admin128.png"}
                    />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Admins" />
              </ListItem>
              {/* ----------------------------------------------------------------- */}
              <ListItem
                className={this.props.classes.Button}
                onClick={() =>
                  this.props.history.push("/admin/dashboard/users")
                }
                disabled={!Meteor.user().profile.accesslist.includes("users")}
              >
                <ListItemIcon>
                  <Tooltip
                    title="Users"
                    placement="right"
                    aria-label="AccountBox"
                    className={this.props.classes.menuButton}
                    disableFocusListener={this.state.open}
                    disableHoverListener={this.state.open}
                    disableTouchListener={this.state.open}
                  >
                    <Avatar
                      color="primary"
                      src={"./../../../../img/users128.png"}
                    />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
              {/* ----------------------------------------------------------------- */}
              <ListItem
                className={this.props.classes.Button}
                onClick={() =>
                  this.props.history.push("/admin/dashboard/stories")
                }
                disabled={!Meteor.user().profile.accesslist.includes("stories")}
              >
                <ListItemIcon>
                  <Tooltip
                    title="Stories"
                    placement="right"
                    aria-label="LibraryBooks"
                    className={this.props.classes.menuButton}
                    disableFocusListener={this.state.open}
                    disableHoverListener={this.state.open}
                    disableTouchListener={this.state.open}
                  >
                    <Avatar
                      color="primary"
                      src={"./../../../../img/stories128.png"}
                    />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Stories" />
              </ListItem>
              {/* ----------------------------------------------------------------- */}
              <ListItem
                className={this.props.classes.Button}
                onClick={() =>
                  this.props.history.push("/admin/dashboard/genre")
                }
                disabled={!Meteor.user().profile.accesslist.includes("genres")}
              >
                <ListItemIcon>
                  <Tooltip
                    title="Genres"
                    placement="right"
                    aria-label="Genres"
                    className={this.props.classes.menuButton}
                    disableFocusListener={this.state.open}
                    disableHoverListener={this.state.open}
                    disableTouchListener={this.state.open}
                  >
                    <Avatar
                      color="primary"
                      src={"./../../../../img/genre128.png"}
                    />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Genres" />
              </ListItem>
              {/* ----------------------------------------------------------------- */}

              <ListItem
                className={this.props.classes.Button}
                onClick={() => this.props.history.push("/admin/dashboard/crm")}
                disabled={!Meteor.user().profile.accesslist.includes("crm")}
              >
                <ListItemIcon>
                  <Tooltip
                    title="Compliments"
                    placement="right"
                    aria-label="Compliments"
                    className={this.props.classes.menuButton}
                    disableFocusListener={this.state.open}
                    disableHoverListener={this.state.open}
                    disableTouchListener={this.state.open}
                  >
                    <Avatar
                      color="primary"
                      src={"./../../../../img/complaint128.png"}
                    />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Compliments" />
              </ListItem>
              {/* ----------------------------------------------------------------- */}
              <ListItem
                className={this.props.classes.Button}
                onClick={() =>
                  this.props.history.push("/admin/dashboard/about-web")
                }
                disabled={!Meteor.user().profile.accesslist.includes("aboutUs")}
              >
                <ListItemIcon>
                  <Tooltip
                    title="About Us"
                    placement="right"
                    aria-label="Call"
                    className={this.props.classes.menuButton}
                    disableFocusListener={this.state.open}
                    disableHoverListener={this.state.open}
                    disableTouchListener={this.state.open}
                  >
                    <Avatar
                      color="primary"
                      src={"./../../../../img/aboutus128.png"}
                    />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="About Us" />
              </ListItem>
              {/* ----------------------------------------------------------------- */}
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar}>
              <AdminSwitch />
            </div>
          </main>
        </div>
      );
    } catch (e) {
      console.log(e);
      return <div>A problem occured</div>;
    }
  }
}

AdminDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withTracker(() => {
  Meteor.subscribe("users.allusers");
  let admins = Meteor.users.findOne({});
  console.log(admins.readingList);
  return { admins };
})(withStyles(styles, { withTheme: true })(withRouter(AdminDrawer)));
