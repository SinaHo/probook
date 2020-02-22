import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { withRouter } from "react-router";
import { Crm as CrmData } from "./../api/CrmData";
import { ExpandMore } from "@material-ui/icons";
import { Grid, Typography, IconButton } from "@material-ui/core";
import progel from "../../../../../core/progel";
import Conversation from "./Conversation";

class Topic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conversation: false
    };
  }

  setAsAnswered = id => {
    Meteor.call("crm.setTopicAsAnswered", id, (err, res) => {
      if (res) progel.msg(res.message, res.variant);
      if (err) progel.msg(err.message, "error");
    });
  };

  renderConversations = crmId => {
    return <Conversation side="admin" crmId={crmId} />;
  };

  render() {
    return (
      <Grid container justify={"center"}>
        {this.props.Crm.map((item, index) => {
          return (
            <Grid
              item
              key={index}
              xs={9}
              style={{
                height: 110,
                boxShadow: `1px 1px 3px 3px ${
                  item.priority == "critical"
                    ? progel.$c.secondary
                    : item.priority == "important"
                    ? progel.$c.primary
                    : progel.$c.neutral
                }`,
                borderRadius: 7,
                marginBottom: 30,
                paddingTop: 8,
                paddingBottom: 30,
                paddingLeft: 15
              }}
            >
              <Grid container justify={"flex-start"}>
                <Grid container>
                  <Typography
                    variant="h5"
                    style={{
                      color:
                        item.priority == "critical"
                          ? progel.$c.secondary
                          : item.priority == "important"
                          ? progel.$c.primary
                          : progel.$c.neutral,

                      marginBottom: 7
                    }}
                  >
                    {item.priority}
                  </Typography>
                  <Grid item xs={2}>
                    <IconButton
                      onClick={() => {
                        this.setAsAnswered(item._id);
                        this.props.history.push(
                          "/admin/dashboard/crm/" + item._id
                        );
                      }}
                    >
                      <ExpandMore />
                    </IconButton>
                  </Grid>
                </Grid>

                <Grid item xs={5} style={{ marginBottom: 7 }}>
                  <span>title:</span> {item.title}
                </Grid>
                <Grid item xs={5} style={{ marginBottom: 7 }}>
                  <span>from:</span> {item.creatorName}
                </Grid>

                <Grid item xs={5} style={{ marginBottom: 7 }}>
                  <span>Date:</span>{" "}
                </Grid>
                <Grid item xs={5} style={{ marginBottom: 7 }}>
                  <span>status:</span> {item.status}
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

Topic = withTracker(props => {
  Meteor.subscribe(`crm.admin.${props.status}Crms`);
  let Crm = CrmData.find({ status: props.status }).fetch();
  return { Crm };
})(Topic);

export default withRouter(Topic);
