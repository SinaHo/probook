import React, { Component } from "react";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Tooltip, Grid, Button, Hidden } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { withRouter } from "react-router";
import { withTracker } from "meteor/react-meteor-data";

import UserRoutes from "../../../../routes/UserRoutes";
import progel from "../../../../core/progel";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    padding: "6px ",
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: progel.$c.userdrawer
  },
  list: {
    marginTop: "110px"
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  menuButton: {
    marginLeft: 10,
    backgroundColor: "white"
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  hide: {
    display: "none"
  },
  drawerOpen: {
    width: theme.spacing.unit * 11,
    // [theme.breakpoints.down("xs")]: {
    //   width: theme.spacing.unit * 11
    // },
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
    width: theme.spacing.unit * 0
    // [theme.breakpoints.up("sm")]: {
    //   width: theme.spacing.unit * 11
    // }
  },
  content: {
    flexGrow: 1,
    padding: "95px 0 0 0"
  },
  toolbar: theme.mixins.toolbar,
  bootstrapRoot: {
    "label + &": {
      marginTop: theme.spacing.unit * 3
    }
  },
  bootstrapInput: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  },
  bootstrapFormLabel: {
    fontSize: 20,
    color: "white"
  },
  listItemText: {
    color: progel.$c.drawerTextColor
  }
});

class UserDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      status: !!this.props.location.pathname.split("/")[2]
        ? this.props.location.pathname.split("/")[2]
        : "home",
      note: "",
      show: false
    };
  }

  savenote = () => {
    // add this text to use notes {this.state.note}
    this.setState({ show: false });
  };
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleDrawer = () => {
    this.setState({ open: !this.state.open });
  };

  cancelnote = () => {
    this.setState({ show: false, note: "old nnote" });
    console.log(this.state.status);
  };
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value, show: true });
  };
  render() {
    const { classes } = this.props;
    if (!this.props.user) {
      return null;
    }
    return (
      <div>
        <Hidden smDown>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Grid container justify="flex-end">
                <Grid item lg={1} xs={1} md={1} sm={1}>
                  <img src="/img/logouser.svg" style={{ height: 75 }} />
                </Grid>
                <Grid item lg={11} xs={11} md={11} sm={11}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Grid container justify="flex-end">
                        <IconButton
                          aria-haspopup="true"
                          color="inherit"
                          onClick={() => {
                            this.setState({
                              status: "profile"
                            });
                            this.props.history.push(
                              this.props.match.path + "/profile"
                            );
                          }}
                        >
                          @{this.props.user.username}
                          <AccountCircle />
                        </IconButton>
                        <Tooltip
                          title="Logout"
                          placement="left"
                          aria-label="Logout"
                        >
                          <Avatar
                            color="primary"
                            onClick={() => {
                              Meteor.logout();
                              Accounts.makeClientLoggedOut();

                              this.props.history.push("/");
                            }}
                            src={"./../../../../img/logoutnew64.png"}
                            style={{ height: 25, width: 25, marginTop: 13 }}
                          />
                        </Tooltip>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      lg={11}
                      xs={11}
                      md={11}
                      sm={11}
                      style={{ marginLeft: 15 }}
                    >
                      <Grid
                        container
                        justify={"space-between"}
                        style={{
                          backgroundColor: "black",
                          borderRadius: "7px"
                        }}
                      >
                        <Grid item xs={2} md={2} sm={2}>
                          <Button
                            fullWidth
                            style={
                              this.state.status == "home"
                                ? { backgroundColor: progel.$c.primary }
                                : { color: "white" }
                            }
                            onClick={() => {
                              this.setState({
                                status: "home"
                              });
                              this.props.history.push("/");
                            }}
                          >
                            Home
                          </Button>
                        </Grid>

                        <Grid item xs={2}>
                          <Button
                            fullWidth
                            style={
                              this.state.status == "books"
                                ? { backgroundColor: progel.$c.primary }
                                : { color: "white" }
                            }
                            onClick={() => {
                              this.setState({
                                status: "books"
                              });
                              this.props.history.push(
                                this.props.match.path + "/books"
                              );
                            }}
                          >
                            Book
                          </Button>
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            fullWidth
                            style={
                              this.state.status == "write"
                                ? { backgroundColor: progel.$c.primary }
                                : { color: "white" }
                            }
                            onClick={() => {
                              this.setState({
                                status: "write"
                              });
                              this.props.history.push(
                                this.props.match.path + "/write"
                              );
                            }}
                          >
                            Write
                          </Button>
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            fullWidth
                            style={
                              this.state.status == "crm"
                                ? { backgroundColor: progel.$c.primary }
                                : { color: "white" }
                            }
                            onClick={() => {
                              this.setState({
                                status: "crm"
                              });
                              this.props.history.push(
                                this.props.match.path + "/crm"
                              );
                            }}
                          >
                            Crm
                          </Button>
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            fullWidth
                            style={
                              this.state.status == "aboutus"
                                ? { backgroundColor: progel.$c.primary }
                                : { color: "white" }
                            }
                            onClick={() => {
                              this.setState({
                                status: "aboutus"
                              });
                              this.props.history.push(
                                this.props.match.path + "/aboutus"
                              );
                            }}
                          >
                            About
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Grid container>
            <Grid item>w</Grid>
          </Grid>
        </Hidden>
        {/* ________________________________________________________________________ */}
        <Hidden mdUp>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Grid container justify="flex-end">
                <Grid item lg={2} xs={2} md={2} sm={2}>
                  <img src="/img/logouser.svg" style={{ height: 60 }} />
                </Grid>
                <Grid item lg={10} xs={10} md={10} sm={10}>
                  <Grid container justify="flex-end">
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: "flex",
                        justifyContent: "flex-end"
                      }}
                    >
                      <IconButton aria-haspopup="true" color="inherit">
                        {this.state.status}
                      </IconButton>
                      <IconButton
                        aria-haspopup="true"
                        color="inherit"
                        onClick={() => {
                          this.setState({
                            status: "profile"
                          });
                          this.props.history.push(
                            this.props.match.path + "/profile"
                          );
                        }}
                      >
                        <AccountCircle />
                      </IconButton>
                      <Tooltip
                        title="Logout"
                        placement="left"
                        aria-label="Logout"
                      >
                        <Avatar
                          color="primary"
                          style={{ height: 25, width: 25, marginTop: 13 }}
                          onClick={() => {
                            Accounts.makeClientLoggedOut();
                            Meteor.logout();
                            this.props.history.push("/");
                          }}
                          src={"./../../../../img/logoutnew64.png"}
                        />
                      </Tooltip>
                      <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.handleDrawer}
                        style={{
                          backgroundColor: progel.$c.userSecondary
                        }}
                      >
                        <MenuIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Drawer
            anchor="right"
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
            {/* ---------------------------------------------------------------- */}
            <List className={this.props.classes.list}>
              <ListItem
                className={this.props.classes.Button}
                onClick={() => {
                  this.setState({
                    status: "home"
                  });
                  this.props.history.push("/user");
                }}
              >
                <ListItemIcon>
                  <Tooltip
                    title="Home"
                    placement="left"
                    aria-label="Home"
                    // className={this.props.classes.menuButton}
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
              </ListItem>
              {/* ----------------------------------------------------------------- */}
              <ListItem
                className={this.props.classes.Button}
                onClick={() => {
                  this.setState({
                    status: "books"
                  });
                  this.props.history.push("/user/books");
                }}
              >
                <ListItemIcon>
                  <Tooltip
                    title="Books"
                    placement="left"
                    aria-label="Group"
                    // className={this.props.classes.menuButton}
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
              </ListItem>
              {/* ----------------------------------------------------------------- */}
              <ListItem
                className={this.props.classes.Button}
                onClick={() => {
                  this.setState({
                    status: "crm"
                  });
                  this.props.history.push("/user/crm");
                }}
              >
                <ListItemIcon>
                  <Tooltip
                    title="Crm"
                    placement="left"
                    aria-label="AccountBox"
                    // className={this.props.classes.menuButton}
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
              </ListItem>
              {/* ----------------------------------------------------------------- */}
              <ListItem
                className={this.props.classes.Button}
                onClick={() => {
                  this.setState({
                    status: "about"
                  });
                  this.props.history.push("/user/aboutus");
                }}
              >
                <ListItemIcon>
                  <Tooltip
                    title="AboutUs"
                    placement="left"
                    aria-label="AboutUs"
                    // className={this.props.classes.menuButton}
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
              </ListItem>
              {/* ----------------------------------------------------------------- */}

              {/* ----------------------------------------------------------------- */}
            </List>
          </Drawer>
          <Grid container>
            <Grid item>w</Grid>
          </Grid>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar}>
            <UserRoutes />
          </div>
        </main>
      </div>
    );
  }
}

UserDrawer = withTracker(() => {
  let user = Meteor.user();
  return { user };
})(UserDrawer);

export default withStyles(styles, { withTheme: true })(withRouter(UserDrawer));
