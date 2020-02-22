import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import Search from "@material-ui/icons/Search";
import { bookData } from "../../../admin/books/api/BookData";
import SingleBook from "../../singlebook/SingleBook";
import progel from "../../../../../core/progel";

class SearchBooks extends Component {
  state = {
    keyword: ""
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.keyword !== "") {
      return {
        keyword: prevState.keyword
      };
    } else if (nextProps.keyword !== "") {
      return {
        keyword: nextProps.keyword
      };
    } else {
      return null;
    }
  }
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    return (
      <Grid
        container
        justify="center"
        style={{ marginBottom: 30, marginTop: 10 }}
      >
        <Grid item xs={7} style={{ position: "relative" }}>
          <form
            onSubmit={e => {
              e.preventDefault();
              this.props.history.push(
                "/user/books/search/" + this.state.keyword
              );
            }}
          >
            <TextField
              id="keyword"
              placeholder="Search a book by its name..."
              variant="outlined"
              value={this.state.keyword}
              onChange={this.handleChange}
              style={{ position: "absolute", width: "80%", marginLeft: 70 }}
            />
            <Button
              style={{ marginTop: 10 }}
              onClick={() => {
                this.props.history.push(
                  "/user/books/search/" + this.state.keyword
                );
              }}
            >
              <Search />
            </Button>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(SearchBooks);
