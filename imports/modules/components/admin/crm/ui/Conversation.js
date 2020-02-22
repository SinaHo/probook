import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Grid, TextField, IconButton, Paper, Avatar } from "@material-ui/core";
import { SendRounded as Send } from "@material-ui/icons";
import { withTracker } from "meteor/react-meteor-data";
import { withRouter } from "react-router";
import { Crm as CrmData } from "../api/CrmData";
import progel from "../../../../../core/progel";

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageDraft: ""
    };
  }

  sendMessage = () => {
    Meteor.call(
      "crm.sendMessage",
      this.props.match.params.id,
      this.state.messageDraft,
      (err, res) => {
        if (res) progel.msg(res.message, res.variant);
        if (err) progel.msg(err.message, "error");
      }
    );
    this.setState({ messageDraft: "" });
  };
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  sendMessageField = () => {
    return (
      <Grid
        container
        style={{
          position: "fixed",
          bottom: 8
        }}
      >
        <Grid item xs={9}>
          <Paper>
            <TextField
              fullWidth
              id="messageDraft"
              variant="outlined"
              value={this.state.messageDraft}
              onChange={this.handleChange}
              label="Enter message"
            />
          </Paper>
        </Grid>

        <Grid item xs={2}>
          <IconButton onClick={this.sendMessage}>
            <Send />
          </IconButton>
        </Grid>
      </Grid>
    );
  };

  renderMessages = () => {
    if (this.props.messages == undefined) {
      return null;
    }

    return this.props.messages.messages.map((message, index) => {
      let justifyContent, backgroundColor;
      message.side == "admin"
        ? ((justifyContent = "flex-start"),
          (backgroundColor = progel.$c.secondary))
        : ((justifyContent = "flex-end"),
          (backgroundColor = progel.$c.primary));

      return (
        <Grid container>
          <Grid container key={index} justify={justifyContent}>
            <Grid item xs={8}>
              {message.side == "admin" ? (
                <Grid container justify={justifyContent}>
                  <Avatar
                    style={{
                      marginTop: 10,
                      backgroundColor: "white"
                    }}
                  >
                    <img src={"/img/admin64.png"} />
                  </Avatar>

                  <Grid
                    item
                    xs={5}
                    style={{
                      backgroundColor,
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      alignItems: "center",
                      boxShadow: `1px 1px 3px 3px #0001`,
                      borderRadius: 7,
                      padding: 10,
                      margin: 10,
                      color: "white"
                    }}
                  >
                    {message.text}
                  </Grid>
                </Grid>
              ) : (
                <Grid container justify={justifyContent}>
                  <Grid
                    item
                    xs={5}
                    style={{
                      backgroundColor,
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      alignItems: "center",
                      boxShadow: `1px 1px 3px 3px #0001`,
                      borderRadius: 7,
                      padding: 10,
                      margin: 10
                    }}
                  >
                    {message.text}
                  </Grid>

                  <Avatar
                    style={{
                      marginTop: 10,
                      backgroundColor: "white"
                    }}
                  >
                    <img src={"/img/user64.png"} />
                  </Avatar>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      );
    });
  };

  render() {
    console.log(this.props.match);
    return (
      <Grid container alignItems="flex-end" style={{ height: "100vh" }}>
        <Grid item xs={12} style={{ marginBottom: 60 }}>
          {" "}
          {this.renderMessages()}
        </Grid>

        {this.sendMessageField()}
      </Grid>
    );
  }
}

Conversation = withTracker(props => {
  Meteor.subscribe("crm.admin.answeredCrms");
  let messages = CrmData.find({ _id: props.match.params.id }).fetch()[0];
  return { messages };
})(Conversation);

export default withRouter(Conversation);
