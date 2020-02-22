import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { withRouter } from "react-router";

// const history = createBrowserHistory({ forceRefresh: true });

const styles = {
  button: {
    "&:hover": {
      background: "#f9cf5d",
      border: "#f9cf5d 1px solid"
    }
  }
};

class UserTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      flag: true
    };
  }
  editProfile = () => {
    this.props.history.push("/user/edit-profile");
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.flag && nextProps) {
      var a = new Date(nextProps.date);
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      return {
        date: date + " " + month + " " + year,
        flag: false
      };
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.bio !== prevProps.bio) {
      fetch(this.props.bio);
    }
  }

  render() {
    const { classes } = this.props;
    if (!!this.props.bio) {
      return (
        <Grid container style={{ paddingLeft: "20px", paddingBottom: "15px" }}>
          <Grid item>
            <Typography variant="subtitle1" component="p">
              Joined {this.state.date}.
            </Typography>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container style={{ paddingLeft: "20px" }}>
          <Grid item>
            <Button
              variant="outlined"
              className={classes.button}
              onClick={this.editProfile}
            >
              Add Bio
            </Button>
            <Typography
              style={{ paddingBottom: "15px" }}
              variant="subtitle1"
              component="h3"
            >
              <p />
              Joined {this.state.date}.
            </Typography>
          </Grid>
        </Grid>
      );
    }
  }
}
UserTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

UserTabs = withStyles(styles)(UserTabs);
export default withRouter(UserTabs);
