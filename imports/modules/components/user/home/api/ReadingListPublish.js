import { Meteor } from "meteor/meteor";
import { RLData } from "./ReadingListData";
if (Meteor.isServer) {
  Meteor.publish("readingList", () => {
    return RLData.find({ userId: Meteor.userId() });
  });
}
