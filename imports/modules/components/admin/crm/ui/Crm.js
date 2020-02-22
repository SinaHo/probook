import React, { Component } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import progel from "../../../../../core/progel";
import Topics from "./Topics";

class Crm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "answered"
    };
  }

  render() {
    return (
      <Grid container justify={"center"} style={{ marginTop: 20 }}>
        <Grid item xs={12} md={8}>
          <Grid container justify={"space-evenly"}>
            <Grid item xs={2}>
              <Button
                style={
                  this.state.status == "pending"
                    ? { backgroundColor: progel.$c.primary }
                    : {}
                }
                onClick={() => {
                  this.setState({
                    status: "pending"
                  });
                }}
              >
                Pending
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                style={
                  this.state.status == "answered"
                    ? { backgroundColor: progel.$c.primary }
                    : {}
                }
                onClick={() => {
                  this.setState({
                    status: "answered"
                  });
                }}
              >
                Answered
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                style={
                  this.state.status == "solved"
                    ? { backgroundColor: progel.$c.primary }
                    : {}
                }
                onClick={() => {
                  this.setState({
                    status: "solved"
                  });
                }}
              >
                Solved
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                style={
                  this.state.status == "closed"
                    ? { backgroundColor: progel.$c.primary }
                    : {}
                }
                onClick={() => {
                  this.setState({
                    status: "closed"
                  });
                }}
              >
                Closed
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginTop: 40 }}>
          <Topics status={this.state.status} />
        </Grid>
      </Grid>
    );
  }
}

export default Crm;
