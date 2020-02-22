import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import progel from "../../../../../core/progel";

Meteor.methods({
  "users.createUser"(username, password, email, data) {
    if (!Meteor.isServer)
      throw new Meteor.Error(400, "This action must be called on server");
    let _id;
    try {
      _id = Accounts.createUser({ username, password, email });
      let date = new Date();
      data.profile.date = date;
      data.readingList = [];
      data.markedBooks = [];
      Meteor.users.update({ _id }, { $set: { ...data } });
    } catch (e) {
      return {
        message: e.reason ? e.reason : "unexpected error",
        variant: "error"
      };
      // throw new Meteor.Error(e.error || 400, e.reason || "Error");
    }
    return { message: "user created", _id };
  },
  "users.editProfile"(fullname, bio) {
    let _id = Meteor.userId();
    if (!_id)
      throw new Meteor.Error(403, "You must login before you apply any change");
    try {
      Meteor.users.update(
        { _id },
        { $set: { "profile.fullname": fullname, "profile.bio": bio } }
      );
    } catch (e) {
      return {
        message: e.reason ? e.reason : "unexpected error",
        variant: "error"
      };
    }
    return { message: "Profile Edited successfully", variant: "success" };
  },
  "users.admins.remove"(_id) {
    if (!progel.checkAccess("users.editAdmins"))
      throw new Meteor.Error(403, "You don't have access for requested action");
    try {
      Meteor.users.remove({ _id });
      return { message: "Admin deleted successfully", variant: "success" };
    } catch (e) {
      throw new Meteor.Error(400, e.reason);
    }
  },

  "users.admins.add"(username, password, email, fullname, accesslist) {
    if (!progel.checkAccess("users.editAdmins"))
      throw new Meteor.Error(403, "You don't have access for requested action");
    let profile = {
      isAdmin: true,
      isOwner: false,
      username,
      fullname,
      accesslist
    };
    try {
      // Accounts.createUser({ username, password, email, profile, messages: [] });
      Meteor.call("users.createUser", username, password, email, {
        profile,
        messages: []
      });
      return { message: "Admin created successfully", variant: "success" };
    } catch (e) {
      throw new Meteor.Error(400, e.reason);
    }
  },

  "users.admins.edit"(username, fullname, accesslist) {
    if (!progel.checkAccess("users.editAdmins"))
      throw new Meteor.Error(403, "You don't have access for requested action");
    Meteor.users.update(
      { username },
      {
        $set: {
          "profile.fullname": fullname,
          "profile.accesslist": accesslist
        }
      }
    );
    return { message: "Admin edited successfully", variant: "success" };
  },
  "users.sendMessage"(
    text,
    isVisibleSince,
    importanceDegree,
    toAdmins,
    toUsers
  ) {
    if (!progel.checkAccess("dashboard"))
      throw new Meteor.Error(403, "You don't have access for requested action");
    let message = {
      text,
      senderName: Meteor.user().profile.fullname || "TEMP NAME",
      isVisibleSince,
      importanceDegree,
      sent: false,
      read: false
    };

    try {
      if (toAdmins && toUsers) {
        Meteor.users
          .rawCollection()
          .updateMany({}, { $push: { messages: message } });
      } else if (toAdmins || toUsers) {
        Meteor.users
          .rawCollection()
          .updateMany(
            { "profile.isAdmin": !!toAdmins },
            { $push: { messages: message } }
          );
      }
    } catch (e) {
      console.log(e);
    }
    return { message: "Your message sent successfully", variant: "success" };
  },
  "users.messages.setAsSeen"(index) {
    let _id = Meteor.userId();
    if (!_id) throw new Meteor.Error(403, "User not logged in");
    if (typeof index !== "number")
      throw new Meteor.Error(401, "Incorrect data");
    let messages = Meteor.users.find({ _id }).fetch()[0].messages;
    console.log(messages);
    messages[index].read = true;
    Meteor.users.update({ _id }, { $set: { messages } });
    return { message: "Message set as seen", variant: "success" };
  }
});
