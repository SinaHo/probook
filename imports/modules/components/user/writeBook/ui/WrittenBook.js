import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Checkbox from "@material-ui/core/Checkbox";
import progel from "../../../../../core/progel";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import SingleBook from "./../../singlebook/SingleBook";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import { bookData } from "./../../../admin/books/api/BookData";
import { CardStyle } from "./CardStyle";
import AutoComplete from "./AutoComplete";

const suggestions = [
  { label: "action" },
  { label: "adventure" },
  { label: "anime" },
  { label: "fanfiction" },
  { label: "fantasy" },
  { label: "generalFiction" },
  { label: "historicalFicton" },
  { label: "horror" },
  { label: "imagines" },
  { label: "mystery" },
  { label: "nonFiction" },
  { label: "poetry" },
  { label: "random" },
  { label: "romance" },
  { label: "teenFiction" },
  { label: "vampire" },
  { label: "wereWolf" }
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label
}));

// -------------------------------------------------------------------------------------------

class CreateBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      summary: "",
      createBookModalOpen: false,
      genres: [],
      genreCheckList: {
        action: false,
        adventure: false,
        anime: false,
        fanfiction: false,
        fantasy: false,
        generalFiction: false,
        historicalFicton: false,
        horror: false,
        humor: false,
        imagines: false,
        mystery: false,
        nonFiction: false,
        poetry: false,
        random: false,
        teenFiction: false,
        vampire: false,
        wereWolf: false
      }
    };
  }
  genres = [
    "action",
    "adventure",
    "anime",
    "fanfiction",
    "fantasy",
    "generalFiction",
    "historicalFicton",
    "horror",
    "humor",
    "imagines",
    "mystery",
    "mystery",
    "nonFiction",
    "poetry",
    "random",
    "teenFiction",
    "vampire",
    "wereWolf"
  ];

  // -------------------------------------------------------------------------------------------

  cancelCreateBookModal = () => {
    this.setState({
      createBookModalOpen: false,
      title: "",
      summary: "",
      genres: [],

      genreCheckList: {
        action: false,
        adventure: false,
        anime: false,
        fanfiction: false,
        fantasy: false,
        generalFiction: false,
        historicalFicton: false,
        horror: false,
        humor: false,
        imagines: false,
        mystery: false,
        nonFiction: false,
        poetry: false,
        random: false,
        teenFiction: false,
        vampire: false,
        wereWolf: false
      }
    });
  };

  // -------------------------------------------------------------------------------------------

  confirmCreateBook = () => {
    if (this.state.title == "" || this.state.summary == "") {
      console.log(progel.msg);
      progel.msg("Fill the blanks ", "warning");
      return;
    }

    Meteor.call(
      "books.submitNewBook",
      this.state.title,
      this.state.summary,
      this.state.genres,
      (err, res) => {
        if (res) progel.msg(res.message, res.variant);
        if (err) progel.msg(err.message, "error");
      }
    );
    this.cancelCreateBookModal();
  };

  // -------------------------------------------------------------------------------------------

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  // --------------------------------------------------

  handleCheck = e => {
    let genreCheckList = this.state.genreCheckList;
    genreCheckList[e.target.id] = !genreCheckList[e.target.id];
    this.setState({
      genreCheckList
    });
  };

  // -------------------------------------------------------------------------------------------

  renderNoBookFound = () => {
    return (
      <div style={{ fontSize: 30, fontFamily: "atyla" }}>
        You have not yet written a book {this.createBook()}
      </div>
    );
  };

  // -------------------------------------------------------------------------------------------

  renderCreateBookModal = () => {
    const { classes, theme } = this.props;
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        }
      })
    };

    return (
      <Dialog
        id="createBook"
        open={this.state.createBookModalOpen}
        onClose={this.cancelCreateBook}
        aria-labelledby="createBookTitle"
        aria-describedby="createBookDescription"
      >
        <DialogTitle
          id="sendMessageTitle"
          style={{ backgroundColor: progel.$c.userdrawer }}
        >
          Create New Book
        </DialogTitle>
        {/* // -------------------------------------------------- */}
        <DialogContent>
          <Grid container justify="space-around">
            <Grid item xs={11}>
              {/* // -------------------------------------------------- */}
              <TextField
                label="title"
                id="title"
                value={this.state.title}
                onChange={this.handleChange}
                style={{ margin: "15px 0" }}
                required
                fullWidth
              />
              {/* // -------------------------------------------------- */}
              <TextField
                id="summary"
                style={{ margin: 5 }}
                placeholder="summary"
                value={this.state.summary}
                onChange={this.handleChange}
                helperText="give a short summary :)"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            {/* // -------------------------------------------------- */}
            <Grid item xs={9} className={classes.divider}>
              <AutoComplete
                data={suggestions}
                valueKey="label"
                resValue={value =>
                  this.setState({ genres: value.map(el => el.value) })
                }
              />
            </Grid>
            {/* // -------------------------------------------------- */}
          </Grid>
        </DialogContent>
        <DialogActions>
          {/* // -------------------------------------------------- */}
          <Button
            variant="outlined"
            onClick={() => {
              this.confirmCreateBook();
            }}
          >
            Save
          </Button>
          {/* // -------------------------------------------------- */}
          <Button
            variant="outlined"
            onClick={() => {
              this.cancelCreateBookModal();
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // -------------------------------------------------------------------------------------------
  createBook = () => {
    return (
      <Grid container justify="space-evenly">
        <Tooltip
          title="Add a book "
          placement="left"
          aria-label="Add"
          style={{
            position: "fixed",
            bottom: 10,
            right: 20
          }}
        >
          <Fab
            color="primary"
            onClick={() => {
              this.setState({ createBookModalOpen: true });
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>

        {this.renderCreateBookModal()}
      </Grid>
    );
  };

  // -------------------------------------------------------------------------------------------

  render() {
    if (!this.props.books || this.props.books.length === 0)
      return this.renderNoBookFound();
    return (
      <Grid container justify="space-evenly">
        {this.props.books.map((element, i) => {
          return (
            <Grid
              item
              md={3}
              key={i}
              style={{ padding: 32 }}
              onClick={() => {
                this.props.history.push(`/user/write/${element._id}/`);
              }}
            >
              <SingleBook
                bookname={element.title}
                writername={element.creatorUsername}
                genres={element.genres}
                summary={element.summary}

                // className={classes.zoomCover}
                // divclassname="zoomCover"
                // genres={element.genreCheckList}
              />
            </Grid>
          );
        })}
        {this.createBook()}
      </Grid>
    );
  }
}

// -------------------------------------------------------------------------------------------

CreateBook = withTracker(() => {
  Meteor.subscribe("books.getWrittenBooks");
  let books = bookData.find({}).fetch();
  return { books };
})(CreateBook);

export default withStyles(CardStyle)(CreateBook);
