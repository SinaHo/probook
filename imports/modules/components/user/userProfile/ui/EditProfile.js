import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MyTextField from "../../../../customs/TextField/ui/TextField";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router";

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

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      bio: "",
      flag: true
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.flag && nextProps.user[0]) {
      return {
        fullname: nextProps.user[0].profile.fullname,
        bio: nextProps.user[0].profile.bio,
        flag: false
      };
    } else {
      return null;
    }
  }

  saveChanges = () => {
    Meteor.call(
      "users.editProfile",
      this.state.fullname,
      this.state.bio,
      (err, res) => {
        if (res) progel.msg(res.message, res.variant);
        if (err) progel.msg(err.message, "error");
      }
    );
    this.props.history.push("/user/profile");
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    if (this.props.user[0]) {
      return (
        <Grid container>
          <Grid
            container
            style={{ backgroundImage: `url(${"/img/background.jpg"})` }}
          >
            <Grid item>
              <Avatar
                alt={this.props.user[0].username}
                src={"../../../../img/user128.png"}
                className={classes.bigAvatar}
              />
            </Grid>
            <Grid item style={{ paddingTop: "50px" }}>
              <MyTextField
                label="fullname"
                variant="outlined"
                defaultValue={this.props.user[0].profile.fullname}
                className={classes.textField}
                style={{
                  backgroundColor: "white",
                  borderRadius: 5,
                  textAlign: "center",
                  justifyContent: "center",
                  margin: "0px"
                }}
                InputLabelProps={{
                  classes: {
                    root: this.props.classes.cssLabel,
                    focused: this.props.classes.cssFocused
                  }
                }}
                InputProps={{
                  classes: {
                    root: this.props.classes.cssOutlinedInput,
                    focused: this.props.classes.cssFocused,
                    notchedOutline: this.props.classes.notchedOutline
                  }
                }}
                onChange={this.handleChange("fullname")}
              />
              <p>{this.props.user[0].username}</p>
            </Grid>
          </Grid>
          <Grid
            container
            style={{
              display: "flex",
              justifyContent: "space-around"
            }}
          />
          {/* --------------------------------------------------------------------------------------------------------------- */}
          <Grid container>
            <Grid item lg={6} md={7} sm={8} style={{ paddingTop: "10px" }}>
              <MyTextField
                id="outlined-full-width"
                label="Bio"
                fullWidth
                multiline
                rows={8}
                style={{ margin: 8, paddingRight: "50px" }}
                multiline
                rows="8"
                margin="normal"
                placeholder="Help people get to know you"
                defaultValue={this.props.user[0].profile.bio || ""}
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={this.handleChange("bio")}
              />
            </Grid>
          </Grid>
          <Grid item style={{ paddingLeft: "7px" }}>
            <Button
              variant="outlined"
              className={classes.button}
              onClick={this.saveChanges}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      );
    } else {
      return null;
    }
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

EditProfile = withTracker(props => {
  Meteor.subscribe("users");
  let user = Meteor.users.find({}).fetch();
  return { user };
})(EditProfile);
EditProfile = withStyles(styles)(EditProfile);
export default withRouter(EditProfile);
