import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withTracker } from "meteor/react-meteor-data";
import SingleBook from "../singlebook/SingleBook";
import { bookData } from "../../admin/books/api/BookData";
import { RLData } from "./api/ReadingListData";

class Home extends Component {
  sort = () => {
    const notUpd = [];
    const upd = [];
    this.props.Rl.map(item => {
      if (item.unread.length == 0) {
        notUpd.push(item);
      } else {
        upd.push(item);
      }
      console.log(item);
    });
    console.log(upd);
    return { upd, notUpd };
  };
  render() {
    // const { updated, notUpdated } = this.readingListSort();
    if (this.props.subRl.ready()) {
      const { upd, notUpd } = this.sort();
      return (
        <Grid container justify="center">
          <Grid
            item
            xs={10}
            style={{
              borderBottom: "black 2px solid",
              marginBottom: 30,
              marginTop: 30
            }}
          >
            <Typography variant="h5">Unread Books</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              {upd.map(item => {
                return (
                  <Grid
                    item
                    xs={8}
                    style={{ marginBottom: 20 }}
                    onClick={() => {
                      this.props.history.push(`/user/books/${item.bookId}`);
                    }}
                  >
                    <SingleBook bookname={item.title} />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid
            item
            xs={10}
            style={{
              borderBottom: "black 2px solid",
              marginBottom: 30,
              marginTop: 30
            }}
          >
            <Typography variant="h5">Read Books</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              {notUpd.map(item => {
                return (
                  <Grid
                    item
                    xs={8}
                    onClick={() => {
                      this.props.history.push(`/user/books/${item.bookId}`);
                    }}
                    style={{ marginBottom: 20 }}
                  >
                    <SingleBook bookname={item.title} />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      );
    } else {
      return null;
    }
  }
}

export default withTracker(props => {
  let subRl = Meteor.subscribe("readingList");
  let Rl = RLData.find({}).fetch();
  return { subRl, Rl };
})(Home);
