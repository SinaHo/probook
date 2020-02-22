import React, { Component } from "react";

import { Grid } from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import ExitToApp from "@material-ui/icons/ExitToApp";
const drawerWidth = 200;
const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    background: "#ffc107",
    height: "70px"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
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
    width: theme.spacing.unit * 19 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 18 + 1
    },
    background: "green"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",

    ...theme.mixins.toolbar
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});
class GenreAppbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      open: false
    };
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;
    return (
      <Grid>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <Grid container justify="space-around">
              <Grid item md={11}>
                {/*  <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.state.open
                })}
              >
                <MenuIcon />
              </IconButton> */}
                <Typography
                  variant="h6"
                  color="inherit"
                  noWrap
                  style={{
                    display: "flex",
                    fontFamily: "dilla",
                    fontStyle: "bolder",
                    fontSize: 60,
                    fontWeight: 300,

                    color: "#263238",
                    paddingLeft: 50,
                    justifyContent: "center"
                  }}
                >
                  ProlarGram{" "}
                </Typography>
              </Grid>
              <Grid item md={1} align-items="flex-end">
                <IconButton
                  variant="contained"
                  onClick={() => {
                    Meteor.logout();
                    Accounts.makeClientLoggedOut();
                    history.replace("/");
                  }}
                  color="inherit"
                  //style={{ position: "absolute", right: "20px" }}
                >
                  <ExitToApp fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
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
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {["Profile", "Chats"].map((text, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{text}</ListItemIcon>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(GenreAppbar);
