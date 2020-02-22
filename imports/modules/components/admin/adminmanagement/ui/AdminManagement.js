import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import Progel from "../../../../../core/progel";
import {
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import AdminCard from "./AdminCard";

export class AdminManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removeAdminAlertOpen: false,
      adminToRemoveName: undefined, // Actually it's admin's username
      adminToRemove_id: undefined,
      addAdminModalOpen: false,
      newAdmin: {
        username: "",
        fullname: "",
        password: "",
        confirmPassword: "",
        email: "",
        profile: {
          accesslist: [],
          isAdmin: true,
          isOwner: false
        }
      },
      newAdminChecklist: {
        editAdmins: false,
        dashboard: false,
        users: false,
        stories: false,
        genres: false,
        crm: false,
        aboutUs: false
      },
      // --------------------------------------- \\
      editAdminModalOpen: false,
      editAdmin: {
        username: "",
        fullname: "",
        profile: {
          accesslist: [],
          isAdmin: true,
          isOwner: false
        }
      },
      // ---------------------------------------
      editAdminChecklist: {
        editAdmins: false,
        dashboard: false,
        users: false,
        stories: false,
        genres: false,
        crm: false,
        aboutUs: false
      }
    };
  }
  acceptRemoveAdmin = () => {
    Meteor.call(
      "users.admins.remove",
      this.state.adminToRemove_id,
      (err, res) => {
        if (res) progel.msg(res.message, res.variant);
        if (err) progel.msg(err.message, "error");
      }
    );
    this.declineRemoveAdmin();
  };
  declineRemoveAdmin = () => {
    this.setState({
      removeAdminAlertOpen: false,
      adminToRemoveName: undefined,
      adminToRemove_id: undefined
    });
  };

  onDelete = (_id, fullname) => {
    this.setState({
      removeAdminAlertOpen: true,
      adminToRemoveName: fullname,
      adminToRemove_id: _id
    });
  };
  renderConfirmRemoveDialog = () => {
    return (
      <Dialog
        id="removeAdminAlert"
        open={this.state.removeAdminAlertOpen}
        onClose={this.declineRemoveAdmin}
        aria-labelledby="removeAdminAlertTitle"
        aria-describedby="removeAdminAlertDescription"
      >
        <DialogTitle
          id="removeAdminAlertTitle"
          style={{
            backgroundColor: Progel.$c.primary,
            display: "flex",
            justifyContent: "center"
          }}
        >
          Confirm Remove
        </DialogTitle>
        <DialogContent style={{ marginTop: 20 }}>
          <DialogContentText id="removeAdminAlertDescription">
            Do you really want to remove this admin with name: `
            <span style={{ fontSize: 24, color: "black" }}>
              {this.state.adminToRemoveName}
            </span>
            `
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.declineRemoveAdmin} color="primary">
            Decline
          </Button>
          <Button onClick={this.acceptRemoveAdmin} color="primary" autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  cancelAddAdmin = () => {
    this.setState({
      addAdminModalOpen: false,
      newAdmin: {
        username: "",
        fullname: "",
        password: "",
        confirmPassword: "",
        email: "",
        profile: {
          accesslist: [],
          isAdmin: true,
          isOwner: false
        }
      },
      newAdminChecklist: {
        editAdmins: false,
        dashboard: false,
        users: false,
        stories: false,
        genres: false,
        crm: false,
        aboutUs: false
      }
    });
  };
  confirmAddAdmin = () => {
    let nad = this.state.newAdmin;
    if (!nad.username || !nad.password || !nad.confirmPassword || !nad.email) {
      console.log("Please fill all required fields");
      return 0;
    }
    if (nad.password !== nad.confirmPassword) {
      console.log("Passwords doesn't match");
      return 0;
    }
    let accesslist = [];
    for (let item in this.state.newAdminChecklist) {
      if (this.state.newAdminChecklist[item] === true) {
        accesslist.push(item);
      }
    }
    Meteor.call(
      "users.admins.add",
      nad.username,
      nad.password,
      nad.email,
      nad.fullname,
      accesslist,
      (err, res) => {
        if (res) progel.msg(res.message, res.variant);
        if (err) progel.msg(err.message, "error");
      }
    );
    this.cancelAddAdmin();
  };
  handleAddInputChange = e => {
    let newAdmin = this.state.newAdmin;
    newAdmin[e.target.id] = e.target.value;
    this.setState({ newAdmin });
  };
  handleAddCheck = e => {
    let newAdminChecklist = this.state.newAdminChecklist;
    newAdminChecklist[e.target.id] = e.target.checked;
    this.setState({ newAdminChecklist });
  };
  renderAddAdminDialog = () => {
    return (
      <Dialog
        id="addAdminAlert"
        open={this.state.addAdminModalOpen}
        onClose={this.cancelAddAdmin}
        aria-labelledby="addAdminTitle"
        aria-describedby="addAdminDescription"
      >
        <DialogTitle
          id="addAdminTitle"
          style={{ backgroundColor: Progel.$c.primary }}
        >
          Add Admin
        </DialogTitle>
        <DialogContent>
          <Grid container justify="space-around">
            <Grid item xs={11}>
              <TextField
                label="Username"
                id="username"
                value={this.state.newAdmin.username}
                onChange={this.handleAddInputChange}
                style={{ margin: "15px 0" }}
                required
                fullWidth
              />
              <TextField
                label="E-Mail"
                id="email"
                value={this.state.newAdmin.email}
                onChange={this.handleAddInputChange}
                style={{ margin: "15px 0" }}
                type="email"
                required
                fullWidth
              />
              <TextField
                label="Password"
                id="password"
                value={this.state.newAdmin.password}
                onChange={this.handleAddInputChange}
                style={{ margin: "15px 0" }}
                type="password"
                required
                fullWidth
              />
              <TextField
                label="Confirm Password"
                id="confirmPassword"
                value={this.state.newAdmin.confirmPassword}
                onChange={this.handleAddInputChange}
                style={{ margin: "15px 0" }}
                type="password"
                required
                fullWidth
              />
              <TextField
                label="Full Name"
                id="fullname"
                value={this.state.newAdmin.fullname}
                onChange={this.handleAddInputChange}
                style={{ margin: "15px 0" }}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={9}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.newAdminChecklist.dashboard}
                    id="dashboard"
                    onChange={this.handleAddCheck}
                  />
                }
                label="Dashboard"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.newAdminChecklist.users}
                    id="users"
                    onChange={this.handleAddCheck}
                  />
                }
                label="Users"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.newAdminChecklist.stories}
                    id="stories"
                    onChange={this.handleAddCheck}
                  />
                }
                label="Stories"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.newAdminChecklist.genres}
                    id="genres"
                    onChange={this.handleAddCheck}
                  />
                }
                label="Genres"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.newAdminChecklist.crm}
                    id="crm"
                    onChange={this.handleAddCheck}
                  />
                }
                label="Compliments"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.newAdminChecklist.aboutUs}
                    id="aboutUs"
                    onChange={this.handleAddCheck}
                  />
                }
                label="About Us"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.cancelAddAdmin} color="primary">
            Cancel
          </Button>
          <Button onClick={this.confirmAddAdmin} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  // ----------------------------------------------------------------------- \\
  onEdit = _id => {
    let admin = this.props.admins.filter(item => {
      return item._id === _id;
    })[0];

    this.setState({
      editAdminModalOpen: true,
      editAdmin: {
        username: admin.username,
        fullname: admin.profile.fullname,
        profile: {
          accesslist: admin.profile.accesslist,
          isAdmin: true,
          isOwner: false
        }
      },
      editAdminChecklist: {
        editAdmins: false,
        dashboard: admin.profile.accesslist.includes("dashboard"),
        users: admin.profile.accesslist.includes("users"),
        stories: admin.profile.accesslist.includes("stories"),
        genres: admin.profile.accesslist.includes("genres"),
        crm: admin.profile.accesslist.includes("crm"),
        aboutUs: admin.profile.accesslist.includes("aboutUs")
      }
    });
  };
  cancelEditAdmin = () => {
    this.setState({
      editAdminModalOpen: false,
      editAdmin: {
        username: "",
        fullname: "",
        profile: {
          accesslist: [],
          isAdmin: true,
          isOwner: false
        }
      },
      editAdminChecklist: {
        editAdmins: false,
        dashboard: false,
        users: false,
        stories: false,
        genres: false,
        crm: false,
        aboutUs: false
      }
    });
  };
  confirmEditAdmin = () => {
    let nad = this.state.editAdmin;
    let accesslist = [];
    for (let item in this.state.editAdminChecklist) {
      if (this.state.editAdminChecklist[item] === true) {
        accesslist.push(item);
      }
    }
    Meteor.call(
      "users.admins.edit",
      nad.username,
      nad.fullname,
      accesslist,
      (err, res) => {
        if (res) progel.msg(res.message, res.variant);
        if (err) progel.msg(err.message, "error");
      }
    );
    this.cancelEditAdmin();
  };
  handleEditInputChange = e => {
    let editAdmin = this.state.editAdmin;
    editAdmin[e.target.id] = e.target.value;
    this.setState({ editAdmin });
  };
  handleEditCheck = e => {
    let editAdminChecklist = this.state.editAdminChecklist;
    editAdminChecklist[e.target.id] = e.target.checked;
    this.setState({ editAdminChecklist });
  };

  renderEditAdminDialog = () => {
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
          style={{ backgroundColor: Progel.$c.primary }}
        >
          Edit Admin
        </DialogTitle>
        <DialogContent>
          <Grid container justify="space-around">
            <Grid item xs={11}>
              <TextField
                label="Username"
                id="username"
                value={this.state.editAdmin.username || ""}
                onChange={this.handleEditInputChange}
                style={{ margin: "15px 0" }}
                disabled
                required
                fullWidth
              />
              <TextField
                label="Full Name"
                id="fullname"
                value={this.state.editAdmin.fullname || ""}
                onChange={this.handleEditInputChange}
                style={{ margin: "15px 0" }}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={9}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.editAdminChecklist.dashboard}
                    id="dashboard"
                    onChange={this.handleEditCheck}
                  />
                }
                label="Dashboard"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.editAdminChecklist.users}
                    id="users"
                    onChange={this.handleEditCheck}
                  />
                }
                label="Users"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.editAdminChecklist.stories}
                    id="stories"
                    onChange={this.handleEditCheck}
                  />
                }
                label="Stories"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.editAdminChecklist.genres}
                    id="genres"
                    onChange={this.handleEditCheck}
                  />
                }
                label="Genres"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.editAdminChecklist.crm}
                    id="crm"
                    onChange={this.handleEditCheck}
                  />
                }
                label="Compliments"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.editAdminChecklist.aboutUs}
                    id="aboutUs"
                    onChange={this.handleEditCheck}
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
  // -------------------------------------------------------------- \\
  addAdminButton = () => {
    return (
      <Tooltip
        title="Add"
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
            this.setState({ addAdminModalOpen: true });
          }}
          src={"./../../../../img/add256.png"}
        />
      </Tooltip>
    );
  };
  renderNoAdminsFound = () => {
    return (
      <div>
        No Admins Found {this.addAdminButton()}
        {this.renderAddAdminDialog()}
      </div>
    );
  };
  // ----------------------------------------------------------------------- \\
  render() {
    if (!this.props.admins || this.props.admins.length === 0)
      return this.renderNoAdminsFound();
    return (
      <Grid container justify={"space-evenly"}>
        {this.props.admins.map((item, index) => {
          return (
            <AdminCard
              key={index}
              _id={item._id}
              username={item.profile.username}
              fullname={item.profile.fullname}
              accesslist={item.profile.accesslist}
              email={item.emails[0].address}
              onDelete={this.onDelete}
              onEdit={this.onEdit}
            />
          );
        })}
        {this.addAdminButton()}
        {this.renderConfirmRemoveDialog()}
        {this.renderAddAdminDialog()}
        {this.renderEditAdminDialog()}
      </Grid>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("users.allusers");
  let admins = Meteor.users
    .find({ "profile.isAdmin": true, "profile.isOwner": false })
    .fetch();
  return { admins };
})(AdminManagement);
