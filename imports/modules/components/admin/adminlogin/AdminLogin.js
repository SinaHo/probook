import React from "react";
import { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Grid, Button, TextField, withStyles } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import PropTypes from "prop-types";
import progel from "../../../../core/progel";

const styles = {
  cssLabel: {
    "&$cssFocused": {
      color: progel.$c.primary
    }
  },
  cssFocused: {},
  cssUnderline: {
    "&:after": {
      borderBottomColor: progel.$c.primary
    }
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: progel.$c.primary
    }
  },
  notchedOutline: {},
  fields: {
    width: "10%"
  }
};

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginusername: "",
      loginpassword: "",
      error: "",
      selectedValue: "b",
      showPassword: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  login = e => {
    e.preventDefault();
    let username = this.state.loginusername;
    let password = this.state.loginpassword;
    Meteor.logout();
    Meteor.loginWithPassword(username, password, (err, res) => {
      if (Meteor.userId() && !!Meteor.user().profile.isAdmin) {
        this.props.history.push("/admin/dashboard");
      } else {
        console.log("Not logged in");
        Meteor.logout();
      }
    });
  };

  render() {
    if (Meteor.user() && Meteor.user().profile.isAdmin) {
      this.props.history.push("/admin/dashboard");
    }
    return (
      <Grid container>
        <Grid
          container
          justify={"center"}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${"../../../../img/old-book.jpg"})`,
            backgroundSize: "cover"
          }}
        />
        <Grid container justify={"center"}>
          <div
            style={{
              position: "fixed",
              right: "15%",
              top: "35%",
              padding: "15px"
            }}
          >
            <img
              src={"./../../../../img/logo128.png"}
              style={{
                position: "fixed",
                top: "25%",
                left: "65%",
                width: "5%"
              }}
            />
            <img
              src={"./../../../../img/login.png"}
              style={{
                position: "fixed",
                top: "26%",
                left: "72%",
                width: "7%"
              }}
            />
          </div>
          <Grid
            item
            xs={3}
            style={{
              position: "fixed",
              top: "38%",
              left: "60%"
            }}
          >
            <Grid container justify={"center"}>
              <Grid item xs={8}>
                <TextField
                  id="loginusername"
                  fullWidth
                  value={this.state.loginusername}
                  label="User Name"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange}
                  className={this.props.classes.margin}
                  InputLabelProps={{
                    classes: {
                      root: this.props.classes.cssLabel,
                      focused: this.props.classes.cssFocused
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end"> </InputAdornment>
                    ),
                    classes: {
                      root: this.props.classes.cssOutlinedInput,
                      focused: this.props.classes.cssFocused,
                      notchedOutline: this.props.classes.notchedOutline
                    }
                  }}
                />

                <TextField
                  id="loginpassword"
                  fullWidth
                  className={this.props.classes.margin}
                  margin="normal"
                  variant="outlined"
                  type={this.state.showPassword ? "text" : "password"}
                  label="Password"
                  value={this.state.loginpassword}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    classes: {
                      root: this.props.classes.cssLabel,
                      focused: this.props.classes.cssFocused
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    classes: {
                      root: this.props.classes.cssOutlinedInput,
                      focused: this.props.classes.cssFocused,
                      notchedOutline: this.props.classes.notchedOutline
                    }
                  }}
                />
              </Grid>
              <Button
                onClick={this.login}
                style={{
                  borderRadius: 8,
                  backgroundColor: progel.$c.primary,
                  fontSize: 14,
                  width: "52%",
                  marginTop: "10px"
                }}
              >
                login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

AdminLogin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminLogin);
