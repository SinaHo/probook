import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withTracker } from "meteor/react-meteor-data";

import { bookData } from "../../../admin/books/api/BookData";
import SingleBook from "../../singlebook/SingleBook";
import progel from "../../../../../core/progel";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    Session.set("limitSearch", 10);
  }
  showMore = () => {
    Session.set("limitSearch", Session.get("limitSearch") + 10);
  };
  render() {
    return (
      <Grid container justify="space-evenly">
        {!!this.props.books
          ? this.props.books.map((item, index) => {
              return (
                <Grid item xs={11} lg={5} key={index} style={{ marginTop: 15 }}>
                  <SingleBook
                    bookname={item.title}
                    summary={item.summary}
                    writer={item.creatorUsername}
                    genres={item.genres}
                  />
                </Grid>
              );
            })
          : null}
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center", margin: 30 }}
          onClick={this.showMore}
        >
          Show more ...
        </Grid>
      </Grid>
    );
  }
}

export default withTracker(props => {
  let limit = Session.get("limitSearch");
  let subObj = Meteor.subscribe(
    "books.search",
    props.match.params.keyword,
    limit
  );
  let books = bookData.find({}).fetch();
  console.log(books);
  return { books, subObj };
})(SearchResult);
