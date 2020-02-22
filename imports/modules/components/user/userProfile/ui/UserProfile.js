import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import UserTabs from "./UserTabs";
import { withTracker } from "meteor/react-meteor-data";
import { withRouter } from "react-router";
import { Meteor } from "meteor/meteor";
import ReactHtmlParser from "react-html-parser";
import Typography from "@material-ui/core/Typography";

const styles = {
  bigAvatar: {
    margin: 10,
    width: 150,
    height: 150
  },
  button: {
    "&:hover": {
      background: "#f9cf5d",
      border: "#f9cf5d 1px solid"
    }
  }
};

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: ""
    };
  }

  editProfile = () => {
    this.props.history.push("/user/edit-profile");
  };

  render() {
    if (!Meteor.userId()) {
      this.props.history.push("/user");
    }

    const { classes } = this.props;
    if (!this.props.user[0]) return null;
    let str = "";
    if (this.props.user[0].profile.bio) {
      str = this.props.user[0].profile.bio.replace(/\</g, "");
      str = str.replace(/\>/g, "");
      str = str.replace(/(?:\r\n|\r|\n)/g, "</br>");
    }
    return (
      <Grid container>
        <Grid
          container
          style={{ backgroundImage: `url(${"/img/background.jpg"})` }}
        >
          <Grid item>
            <Avatar
              alt={"@" + this.props.user[0].username}
              src={"../../../../img/user128.png"}
              className={classes.bigAvatar}
            />
          </Grid>
          <Grid item style={{ paddingTop: "60px" }}>
            <strong>{this.props.user[0].profile.fullname}</strong>
            <p>{"@" + this.props.user[0].username}</p>
          </Grid>
        </Grid>

        {/* -------------------------------------------------------------------------------------------------------------------- */}
        <Grid item style={{ padding: "20px" }}>
          <Typography variant="h6" component="h3">
            {ReactHtmlParser(str)}
          </Typography>
        </Grid>

        <UserTabs
          status={this.state.status}
          date={this.props.user[0].profile.date}
          bio={!!this.props.user[0].profile.bio}
        />
        <Grid item style={{ paddingLeft: "20px" }}>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={this.editProfile}
          >
            Edit Profile
          </Button>
        </Grid>
      </Grid>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

UserProfile = withTracker(props => {
  Meteor.subscribe("users");
  let user = Meteor.users.find({}).fetch();
  console.log(user);
  return { user };
})(UserProfile);

export default withStyles(styles)(withRouter(UserProfile));
