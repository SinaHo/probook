import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { bookgenredata } from "./../api/BookGenreData";
import { withTracker } from "meteor/react-meteor-data";
import BookItem from './../../books/ui/bookItem'
class Books extends Component {
    render() {
        const { params } = this.props.match;
        return (
            <Grid container justify="center">
                
                <Grid container md={10} justify="flex-start" spacing={32}>

                    {this.props.BookList && this.props.BookList.map((item) => {
                        return (<BookItem book={item.bookId} returnforgenre={"1"}/>)
                    })}
                </Grid>
                </Grid>
                
            ); 
        
        
    }
}
 Books = withTracker(props => {
  Meteor.subscribe("bookgenre");
  return {
      BookList: bookgenredata.find({ name: props.match.params.id }).fetch()
  };
})(Books); 
export default Books;
/* {this.props.BookList &&
         this.props.BookList.map(item => {
           return (
             <BookItem bookId={item.book_id} />
           )
         })} */
         //this component return book id that genres is selected