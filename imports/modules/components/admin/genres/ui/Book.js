import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { GenresData } from "./../api/GenresData";
import { withTracker } from "meteor/react-meteor-data";

class Books extends Component {
  render() {
    const { params } = this.props.match;
    return (
      <Grid container justify="center">
        {this.props.BookList &&
          this.props.BookList.map(item => {
            return <BookItem bookId={item.book_id} />;
          })}
      </Grid>
    );
  }
}
Books = withTracker(props => {
  Meteor.subscribe("bookgenre");
  return {
    BookList: bookgenredata.find({ _id: props.match.params.id }).fetch(),
  };
})(Books);
export default Books;
