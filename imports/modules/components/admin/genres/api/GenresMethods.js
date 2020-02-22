import { Meteor } from "meteor/meteor";
import { GenresData } from "./GenresData";
import progel from "../../../../../core/progel";

if (Meteor.isServer) {
  Meteor.methods({
    "genre.Insert"(name) {
      if (!progel.checkAccess("genres"))
        throw new Meteor.Error(
          401,
          "You don't have access for requested action"
        );
      try {
        GenresData.insert({
          name: name,
          bookCount: 0,
          clicked: 0
        });
        return { message: "Genre added successfully", variant: "success" };
      } catch (e) {
        return { message: e.reason, variant: "error" };
      }
    },
    "genre.Delete"(name) {
      if (!progel.checkAccess("genres"))
        throw new Meteor.Error(
          401,
          "You don't have access for requested action"
        );
      try {
        GenresData.remove({
          name: name
        });
        return { message: "Genre removed successfully", variant: "success" };
      } catch (e) {
        return { message: e.reason, variant: "error" };
      }
    },
    "genre.clicked"(name) {
      if (!progel.checkAccess("genres"))
        throw new Meteor.Error(
          401,
          "You don't have access for requested action"
        );
      try {
        GenresData.update(
          {
            _id: name
          },
          {
            $inc: { clicked: 1 }
          }
        );

        return { message: "Genre Click recorded", variant: "success" };
      } catch (e) {
        return { message: e.reason, variant: "error" };
      }
    }
  });
}
