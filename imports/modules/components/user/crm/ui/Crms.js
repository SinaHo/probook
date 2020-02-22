import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Input,
  Tooltip,
  Avatar
} from "@material-ui/core";

import Topics from "./Topics";
import progel from "../../../../../core/progel";

class Crm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crmModalOpen: false,
      title: "",
      priority: "",
      description: ""
    };
  }

  submitCompliment = () => {
    Meteor.call(
      "crm.submitNewCrm",
      this.state.title,
      this.state.priority,
      this.state.description,
      (err, res) => {
        if (res) progel.msg(res.message, res.variant);
        if (err) progel.msg(err.message, "error");
      }
    );
    this.cancelSubmitCompliment();
  };
  cancelSubmitCompliment = () => {
    this.setState({
      crmModalOpen: false,
      title: "",
      priority: "",
      description: ""
    });
  };
  handleChangeSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  renderSubmitComplimentDialog = () => {
    return (
      <Dialog
        id="submitCompliment"
        open={this.state.crmModalOpen}
        onClose={this.cancelSubmitCompliment}
        aria-labelledby="submitCompliment"
        aria-describedby="submitComplimentDescription"
      >
        <DialogTitle
          id="submitComplimentTitle"
          style={{
            backgroundColor: progel.$c.primary,
            display: "flex",
            justifyContent: "center"
          }}
        >
          Submit Compliment
        </DialogTitle>
        <DialogContent style={{ marginTop: 20 }}>
          <DialogContentText id="submitComplimentDescription">
            Fill out!!
          </DialogContentText>
          <Grid container justify="center">
            <Grid item xs={9}>
              <TextField
                label="Title"
                id="title"
                value={this.state.title}
                onChange={this.handleChange}
                style={{ margin: "15px 0" }}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={9}>
              <TextField
                label="Description"
                id="description"
                value={this.state.description}
                onChange={this.handleChange}
                style={{ margin: "15px 0" }}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={9}>
              <FormControl variant={"outlined"} fullWidth>
                <InputLabel htmlFor="priority">Priority!!</InputLabel>
                <Select
                  name="priority"
                  value={
                    !!this.state.priority && this.state.priority !== ""
                      ? this.state.priority
                      : "Choose one"
                  }
                  onChange={this.handleChangeSelect}
                  input={<Input name="priority" />}
                  inputProps={{
                    id: "priority",
                    name: "priority"
                  }}
                >
                  <MenuItem
                    value="critical"
                    style={{ backgroundColor: progel.$c.secondary }}
                  >
                    Critical
                  </MenuItem>
                  <MenuItem
                    value="important"
                    style={{ backgroundColor: progel.$c.primary }}
                  >
                    Important
                  </MenuItem>
                  <MenuItem
                    value="neutral"
                    style={{ backgroundColor: progel.$c.neutral }}
                  >
                    Neutral
                  </MenuItem>
                </Select>
                {/* <FormHelperText> Importance </FormHelperText> */}
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.cancelSubmitCompliment} color="primary">
            Decline
          </Button>
          <Button onClick={this.submitCompliment} color="primary" autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  newComplimentButton = () => {
    return (
      <Tooltip
        title="Submit Compliment"
        aria-label="submit-compliment"
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
            this.setState({ crmModalOpen: true });
          }}
          src={"/img/add128.png"}
        />
      </Tooltip>
    );
  };

  render() {
    return (
      <Grid container justify="center">
        <Grid
          item
          xs={11}
          md={5}
          style={{
            display: "flex",
            justifyContent: "center",
            border: "double 4px" + progel.$c.secondary
          }}
        >
          <span
            style={{
              height: 64,
              display: "flex",
              alignItems: "center",
              borderBottom: 50
            }}
          >
            My Submited Compliments
          </span>
        </Grid>
        <Grid item xs={12} style={{ height: 50 }} />
        <Topics style={{ borderTop: 15 }} />
        {this.renderSubmitComplimentDialog()}
        {this.newComplimentButton()}
      </Grid>
    );
  }
}

export default Crm;
