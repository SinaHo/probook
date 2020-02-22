import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";

import { bookData } from "../../../admin/books/api/BookData";
import LatestBooks from "./LatestBooks";
import SearchBooks from "./SearchBooks";

class Books extends Component {
  state = {
    limitAll: 10,
    limitSearch: 10,
    keyword: ""
  };

  render() {
    return (
      <div>
        <SearchBooks
          search={keyword => this.setState({ keyword })}
          keyword={this.state.keyword}
          limit={this.state.limitSearch}
          showMore={() =>
            this.setState({ limitSearch: this.state.limitSearch + 10 })
          }
        />
        <LatestBooks
          showMore={() => {
            this.setState({ limitAll: this.state.limitAll + 10 });
          }}
          limit={this.state.limitAll}
        />
      </div>
    );
  }
}

export default Books; /* withTracker(props => {
  Meteor.subscribe("books.getLatest");
  let books = "hello";
  return { books };
}) */
