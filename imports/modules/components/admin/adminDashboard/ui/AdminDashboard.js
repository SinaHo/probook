import React, { Component } from "react";
import progel from "../../../../../core/progel";
import "../../../../../../public/Font.css";
import DatePicker from "./DatePicker";
import {
  Grid,
  TextField,
  Avatar,
  Button,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Tooltip,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import Notifications from "./Notifications";
class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendMessageModalOpen: false,
      text: "",
      users: true,
      admins: true,
      sendDate: 0,
      importanceDegree: "",

      editAdminModalOpen: false,
      editAdmin_fullname: Meteor.user().profile.fullname,
      editAdmin_bio: Meteor.user().profile.bio,
      editAdmin_oldPass: "",
      editAdmin_newPass: "",
      editAdmin_checkNewPass: "",
      editAdmin_showOld: false,
      editAdmin_showNew: false,
      editAdmin_showCheck: false
    };
  }
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleCheck = e => {
    this.setState({ [e.target.id]: e.target.checked });
  };
  handleChangeSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  cancelSendMessage = () => {
    this.setState({
      sendMessageModalOpen: false,
      text: "",
      users: true,
      admins: true,
      sendDate: 0,
      importanceDegree: ""
    });
  };
  confirmSendMessage = () => {
    Meteor.call(
      "users.sendMessage",
      this.state.text,
      new Date(this.state.date).getTime(),
      this.state.importanceDegree,
      this.state.admins,
      this.state.users,
      (err, res) => {
        if (res) progel.msg(res.message, res.variant);
        if (err) progel.msg(err.message, "error");
      }
    );
    this.cancelSendMessage();
  };
  renderSendMessageModal = () => {
    return (
      <Dialog
        id="sendMessageAlert"
        open={this.state.sendMessageModalOpen}
        onClose={this.cancelSendMessage}
        aria-labelledby="sendMessageTitle"
        aria-describedby="sendMessageDescription"
      >
        <DialogTitle
          id="sendMessageTitle"
          style={{ backgroundColor: progel.$c.primary }}
        >
          Send Message
        </DialogTitle>
        <DialogContent>
          <Grid container justify="space-around">
            <Grid item xs={11}>
              <TextField
                label="Send Message"
                id="text"
                value={this.state.text}
                onChange={this.handleChange}
                style={{ margin: "15px 0" }}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={11}>
              <DatePicker
                id="date"
                label={"BirthDate"}
                defaultValue={new Date()}
                dateValue={value => {
                  console.log(value);
                  this.setState({ date: new Date(value) });
                }}
              />
            </Grid>
            <Grid item xs={11}>
              <FormControl variant={"outlined"} fullWidth>
                <InputLabel htmlFor="importanceDegree">
                  Importance Degree!!
                </InputLabel>
                <Select
                  name="importanceDegree"
                  value={this.state.importanceDegree}
                  onChange={this.handleChangeSelect}
                  input={<Input name="importanceDegree" />}
                  inputProps={{
                    id: "importanceDegree",
                    name: "importanceDegree"
                  }}
                >
                  <MenuItem value="critical" style={{ backgroundColor: "red" }}>
                    Critical
                  </MenuItem>
                  <MenuItem
                    value="important"
                    style={{ backgroundColor: "green" }}
                  >
                    Important
                  </MenuItem>
                  <MenuItem value="neutral" style={{ backgroundColor: "grey" }}>
                    Neutral
                  </MenuItem>
                </Select>
                {/* <FormHelperText> Importance </FormHelperText> */}
              </FormControl>
            </Grid>
            <Grid item xs={9}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.users}
                    id="users"
                    onChange={this.handleCheck}
                  />
                }
                label="To users"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.admins}
                    id="admins"
                    onChange={this.handleCheck}
                  />
                }
                label="To Admins"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.cancelSendMessage} color="primary">
            Cancel
          </Button>
          <Button onClick={this.confirmSendMessage} color="primary" autoFocus>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  renderNotifications = () => {
    if (!Meteor.user().messages) return null;
    let messages = Meteor.user().messages;
    // return <Notifications message={messages[0]} index={0} />;
    return (
      <Grid
        container
        justify="center"
        style={{ overflowY: "scroll", overflowX: "hidden", marginTop: 15 }}
      >
        {messages.map((message, index) => {
          return <Notifications message={message} key={index} index={index} />;
        })}
      </Grid>
    );
  };
  // -------------------------------------------------------------------------------------------------------

  cancelEditAdmin = () => {
    this.setState({
      editAdminModalOpen: false,
      editAdmin_fullname: Meteor.user().profile.fullname,
      editAdmin_bio: Meteor.user().profile.bio,
      editAdmin_oldPass: "",
      editAdmin_newPass: "",
      editAdmin_checkNewPass: "",
      editAdmin_showOld: false,
      editAdmin_showNew: false,
      editAdmin_showCheck: false
    });
  };
  confirmEditAdmin = () => {
    Meteor.call(
      "users.editProfile",
      this.state.editAdmin_fullname,
      this.state.editAdmin_bio,
      (err, res) => {
        if (res) progel.msg(res.message, res.variant);
        if (err) progel.msg(err.message, "error");
      }
    );
    if (
      this.state.editAdmin_oldPass &&
      this.state.editAdmin_newPass === this.state.editAdmin_checkNewPass
    ) {
      Accounts.Accounts.changePassword(
        this.state.editAdmin_oldPass,
        this.state.editAdmin_newPass
      );
    }
    this.cancelEditAdmin();
  };
  handleEditAdminChange = e => {
    this.setState({
      [`editAdmin_${e.target.id}`]: e.target.value
    });
  };
  handleClickShowOldPassword = e => {
    let flag = this.state.editAdmin_showOld;
    this.setState({ editAdmin_showOld: !flag });
  };
  handleClickShowNewPassword = e => {
    let flag = this.state.editAdmin_showNew;
    this.setState({ editAdmin_showNew: !flag });
  };
  handleClickShowCheckPassword = e => {
    let flag = this.state.editAdmin_showCheck;
    this.setState({ editAdmin_showCheck: !flag });
  };

  renderEditAdminDialog = () => {
    let admin = Meteor.user();
    return (
      <Dialog
        id="editAdminAlert"
        open={this.state.editAdminModalOpen}
        onClose={this.cancelEditAdmin}
        aria-labelledby="editAdminTitle"
        aria-describedby="editAdminDescription"
      >
        <DialogTitle
          id="editAdminTitle"
          style={{ backgroundColor: progel.$c.primary }}
        >
          Edit Admin
        </DialogTitle>
        <DialogContent>
          <Grid container justify="space-around">
            <Grid item xs={11}>
              <TextField
                label="Username"
                id="username"
                value={admin.username || ""}
                style={{ margin: "15px 0" }}
                disabled
                required
                fullWidth
              />
              <TextField
                label="Full Name"
                id="fullname"
                value={this.state.editAdmin_fullname || ""}
                onChange={this.handleEditAdminChange}
                style={{ margin: "15px 0" }}
                required
                fullWidth
              />
              <TextField
                label="Bio"
                id="bio"
                value={this.state.editAdmin_bio || ""}
                onChange={this.handleEditAdminChange}
                style={{ margin: "15px 0" }}
                required
                fullWidth
              />
              <TextField
                id="oldPass"
                fullWidth
                margin="normal"
                variant="outlined"
                type={this.state.editAdmin_showOld ? "text" : "password"}
                label="Old Password"
                value={this.state.editAdmin_oldPass}
                onChange={this.handleEditAdminChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        id="editAdmin_showOld"
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowOldPassword}
                      >
                        {this.state.editAdmin_showOld ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                id="newPass"
                fullWidth
                disabled={!this.state.editAdmin_oldPass}
                required={!!this.state.editAdmin_oldPass}
                margin="normal"
                variant="outlined"
                type={this.state.editAdmin_showNew ? "text" : "password"}
                label="New Password"
                value={this.state.editAdmin_newPass}
                onChange={this.handleEditAdminChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        id="editAdmin_showNew"
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowNewPassword}
                      >
                        {this.state.editAdmin_showNew ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                id="checkNewPass"
                fullWidth
                disabled={!this.state.editAdmin_oldPass}
                required={!!this.state.editAdmin_oldPass}
                margin="normal"
                variant="outlined"
                type={this.state.editAdmin_showCheck ? "text" : "password"}
                label="Confirm New Password"
                value={this.state.editAdmin_checkNewPass}
                onChange={this.handleEditAdminChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        id="editAdmin_showCheck"
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowCheckPassword}
                      >
                        {this.state.editAdmin_showCheck ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={9}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={admin.profile.accesslist.includes("dashboard")}
                    id="dashboard"
                    disabled
                  />
                }
                label="Dashboard"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={admin.profile.accesslist.includes("users")}
                    id="users"
                    disabled
                  />
                }
                label="Users"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={admin.profile.accesslist.includes("stories")}
                    id="stories"
                    disabled
                  />
                }
                label="Stories"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={admin.profile.accesslist.includes("stories")}
                    id="stories"
                    disabled
                  />
                }
                label="Genres"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={admin.profile.accesslist.includes("crm")}
                    id="crm"
                    disabled
                  />
                }
                label="Compliments"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={admin.profile.accesslist.includes("aboutUs")}
                    id="aboutUs"
                    disabled
                  />
                }
                label="About Us"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.cancelEditAdmin} color="primary">
            Cancel
          </Button>
          <Button onClick={this.confirmEditAdmin} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // -------------------------------------------------------------------------------------------------------

  render() {
    return (
      <Grid
        container
        alignContent="center"
        style={{ backgroundImage: `url(${"../../../../img/pattern16.png"})` }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          style={{
            padding: 10,
            borderBottom: `4px double ${progel.$c.secondary} `
          }}
        />
        {/* ********************************************************** */}
        <Grid container justify="center">
          <Grid item xs={12} sm={6} md={3}>
            {/* ********************************************************** */}
            <ListItem>
              <Avatar
                color="primary"
                style={{ margin: "0 auto" }}
                src={"./../../../../img/users256.png"}
              />
              <ListItemText primary="usres " />
            </ListItem>
          </Grid>
          {/* ********************************************************** */}
          <Grid item xs={12} sm={6} md={3}>
            <ListItem>
              <Avatar
                color="primary"
                style={{ margin: "0 auto" }}
                src={"./../../../../img/admin256.png"}
              />
              <ListItemText primary="admins" />
            </ListItem>
          </Grid>
          {/* ********************************************************** */}
          <Grid item xs={12} sm={6} md={3}>
            <ListItem>
              <Avatar
                color="primary"
                style={{ margin: "0 auto" }}
                src={"./../../../../img/stories256.png"}
              />
              <ListItemText primary="stories" />
            </ListItem>
          </Grid>
          {/* ********************************************************** */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            onClick={() => {
              console.log("hello");
              this.setState({ editAdminModalOpen: true });
            }}
          >
            <ListItem>
              <Avatar
                color="primary"
                style={{ margin: "0 auto" }}
                src={"./../../../../img/genre256.png"}
              />
              <ListItemText primary="genres" />
            </ListItem>
          </Grid>
        </Grid>
        {/* ********************************************************** */}
        <Grid
          item
          xs={12}
          md={12}
          style={{
            padding: 10,
            borderBottom: `4px double ${progel.$c.secondary} `
          }}
        />
        {/* ********************************************************** */}
        <Grid container justify={"space-evenly"} style={{ marginTop: 50 }}>
          <Grid
            item
            md={5}
            xs={8}
            style={{
              boxShadow: `1px 1px 3px 3px #0001`,
              borderRadius: 7,
              marginBottom: 30
            }}
          >
            <Grid
              container
              style={{
                height: 60,
                backgroundColor: progel.$c.primary,
                borderTopRightRadius: 7,
                borderTopLeftRadius: 7
              }}
            >
              <h3 style={{ marginLeft: 20 }}>Notifications</h3>
            </Grid>
            <Grid
              container
              style={{
                maxHeight: 310,
                overflowY: "scroll",
                overflowX: "hidden"
              }}
            >
              {this.renderNotifications()}
            </Grid>
          </Grid>

          <Grid
            item
            md={5}
            xs={8}
            style={{
              boxShadow: `1px 1px 3px 3px #0001`,
              borderRadius: 7,
              marginBottom: 30
            }}
          >
            <Grid
              container
              style={{
                height: 60,
                backgroundColor: progel.$c.primary,
                borderTopRightRadius: 7,
                borderTopLeftRadius: 7
              }}
            >
              <h3 style={{ marginLeft: 20 }}> New Compliments</h3>
            </Grid>
            <Grid container style={{ height: 310, overflow: "scroll" }} />
          </Grid>

          {/* ********************************************************** */}
          <Tooltip
            title="Add Text"
            aria-label="Add"
            placement="right"
            style={{
              position: "fixed",
              bottom: 10,
              right: 20
            }}
          >
            <Avatar
              color="primary"
              onClick={() => {
                this.setState({ sendMessageModalOpen: true });
              }}
              src={"./../../../../img/add256.png"}
            />
          </Tooltip>
        </Grid>
        {this.renderSendMessageModal()}
        {this.renderEditAdminDialog()}
      </Grid>
    );
  }
}

export default AdminDashboard;
