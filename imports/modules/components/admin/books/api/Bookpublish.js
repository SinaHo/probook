import { Meteor } from "meteor/meteor";
import { bookData } from "./BookData";
if (Meteor.isServer) {
  Meteor.publish("books.getWrittenBooks", () => {
    return bookData.find({});
  });

  Meteor.publish("books.getReadingList", () => {
    let RL = Meteor.user().readingList;
    let tempRL = [];
    RL.map(e => tempRL.push(e.bookId));
    console.log(tempRL);
    return bookData.find({ _id: { $in: tempRL } });
  });
  Meteor.publish("books.getLatest", limit => {
    return bookData.find({}, { sort: { lastUpdate: -1 }, limit });
  });
  Meteor.publish("books.search", (keyword, limit) => {
    return bookData.find({ $text: { $search: `"${keyword}"` } });
  });
  Meteor.publish("book.getBook", _id => {
    return bookData.find({ _id: _id });
  });
  Meteor.publish("books.read", () => {
    return bookData.find();
  });
}
