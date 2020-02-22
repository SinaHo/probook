import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import {
  Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@material-ui/core";
import progel from "../../../../../core/progel";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { bookData } from "./../../../admin/books/api/BookData";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import EpisodeItem from "./EpisodeItem";
import Delete from "@material-ui/icons/Delete";
import { RLData } from "./../../home/api/ReadingListData";

import NoteAdd from "@material-ui/icons/NoteAdd";
import IconButton from "@material-ui/core/IconButton";

let fd = {};
const styles = theme => ({
  root: {
    display: "flex",
    position: "relative",
    top: "30px",
  },
  details: {
    // display: "flex",
    flexDirection: "column",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  },
  content: {
    // flex: "1 0 auto",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  },
  cover: {
    width: 151,
    height: 250,
    margin: "0 auto 0",
    width: "80%",
    position: "relative",
    zIndex: 1000,
  },
  chip: {
    margin: theme.spacing.unit,
  },
  Typography: {
    overflowWrap: "break-word",
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  typo: {
    ...theme.typography.button,
    backgroundColor: "#f5182d87",
    padding: theme.spacing.unit,
    width: "max-content",
    borderRadius: "5px",
    color: "white",
    margin: "3px 0",
  },
});
class ViewBook extends Component {
  getDate = date => {
    date = new Date(date);
    let res = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    return res;
  };
  addToReadingList = () => {
    Meteor.call(
      "readingList.addToReadingList",
      this.props.book._id,
      //this.props.book.episodeCount,
      (err, res) => {
        if (res) progel.msg(res.message, res.variant);
        if (err) progel.msg(err.message, "error");
      }
    );
  };
  removeFromReadingList = () => {
    Meteor.call(
      "readingList.removeFromReadingList",
      this.props.book._id,
      (err, res) => {
        if (res) progel.msg(res.message, res.variant);
        if (err) progel.msg(err.message, "error");
      }
    );
  };

  render() {
    const { classes } = this.props;
    if (!this.props.book || !this.props.user) {
      return null;
    }
    const bookId = this.props.book._id;
    return (
      <Grid container justify="center">
        <Grid item lg={11}>
          <Grid
            container
            justify="center"
            style={{
              padding: "20px 0",
              backgroundColor: " #f5d70075",
              borderRadius: "2px",
            }}
          >
            <Grid item lg={2} sm={5} md={4} xs={12}>
              <Card className={classes.root}>
                <CardMedia
                  className={classes.cover}
                  image="/img/cover.jpg"
                  title="cover"
                />
              </Card>
            </Grid>
            <Grid item lg={7} sm={5} md={6} xs={12} style={{ padding: "40px" }}>
              <Grid container>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography
                    component="h2"
                    variant="headline"
                    className={classes.typo}
                  >
                    {this.props.book.title}
                  </Typography>
                  <Typography variant="subheading" className={classes.typo}>
                    by {this.props.book.creatorUsername}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography className={classes.typo}>
                    {this.getDate(this.props.book.creationDate)}
                  </Typography>
                </Grid>
                <Grid item lg={12} md={6} sm={6} xs={12}>
                  {this.props.book.genres.map(item => {
                    return <Chip label={item} className={classes.chip} />;
                  })}
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Typography
                    variant="body2"
                    className={classes.Typography}
                    className={classes.typo}
                  >
                    {this.props.book.summary}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={2} sm={2} md={2} xs={12}>
              {this.props.rl ? (
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  className={classes.button}
                  onClick={() => {
                    this.removeFromReadingList();
                  }}
                >
                  remove from Readinglist
                  <Delete className={classes.rightIcon} />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.button}
                  onClick={() => {
                    this.addToReadingList();
                  }}
                >
                  Add TO Readinglist
                  <NoteAdd className={classes.rightIcon} />
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          lg={11}
          sm={11}
          md={11}
          xs={11}
          justify="center"
          style={{ margin: "40px 0" }}
        >
          <Grid container spacing={32}>
            {this.props.book.episodes.map((item, index) => {
              return (
                <Grid item lg={3} md={4} xs={12}>
                  <EpisodeItem
                    bookId={bookId}
                    title={item.title}
                    text={item.text}
                    index={index + 1}
                    rlExist={this.props.rl}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
export default withTracker(props => {
  props.match.params.id;
  Meteor.subscribe("book.getBook", props.match.params.id);
  Meteor.subscribe("readingList");
  let rl = !!RLData.find({ bookId: props.match.params.id }).fetch().length;
  let book = bookData.find({}).fetch()[0];
  let user = Meteor.users.find({}).fetch()[0];
  //let rlStatus = user.readingList.includes(props.match.params.id);
  return { book, user, rl };
})(withStyles(styles)(withRouter(ViewBook)));
