import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import {
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
import progel from "../../../../core/progel";

const styles = theme => ({
  root: {
    display: "flex",
    borderRadius: 10,
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    cursor: "pointer"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  details: {
    display: "block",
    // flexDirection: "column",
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
  }
  // zoomCover: {
  //   position: "relative",
  //   "&:hover": {
  //     width: 500,
  //     height: 800,
  //     padding: 50
  //   }
  // },
  // titleStyle: {},
  // summaryStyle: {}
});

class SingleBook extends Component {
  render() {
    const { classes, theme } = this.props;

    return (
      <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          image="/img/cover.jpg"
          title="cover"
        />
        <div className={classes[this.props.divclassname]}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h6">
              {this.props.bookname}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {"@" + this.props.writername}
            </Typography>
            <Typography variant="body2">{this.props.summary}</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {this.props.genres
                ? this.props.genres.map(item => {
                    return (
                      <span style={{ padding: 5 }} key={item}>
                        {item}
                      </span>
                    );
                  })
                : null}
            </Typography>
          </CardContent>
        </div>
      </Card>
    );
  }
}

SingleBook.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SingleBook);
