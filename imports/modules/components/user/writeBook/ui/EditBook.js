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

import NoteAdd from "@material-ui/icons/NoteAdd";
import IconButton from "@material-ui/core/IconButton";
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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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
class EditBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booktitle: "",
      booksummary: "",
      show: "false",
    };
  }
  handleEditInputChange = e => {
    this.setState({ [e.target.id]: e.target.value, show: "true" });
  };
  editbook = () => {
    Meteor.call(
      "books.editBook",
      this.props.match.params.id,
      this.state.booktitle,
      this.state.booksummary,

      (err, res) => {
        if (res) progel.msg(res.message, res.variant);
        if (err) progel.msg(err.message, "error");
      }
    );
  };
  getDate = date => {
    date = new Date(date);
    let res = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    return res;
  };
  render() {
    const { classes } = this.props;
    if (!this.props.book) {
      return null;
    }
    return (
      <Grid container justify="center">
        {/* {this.setState({
          booktitle: this.props.book.title,
          booksummary: this.props.book.summary,
        })}
 */}
        <Grid item lg={11}>
          <Grid
            container
            justify="center"
            style={{
              padding: "20px 0",
              backgroundColor: " #f5d70075",
              borderRadius: "2px",
              margin: "0 0 20px 0 ",
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
                  <TextField
                    id="booktitle"
                    variant="outlined"
                    onChange={this.handleEditInputChange}
                    label="book title"
                    defaultValue={this.props.book.title}
                    className={classes.textField}
                    margin="normal"
                  />
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
                  <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    id="booksummary"
                    onChange={this.handleEditInputChange}
                    label="book summary"
                    defaultValue={this.props.book.summary}
                    className={classes.textField}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={2} sm={2} md={2} xs={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() =>
                  this.props.history.push(
                    window.location.pathname + "add-episode"
                  )
                }
              >
                Add New Episode
              </Button>
              {this.state.show == "true" ? (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => this.editbook()}
                >
                  Save Changes
                </Button>
              ) : (
                undefined
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={11} sm={11} md={11} xs={11} justify="center">
          <Grid container spacing={32}>
            {this.props.book.episodes.map((item, index) => {
              return (
                <Grid
                  item
                  lg={3}
                  md={4}
                  xs={12}
                  onClick={() => {
                    this.props.history.push(
                      `/user/write/${
                        this.props.match.params.id
                      }/edit-episode/${index}`
                    );
                  }}
                >
                  <EpisodeItem
                    title={item.title}
                    text={item.text}
                    index={index + 1}
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
  Meteor.subscribe("book.getBook", props.match.params.id);
  let book = bookData.find({}).fetch()[0];
  console.log(book);

  return { book };
})(withStyles(styles)(withRouter(EditBook)));
