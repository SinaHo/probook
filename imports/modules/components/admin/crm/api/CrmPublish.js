import { Meteor } from "meteor/meteor";
import { Crm } from "./CrmData";
import progel from "../../../../../core/progel";

if (Meteor.isServer) {
  Meteor.publish("crm.user.getCreateds", () => {
    if (Meteor.user().profile.isAdmin)
      throw new Meteor.Error(403, "You don't have access for requested data");
    return Crm.find({ creatorId: Meteor.userId() });
  });
  Meteor.publish("crm.admin.answeredCrms", () => {
    if (!progel.checkAccess("crm"))
      throw new Meteor.Error(403, "You don't have access for requested data");
    return Crm.find({
      assignedAdminId: Meteor.userId(),
      status: "answered"
    });
  });
  Meteor.publish("crm.admin.pendingCrms", () => {
    if (!progel.checkAccess("crm"))
      throw new Meteor.Error(403, "You don't have access for requested data");
    return Crm.find({ status: "pending" });
  });

  Meteor.publish("crm.admin.closedCrms", () => {
    if (!progel.checkAccess("crm"))
      throw new Meteor.Error(403, "You don't have access for requested data");
    return Crm.find({ status: "closed" });
  });

  Meteor.publish("crm.admin.solvedCrms", () => {
    if (!progel.checkAccess("crm"))
      throw new Meteor.Error(403, "You don't have access for requested data");
    return Crm.find({ status: "solved" });
  });
}
