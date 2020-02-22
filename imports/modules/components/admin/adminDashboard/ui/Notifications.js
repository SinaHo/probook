import React, { Component } from "react";
import { Grid, IconButton } from "@material-ui/core";
import {
  Notifications as NotificationsIcon,
  ExpandLess,
  ExpandMore
} from "@material-ui/icons";

import progel from "../../../../../core/progel";
class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIsOpen: false
    };
  }
  expandMore = () => {
    this.setState({ componentIsOpen: true });
    if (!this.props.message.read) {
      Meteor.call("users.messages.setAsSeen", this.props.index, (err, res) => {
        if (res) progel.msg(res.message, res.variant);
        if (err) progel.msg(err.message, "error");
      });
    }
  };
  expandLess = () => {
    this.setState({ componentIsOpen: false });
  };
  renderCompactComponent = () => {
    let deg = this.props.message.importanceDegree;
    let emoji = deg === "neutral" ? "❕" : deg === "important" ? "❗️" : "⁉️";
    return (
      <Grid container>
        <Grid
          item
          xs={10}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <NotificationsIcon style={{ marginRight: 15 }} />
          Sender : {this.props.message.senderName}
        </Grid>
        <Grid item xs={1}>
          {emoji}
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={this.expandMore}>
            <ExpandMore />
          </IconButton>
        </Grid>
      </Grid>
    );
  };
  renderCollapsedComponent = () => {
    let deg = this.props.message.importanceDegree;
    let emoji = deg === "neutral" ? "❕" : deg === "important" ? "❗️" : "⁉️";
    return (
      <Grid container>
        <Grid
          item
          xs={10}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <NotificationsIcon style={{ marginRight: 15 }} />
          Sender : {this.props.message.senderName}
        </Grid>
        <Grid item xs={1}>
          {emoji}
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={this.expandLess}>
            <ExpandLess />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={11}>
              {this.props.message.text}
            </Grid>
            <Grid
              item
              xs={1}
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end"
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  };
  render() {
    return this.state.componentIsOpen ? (
      <Grid
        item
        xs={11}
        style={{
          borderBottom: `double 2px ${progel.$c.secondary}`
        }}
      >
        {this.renderCollapsedComponent()}
      </Grid>
    ) : (
      <Grid item xs={11}>
        {this.renderCompactComponent()}
      </Grid>
    );
  }
}

export default Notifications;
