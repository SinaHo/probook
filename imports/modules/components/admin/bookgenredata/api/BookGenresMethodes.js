import { Meteor } from "meteor/meteor";
import { bookgenredata } from "./BookGenreData";
import progel from "../../../../../core/progel";

if (Meteor.isServer) {
  Meteor.methods({
    bookgenreadd(name) {
      try {
        bookgenredata.insert({
          name: "name"
        });
      } catch (e) {
        throw new Meteor.Error(400, e.reason);
      }
    }
  });
}
