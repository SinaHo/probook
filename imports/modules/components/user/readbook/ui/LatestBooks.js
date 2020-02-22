import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router";

import { bookData } from "../../../admin/books/api/BookData";
import SingleBook from "../../singlebook/SingleBook";
import progel from "../../../../../core/progel";
class LatestBooks extends Component {
  constructor(props) {
    super(props);
    Session.set("limitAll", 10);
  }
  showMore = () => {
    Session.set("limitAll", Session.get("limitAll") + 10);
  };
  render() {
    if (this.props.books === undefined || this.props.books === [])
      return <h3>No books found</h3>;
    return (
      <Grid
        container
        justify="space-evenly"
        // style={{ borderBottom: "double 4px " + progel.$c.userdrawer }}
      >
        <Grid
          item
          xs={8}
          style={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "monospace",
            fontSize: 32,
            borderBottom: "double 4px " + progel.$c.userdrawer,
            paddingBottom: 15
          }}
        >
          Latest Updated Books
        </Grid>
        {this.props.books.map((item, index) => {
          return (
            <Grid
              item
              xs={11}
              lg={5}
              key={index}
              style={{ marginTop: 15 }}
              onClick={() => {
                this.props.history.push(`/user/books/${item._id}`);
              }}
            >
              <SingleBook
                bookname={item.title}
                summary={item.summary}
                writer={item.creatorUsername}
                genres={item.genres}
              />
            </Grid>
          );
        })}
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
  let limit = Session.get("limitAll");
  let subObj = Meteor.subscribe("books.getLatest", limit);
  let books = bookData.find({}, { $sort: { lastUpdate: -1 } }).fetch();
  return { books, subObj };
})(withRouter(LatestBooks));
