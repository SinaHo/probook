import { Meteor } from "meteor/meteor";
if (Meteor.isServer) {
  Meteor.publish("users.allusers", () => {
    if (!Meteor.userId() || !Meteor.user().profile.isAdmin)
      throw new Meteor.Error(403, "You don't have access for requested data");
    return Meteor.users.find({}, { fields: { services: 0 } });
  });
  Meteor.publish("users.getSelf", () => {
    let _id = Meteor.userId();
    if (!_id)
      throw new Meteor.Error(403, "You don't have access for requested data");
    return Meteor.users.find({ _id }, { fields: { readingList: 1 } });
  });
  Meteor.publish("users", () => {
    let _id = Meteor.userId();
    if (!_id)
      throw new Meteor.Error(403, "You don't have access for requested data");
    return Meteor.users.find({ _id });
  });
}
