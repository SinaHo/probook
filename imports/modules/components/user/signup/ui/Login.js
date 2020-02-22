import React, { Component, forwardRef } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Accounts } from "meteor/accounts-base";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import progel from "../../../../../core/progel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { withRouter } from "react-router";
import Paper from "@material-ui/core/Paper";

import { Meteor } from "meteor/meteor";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(500 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#324A62",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  cssLabel: {
    color: "white",
    "&$cssFocused": {
      color: "white"
    }
  },

  cssFocused: {},
  cssUnderline: {
    "&:after": {
      borderBottomColor: "red"
    }
  },

  cssOutlinedInput: {
    color: "#eee",
    borderColor: "white",
    "&:before": {
      //underline color when textfield is inactive
      border: "1px solid red"
    },

    "&$cssFocused $notchedOutline": {
      borderColor: "white"
    }
  },
  notchedOutline: {
    "border-color": "white !important ",
    border: "2px solid red"
  },
  fields: {
    width: "10%"
  },
  Typography: {
    fontSize: 80
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      phonenumber: "",
      username: "",
      password: "",
      confirmpassword: "",
      loginusername: "",
      loginpassword: "",
      error: "",
      showPassword: false
    };
    this.TextFieldref = React.createRef();
  }

  login = e => {
    e.preventDefault();
    let username = this.state.username;
    let password = this.state.password;
    Meteor.loginWithPassword(username, password, (err, res) => {
      this.setState({ username: "", password: "" });

      this.props.history.push("/user");
    });
  };
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    if (Meteor.userId()) {
      this.props.history.push("/user");
    }
    return (
      <Grid
        container
        justify={"center"}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${"../../../../../img/background.png"})`,
          backgroundSize: "cover"
        }}
      >
        <Grid container className={this.props.classes.main}>
          <Paper className={this.props.classes.paper}>
            <Grid item lg={10} xs={10} style={{}}>
              <Grid container justify={"center"}>
                <Grid item xs={5} md={4} style={{ textAlign: "center" }}>
                  <h3
                    style={{
                      fontFamily: "IRANSansWeb",
                      color: "#fffcff"
                    }}
                  >
                    Login
                  </h3>
                </Grid>
              </Grid>
              <Grid container justify="center" spacing={40}>
                {/* ------------------------------------------------------------ */}
                <Grid item xs={12} md={10}>
                  <TextField
                    id="username"
                    label="User Name"
                    margin="normal"
                    onChange={this.handleChange}
                    value={this.state.username}
                    variant="outlined"
                    fullWidth
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
                  {/* ------------------------------------------------------------ */}
                  <TextField
                    id="password"
                    label="Password"
                    margin="normal"
                    type={this.state.showPassword ? "text" : "password"}
                    onChange={this.handleChange}
                    value={this.state.password}
                    variant="outlined"
                    fullWidth
                    className={this.props.classes.margin}
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

                {/* ------------------------------------------------------------ */}
                <Grid container justify="center">
                  <Grid item xs={5} md={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={this.login}
                      style={{
                        backgroundColor: "#ffc107",
                        borderRadius: 25,
                        color: "#263238"
                      }}
                    >
                      login
                    </Button>
                  </Grid>
                </Grid>

                {/* ------------------------------------------------------------ */}
                <Grid container justify="center" style={{ margin: "20px 0" }}>
                  <Button
                    style={{ color: "white" }}
                    onClick={() => {
                      this.props.history.push("/signup");
                    }}
                  >
                    not a member ? Signup
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
Login = withStyles(styles)(Login);
export default withRouter(Login);
