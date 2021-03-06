import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import {
  Grid,
  Button,
  ListItemText,
  List,
  ListItem,
  Hidden
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { withRouter } from "react-router";
import progel from "../../../../../core/progel";

const styles = theme => ({
  root: {
    display: "flex"
  },
  details: {
    // display: "flex",
    flexDirection: "column",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word"
  },
  content: {
    // flex: "1 0 auto",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word"
  },
  cover: {
    width: 151
  },
  typo: {
    ...theme.typography.button,
    backgroundColor: "#3f51b5",
    padding: theme.spacing.unit,
    width: "max-content",
    borderRadius: "5px",
    fontSize: "10px",
    color: "white"
  }
});

class EpisodeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      read: false
    };
  }
  viewEpisode = index => {
    this.props.history.push(
      `/user/books/${this.props.match.params.id}/view/${index}`
    );
  };
  readButtonActions = (bookId, episodeIndex) => {
    if (this.state.flag) {
      // Meteor.call();
    } else {
      Meteor.call(
        "readingList.markAsRead",
        bookId,
        episodeIndex,
        (err, res) => {
          if (res) progel.msg(res.message, res.variant);
          if (err) progel.msg(err.message, "error");
        }
      );
    }
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          image="/img/cover.jpg"
          title="cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography className={classes.typo}>
              episode {this.props.index}
            </Typography>
            <Typography component="h5" variant="h6">
              {this.props.title}
            </Typography>
          </CardContent>
        </div>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => this.viewEpisode(this.props.index - 1)}
          >
            View
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              this.setState({ flag: `${!this.state.flag}` });
              this.readButtonActions(
                this.props.bookId,
                Meteor.userId(),
                this.props.index
              );
            }}
          >
            read
          </Button>
        </CardActions>
      </Card>
    );
  }
}

EpisodeItem = withStyles(styles, { withTheme: true })(EpisodeItem);
export default withRouter(EpisodeItem);
