import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { GenresData } from "./../api/GenresData";
import {
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import SimpleCard from "./newCard";
import progel from "../../../../../core/progel";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  deleteIcon: {
    margiLeft: 15
  },
  Typography: {
    fontSize: 30
  },
  dialog: {
    width: 400
  }
});

let GenreText = [];

class Genre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      open: false,
      genre: "",
      book: [],
      addGenreModalOpen: false,
      name: "",
      genrename: ""
    };
  }

  handleChange = e => {
    this.setState({ genrename: e.target.value });
  };
  insertgenre(genre) {
    // Meteor.call('genre.Insert', "text", (err, res) => console.log(err));
    /* if (this.props.GenresList.GenreText.includes("text")) {
            console.log("textttt")
        } */
    if (!/\S/.test(genre) || !genre.match(/^[a-zA-Z-_]+$/)) {
      alert("empty or not alphabetic");
    } else if (GenreText.includes(genre)) {
      alert("already exists");
    } else {
      Meteor.call("genre.Insert", genre, (err, res) => {
        if (res) progel.msg(res.message, res.variant);
        if (err) progel.msg(err.message, "error");
      });
    }
    this.canselAddGenre();
  }
  canselAddGenre = () => {
    this.setState({
      genrename: "",
      addGenreModalOpen: false
    });
  };

  renderAddGenreDialog = props => {
    const { classes } = this.props;

    return (
      <Dialog
        id="addAdminAlert"
        open={this.state.addGenreModalOpen}
        onClose={this.canselAddGenre}
      >
        <DialogTitle
          className={classes.dialog}
          id="addAdminTitle"
          style={{ backgroundColor: progel.$c.primary }}
        >
          Add Genre
        </DialogTitle>
        <DialogContent>
          <Grid container justify="space-around">
            <Grid item xs={11}>
              <TextField
                label="Genre Name"
                value={this.state.genrename}
                onChange={this.handleChange}
                style={{ margin: "15px 0" }}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={9} />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.canselAddGenre} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              this.insertgenre(this.state.genrename);
            }}
            color="primary"
            autoFocus
          >
            Add Genre
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  addGenreButton = () => {
    return (
      <Tooltip
        title="Add"
        aria-label="Add"
        placement="right"
        style={{
          position: "fixed",
          bottom: 10,
          right: 20
        }}
      >
        <Avatar
          color="primary"
          onClick={() => {
            this.setState({ addGenreModalOpen: true });
          }}
          src={"./../../../../img/add128.png"}
        />
      </Tooltip>
    );
  };
  render() {
    const { classes } = this.props;

    if (!this.props.GenresList || this.props.GenresList.length === 0) {
      return (
        <Grid container justify="center">
          <Grid item>
            <Typography className={classes.Typography}>
              No Genres Found{" "}
            </Typography>
          </Grid>

          {this.addGenreButton()}
          {this.renderAddGenreDialog()}
        </Grid>
      );
    }
    GenreText = [];
    this.props.GenresList.map(post => {
      GenreText.push(post.name);
    });
    return (
      <Grid container>
        {this.addGenreButton()}
        {this.renderAddGenreDialog()}

        <Grid container justify="space-evenly">
          {this.props.GenresList &&
            this.props.GenresList.map((Genre, i) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={4}
                  xl={3}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <SimpleCard
                    Genre={Genre}
                    GenreName={Genre.name}
                    GenreLength={Genre.bookCount}
                    key={i}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    );
  }
}

Genre = withTracker(() => {
  Meteor.subscribe("GenrePublish");
  return { GenresList: GenresData.find({}).fetch() };
})(Genre);
export default withStyles(styles)(Genre);
