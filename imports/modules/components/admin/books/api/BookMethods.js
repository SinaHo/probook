import { Meteor } from "meteor/meteor";
import { bookData as Books } from "./BookData";
import progel from "../../../../../core/progel";

Meteor.methods({
  "books.submitNewBook"(title, summary, genres) {
    if (!progel.checkAccess("writeBook"))
      throw new Meteor.Error(403, "You don't have access for requested action");
    let newBook = {
      title,
      summary,
      genres,
      creationDate: new Date().getTime(),
      lastUpdate: new Date().getTime(),
      creatorId: Meteor.userId(),
      creatorUsername: Meteor.user() ? Meteor.user().username : "",
      readers: [],
      rates: 0,
      episodeCount: 0,
      episodes: []
    };
    Books.insert(newBook);
    return { message: "Book created successfully", variant: "success" };
  },
  "books.submitNewEpisode"(_id, title, text) {
    if (!progel.checkAccess("writeBook"))
      throw new Meteor.Error(403, "You don't have access for requested action");

    let book = Books.find({ _id }).fetch()[0];
    let newEpisode = {
      title,
      text
    };

    if (book.creatorId !== Meteor.userId()) {
      throw new Meteor.Error(403, "You are not the writer of this book");
    }
    Books.update(
      { _id },
      {
        $push: { episodes: newEpisode },
        $set: { lastUpdate: new Date().getTime() }
      }
    );

    Meteor.users.find({ _id: { $in: book.reader } }).forEach(doc => {
      let userId = doc._id;
      let readingList = doc.readingList;
      let i = -1;
      readingList.forEach((elem, index) => {
        if (elem.bookId === _id) i = index;
      });
      readingList[i].episodeList.push(false);
      Meteor.users.update({ _id: userId }, { $set: { readingList } });
    });

    return { message: "Episode Added successfully", variant: "success" };
  },
  "books.removeBook"(_id) {
    if (!progel.checkAccess("writeBook"))
      throw new Meteor.Error(403, "You don't have access for requested action");
    let book = Books.find({ _id }).fetch()[0];
    if (book.creatorId !== Meteor.userId()) {
      throw new Meteor.Error(
        403,
        "You are not a participant of this conversation"
      );
    }
    Books.remove({ _id });
    return { message: "Book removed successfully", variant: "success" };
  },
  "books.removeEpisode"(_id, episodeIndex) {
    progel.msg("Remove episode is disabled", "warning");
    throw new Meteor.Error("Remove episode is disabled");
    if (!progel.checkAccess("writeBook"))
      throw new Meteor.Error(403, "You don't have access for requested action");
    let book = Books.find({ _id }).fetch()[0];
    if (book.creatorId !== Meteor.userId()) {
      throw new Meteor.Error(
        403,
        "You are not a participant of this conversation"
      );
    }
    let index = `episodes.${episodeIndex}`;
    Books.update({}, { $unset: { [index]: 1 } });
    Books.update({}, { $pull: { episodes: null } });
    return {
      message: "Episode successfully removed from book ",
      variant: "success"
    };
  },
  "books.editEpisodes"(_id, episodeIndex, title, text) {
    if (!progel.checkAccess("writeBook"))
      throw new Meteor.Error(403, "You don't have access for requested action");
    let book = Books.find({ _id }).fetch()[0];
    if (book.creatorId !== Meteor.userId()) {
      throw new Meteor.Error(
        403,
        "You are not a participant of this conversation"
      );
    }
    let editEpisode = {
      title,
      text
    };
    let index = `episodes.${episodeIndex}`;
    Books.update({ _id }, { $set: { [index]: editEpisode } });
    return { message: "Episode edited successfully", variant: "success" };
  },
  "books.editBook"(_id, title, summary) {
    if (!progel.checkAccess("writeBook"))
      throw new Meteor.Error(403, "You don't have access for requested action");
    let book = Books.find({ _id }).fetch()[0];
    if (book.creatorId !== Meteor.userId()) {
      throw new Meteor.Error(
        403,
        "You are not a participant of this conversation"
      );
    }
    if (!summary) {
      summary = book.summary;
    }
    if (!title) {
      title = book.title;
    }
    Books.update({ _id }, { $set: { title, summary } });
    return { message: "Book edited successfully", variant: "success" };
  },
  "user.readingListUpdate"() {
    let readingList = [];
    let user = Meteor.user();
    user.readingList.map(Rl => {
      let bookid = Rl.bookId;
      let book = Books.find({ _id: bookid }).fetch()[0];
      let bookLastEpisode = book.episodeCount;
      let episodesNum = [];
      for (let i = 1; i <= bookLastEpisode; i++) {
        episodesNum.push(i);
      }
      readingList.push({ bookId: bookid, bookEpisode: episodesNum });

      Meteor.users.update(
        { _id: Meteor.userId() },
        { $set: { readingList: readingList } }
      );
      console.log(readingList);
    });
  },
  "books.addToReadingList"(bookId, episodeCount) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, "You are not logged in");
    }

    let user = Meteor.users.find({ _id: Meteor.userId() }).fetch()[0];
    let readingList = user.readingList;

    if (
      !!readingList &&
      readingList.filter(e => e.bookId === bookId).length > 0
    ) {
      throw new Meteor.Error(403, "Book already added");
    } else {
      let episodeList = [];
      for (i = 0; i < episodeCount; i++) {
        episodeList.push[false];
      }
      let readingList = { bookId, episodeList };
      Meteor.users.update(
        { _id: Meteor.userId() },
        { $push: { readingList: readingList } }
      );
    }
  }
});
