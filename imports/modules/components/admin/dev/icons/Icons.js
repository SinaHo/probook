import React, { Component } from "react";
import { Grid, IconButton, Icon } from "@material-ui/core";
import { Group as IconComponent } from "@material-ui/icons";

class Icons extends Component {
  render() {
    return (
      <Grid container>
        <Grid item>
          <IconButton>
            <IconComponent />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

export default Icons;
