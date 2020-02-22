import { Meteor } from "meteor/meteor";
import { RLData } from "./ReadingListData";
import { bookData } from "../../../admin/books/api/BookData";
import progel from "../../../../../core/progel";

Meteor.methods({
  "readingList.toggleReadStatus"(bookId, episodeIndex) {
    let unread = RLData.find({ bookId, userId: Meteor.userId() }).fetch()[0]
      .unread;
    let i = -1;
    unread.forEach((elem, index) => {
      if (elem == episodeIndex) {
        i = index;
      }
    });
    if (i != -1) {
      unread.splice(i, 1);
      RLData.update({ bookId, userId: Meteor.userId() }, { $set: { unread } });
    } else {
      unread.push(episodeIndex);
      RLData.update({ bookId, userId: Meteor.userId() }, { $set: { unread } });
    }
  },

  "readingList.addToReadingList"(bookId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("403", "you are not logged in");
    }
    if (RLData.find({ bookId }).fetch()[0]) {
      return { message: "Book is already added ", variant: "warning" };
    }
    let book = bookData.find({ _id: bookId }).fetch()[0];
    let unread = [];
    for (i = 0; i < book.episodes.length; i++) {
      unread.push(i + 1);
    }
    RLData.insert({
      bookId,
      userId: Meteor.userId(),
      title: book.title,
      summary: book.summary,
      genres: book.genres,
      creationDate: book.creationDate,
      creatorUsername: book.creatorUsername,
      rate: 0,
      unread
    });
    return { message: "Book Added successfully", variant: "success" };
  },

  "readingList.removeFromReadingList"(bookId) {
    try {
      RLData.remove({
        userId: Meteor.userId(),
        bookId
      });
      return { message: "Book removed successfully", variant: "success" };
    } catch (e) {
      return { message: e.reason, variant: "error" };
    }
  }
});
