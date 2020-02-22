import { Meteor } from "meteor/meteor";
import { AboutUsData } from "./AboutUsData";

if (Meteor.isServer) {
  Meteor.publish("aboutUs", () => {
    let aboutWeb = AboutUsData.find({});

    return aboutWeb;
  });
}
