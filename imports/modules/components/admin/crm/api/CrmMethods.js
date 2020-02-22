import { Meteor } from "meteor/meteor";
import { Crm } from "./CrmData";
import progel from "../../../../../core/progel";

if (Meteor.isServer) {
  Meteor.methods({
    "crm.submitNewCrm"(title, priority, description) {
      if (!Meteor.userId() || Meteor.user().profile.isAdmin)
        throw new Meteor.Error(
          403,
          "You don't have access for requested action"
        );
      let newCrm = {
        title,
        creationDate: new Date().getTime(),
        status: "pending",
        priority,
        description,
        creatorId: Meteor.userId(),
        creatorName: Meteor.user().profile.fullname
          ? Meteor.user().profile.fullname
          : "",
        assignedAdminId: "",
        messages: []
      };
      try {
        Crm.insert(newCrm);
        return { message: "Compliment Submited", variant: "success" };
      } catch (e) {
        return { message: e.reason, variant: "error" };
      }
    },
    "crm.setTopicAsAnswered"(_id) {
      if (!progel.checkAccess("crm"))
        throw new Meteor.Error(
          403,
          "You don't have access for requested action"
        );
      let crm = Crm.find({ _id }).fetch()[0];
      if (crm.status === "pending") {
        try {
          Crm.update(
            { _id },
            { $set: { status: "answered", assignedAdminId: Meteor.userId() } }
          );
          return {
            message:
              "Compliment is now marked as answered and your ID assigned as adminId",
            variant: "success"
          };
        } catch (e) {
          return { message: e.reason, variant: "error" };
        }
      } else {
        return {
          message: "You can only set pending compliments as answered",
          variant: "warning"
        };
      }
    },
    "crm.sendMessage"(_id, text) {
      if (!text || !_id || typeof text !== "string" || typeof _id !== "string")
        throw new Meteor.Error(400, "Invalid data");
      let crm = Crm.find({ _id }).fetch()[0];
      let userId = Meteor.userId();
      if (!userId)
        throw new Meteor.Error(
          403,
          "You don't have access for requested action"
        );
      let fullname = Meteor.user().profile.fullname;
      let side = "";
      if (userId === crm.creatorId) {
        side = "user";
      } else if (userId === crm.assignedAdminId) {
        side = "admin";
      } else {
        throw new Meteor.Error(
          403,
          "You are not a participant of this conversation"
        );
      }
      if (crm.status !== "answered")
        throw new Meteor.Error(
          400,
          "Topic status must be answered in order to send message"
        );
      let message = {
        date: new Date().getTime(),
        text,
        side,
        senderId: userId,
        senderName: fullname
      };
      try {
        Crm.update({ _id }, { $push: { messages: message } });
        return { message: "Message sent successfully", variant: "success" };
      } catch (e) {
        return { message: e.reason, variant: "error" };
      }
    },
    "crm.setAsSolved"(_id) {
      let userId = Meteor.userId();
      if (!userId)
        throw new Meteor.Error(
          403,
          "You don't have access for requested action"
        );
      let user = Meteor.user();
      if (user.profile.isAdmin)
        throw new Meteor.Error(
          403,
          "You as an admin are not supposed to set topic as solved"
        );
      let crm = Crm.find({ _id }).fetch()[0];
      if (crm.status !== "answered")
        throw new Meteor.Error(401, "You can't set a not open topic as solved");
      if (crm.creatorId !== userId)
        return {
          message: "Only first signer of compliment can set it as solved",
          variant: "error"
        };
      try {
        Crm.update({ _id }, { $set: { status: "solved" } });
        return { message: "Compliment is set as solved", variant: "success" };
      } catch (e) {
        return { message: e.reason, variant: "error" };
      }
    },
    "crm.setAsClosed"(_id) {
      let userId = Meteor.userId();
      if (!userId)
        throw new Meteor.Error(
          403,
          "You don't have access for requested action"
        );
      let user = Meteor.user();
      if (!user.profile.isAdmin)
        throw new Meteor.Error(
          403,
          "You as a user are not supposed to set topic as closed"
        );
      let crm = Crm.find({ _id }).fetch()[0];
      if (crm.assignedAdminId !== userId)
        return {
          message: "Only assigned admin of compliment can set it as closed",
          variant: "error"
        };
      try {
        Crm.update({ _id }, { $set: { status: "closed" } });
        return { message: "Compliment is set as closed", variant: "success" };
      } catch (e) {
        return { message: e.reason, variant: "error" };
      }
    }
  });
}
