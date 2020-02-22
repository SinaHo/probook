import React, { Component } from "react";
import BookItem from "./../../books/ui/bookItem";
import { Grid } from "@material-ui/core";

class Stories extends Component {
  render() {
    return (
      <Grid container justify="flex-start" spacing={32}>
        <BookItem returnforgenre={"2"} />
      </Grid>
    );
  }
}

export default Stories;
