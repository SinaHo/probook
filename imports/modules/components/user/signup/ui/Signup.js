import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Accounts } from "meteor/accounts-base";
import { Redirect } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import progel from "../../../../../core/progel";

import { withTracker } from "meteor/react-meteor-data";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import { Smartphone } from "@material-ui/icons";
import { withRouter } from "react-router";
import { Meteor } from "meteor/meteor";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
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
    borderColor: "white ",
    padding: 0
  },
  fields: {
    width: "10%"
  },
  Typography: {
    fontSize: 80
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      phonenumber: "",
      username: "",
      password: "",
      confirmpassword: "",
      showPassword: false,
      showCofirmPass: false,
      loginusername: "",
      loginpassword: "",
      error: "",
      selectedValue: "b"
    };
  }

  signup = e => {
    e.preventDefault();

    if (this.state.password.length < 4) {
      this.setState({
        error: "Password length must be more than 4 chars"
      });
      return;
    }

    if (this.state.password !== this.state.confirmpassword) {
      this.setState({
        error: "Passwords doesn't match!"
      });
      return;
    }

    let username = this.state.username;
    let email = this.state.email;
    let password = this.state.password;
    let profile = {
      isAdmin: false,
      isOwner: false,
      fullname: this.state.fullname,
      phonenumber: this.state.phonenumber,
      date: new Date().getTime(),
      accesslist: ["writeBook"]
    };
    let messages = [];
    let _id;
    if (
      !username ||
      !email ||
      !password ||
      !this.state.fullname ||
      !this.state.phonenumber
    ) {
      alert("textfield cant be empty");
    } else {
      Meteor.call(
        "users.createUser",
        username,
        password,
        email,
        { profile },
        (err, res) => {
          if (res) progel.msg(res.message, res.variant);
          if (err) progel.msg(err.message, "error");
        }
      );
      Meteor.loginWithPassword(username, password);
      this.props.history.push("/user");
    }
  };
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
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
            <Grid item lg={12} xs={10}>
              <Grid container justify={"center"}>
                <Grid item xs={5} md={4} style={{ textAlign: "center" }}>
                  <h3
                    style={{
                      color: "#fffcff"
                    }}
                  >
                    signup
                  </h3>
                </Grid>
              </Grid>
              <Grid container justify="center" spacing={8}>
                {/* ------------------------------------------------------------ */}
                <Grid item xs={12} md={10}>
                  <TextField
                    required
                    id="fullname"
                    label="Full Name"
                    margin="normal"
                    onChange={this.handleChange}
                    value={this.state.fullname}
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
                      classes: {
                        root: this.props.classes.cssOutlinedInput,
                        focused: this.props.classes.cssFocused,
                        notchedOutline: this.props.classes.notchedOutline
                      }
                    }}
                  />
                </Grid>
                {/* ------------------------------------------------------------ */}
                <Grid item xs={12} md={10}>
                  <TextField
                    required
                    id="email"
                    label="Email Address"
                    margin="normal"
                    onChange={this.handleChange}
                    value={this.state.email}
                    className={this.props.classes.margin}
                    margin="normal"
                    variant="outlined"
                    fullWidth
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
                  />
                </Grid>
                {/* ------------------------------------------------------------ */}
                <Grid item xs={12} md={10}>
                  <TextField
                    required
                    id="phonenumber"
                    label="Phone Number"
                    margin="normal"
                    onChange={this.handleChange}
                    value={this.state.phonenumber}
                    className={this.props.classes.margin}
                    margin="normal"
                    variant="outlined"
                    fullWidth
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
                  />
                </Grid>
                {/* ------------------------------------------------------------ */}
                <Grid item xs={12} md={10}>
                  <TextField
                    required
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
                      classes: {
                        root: this.props.classes.cssOutlinedInput,
                        focused: this.props.classes.cssFocused,
                        notchedOutline: this.props.classes.notchedOutline
                      }
                    }}
                  />
                </Grid>
                {/* ------------------------------------------------------------ */}
                <Grid item xs={12} md={10}>
                  <TextField
                    required
                    id="password"
                    label="Password"
                    margin="normal"
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
                      classes: {
                        root: this.props.classes.cssOutlinedInput,
                        focused: this.props.classes.cssFocused,
                        notchedOutline: this.props.classes.notchedOutline
                      }
                    }}
                  />
                </Grid>
                {/* ------------------------------------------------------------ */}
                <Grid item xs={12} md={10}>
                  <TextField
                    required
                    id="confirmpassword"
                    label="ConfirmPassword"
                    margin="normal"
                    onChange={this.handleChange}
                    value={this.state.confirmpassword}
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
                      onClick={this.signup}
                      style={{
                        backgroundColor: "#ffc107",
                        borderRadius: 25,
                        color: "#263238"
                      }}
                    >
                      signup
                    </Button>
                  </Grid>
                </Grid>

                {/* ------------------------------------------------------------ */}
                <Grid container justify="center" style={{ margin: "20px 0" }}>
                  <Button
                    style={{ color: "white" }}
                    onClick={() => {
                      this.props.history.push("/");
                    }}
                  >
                    Already a mebmer ? Login
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
SignUp = withStyles(styles)(SignUp);
SignUp = withRouter(SignUp);
export default withTracker(() => {
  Meteor.subscribe("users");
  let users = Meteor.users.find({}).fetch();
  return { users };
})(SignUp);
