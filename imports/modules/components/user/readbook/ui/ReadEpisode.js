import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { withTracker } from "meteor/react-meteor-data";
import { bookData } from "../../../admin/books/api/BookData";
import { Meteor } from "meteor/meteor";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { withRouter } from "react-router";
import progel from "../../../../../core/progel";
import ReactHtmlParser from "react-html-parser";

const styles = {
  root: {
    display: "flex",
    justifyContent: "flex-end",
    // color: green[600],
    "&$checked": {
      color: green[500]
    }
  },
  checked: {}
};

class ReadEpisode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  handleChange = event => {
    this.setState({ checked: event.target.checked });
  };

  handleFirstPageButtonClick = event => {
    this.props.history.push(
      `/user/books/${this.props.match.params.id}/view/${0}`
    );
  };

  handleBackButtonClick = event => {
    this.props.history.push(
      `/user/books/${this.props.match.params.id}/view/${this.props.match.params
        .index - 1}`
    );
  };

  handleNextButtonClick = event => {
    let nextIndex = ++this.props.match.params.index;
    this.props.history.push(
      `/user/books/${this.props.match.params.id}/view/${nextIndex}`
    );
  };

  handleLastPageButtonClick = event => {
    this.props.history.push(
      `/user/books/${this.props.match.params.id}/view/${this.props.book
        .bookLastEpisode - 1}`
    );
  };

  render() {
    const { classes } = this.props;
    const index = this.props.match.params.index;
    if (this.props.outOfIndex || !this.props.book || !this.props.episode) {
      return (
        <Grid container justify="center">
          There was a problem loading book
        </Grid>
      );
    } else {
      return (
        <Grid
          container
          style={{
            position: this.state.checked ? "fixed" : "",
            display: "flex",
            justifyContent: "flex-start"
          }}
        >
          {/* <Grid item lg={12} xl={12} md={12} sm={12} xs={12}>
            <FormControlLabel
              classes={{ root: classes.root }}
              control={
                <Checkbox
                  checked={this.state.checked}
                  onChange={this.handleChange}
                  value="check"
                  classes={{ root: classes.root, checked: classes.checked }}
                />
              }
              label="full screen"
            />
          </Grid> */}
          <Grid item />
          <Grid
            item
            xs={10}
            style={{
              margin: "auto",
              padding: "15px",
              border: `solid 2px ${progel.$c.primary}`,
              borderRadius: 5
            }}
          >
            <h3>
              Episode {this.props.book.episodes[index].bookLastEpisode}:{" "}
              {this.props.book.episodes[index].title}
            </h3>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              style={{
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                lineHeight: "26pt"
              }}
            >
              {ReactHtmlParser(this.props.book.episodes[index].text)}
            </Typography>
            <Grid item>
              <IconButton
                onClick={this.handleFirstPageButtonClick}
                disabled={this.props.book.episodes[index].bookLastEpisode <= 1}
                aria-label="First Episode"
              >
                <FirstPageIcon />
              </IconButton>
              <IconButton
                onClick={this.handleBackButtonClick}
                disabled={this.props.book.episodes[index].bookLastEpisode <= 1}
                aria-label="Previous Episode"
              >
                <KeyboardArrowLeft />
              </IconButton>
              <IconButton
                onClick={this.handleNextButtonClick}
                disabled={
                  this.props.book.episodes[index].bookLastEpisode >=
                  this.props.book.bookLastEpisode
                }
                aria-label="Next Episode"
              >
                <KeyboardArrowRight />
              </IconButton>
              <IconButton
                onClick={this.handleLastPageButtonClick}
                disabled={
                  this.props.book.episodes[index].bookLastEpisode >=
                  this.props.book.bookLastEpisode
                }
                aria-label="Last Episode"
              >
                <LastPageIcon />
              </IconButton>
            </Grid>
          </Grid>
          {/********************************************************************************************* */}
        </Grid>
      );
    }
  }
}

ReadEpisode.propTypes = {
  classes: PropTypes.object.isRequired
};

ReadEpisode = withTracker(props => {
  console.log("test");
  Meteor.subscribe("books.read");
  let book = bookData.find({ _id: props.match.params.id }).fetch()[0];
  let index = props.match.params.index;
  if (!book || index < 0 || index >= book.episodes.length)
    return { outOfIndex: true };
  let episode = bookData
    .find(
      { _id: props.match.params.id },
      {
        episodes: { $elemMatch: { bookLastEpisode: props.match.params.index } }
      }
    )
    .fetch();

  return { book, episode, outOfIndex: false };
})(ReadEpisode);

export default withStyles(styles)(withRouter(ReadEpisode));
