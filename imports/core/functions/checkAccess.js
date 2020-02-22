import { Meteor } from "meteor/meteor";

const accessList = {
  "users.editAdmins": {
    access: ["editAdmins"],
    isAdmin: true,
    isOwner: true
  },

  aboutUs: {
    access: ["aboutUs"],
    isAdmin: true
  },

  dashboard: {
    access: ["dashboard"],
    isAdmin: true
  },
  users: {
    access: ["users"],
    isAdmin: true
  },
  stories: {
    access: ["stories"],
    isAdmin: true
  },
  genres: {
    access: ["genres"],
    isAdmin: true
  },
  crm: {
    access: ["crm"],
    isAdmin: true
  },
  writeBook: {
    access: ["writeBook"]
  }
};

const checkAccess = access => {
  if (!Meteor.userId()) return false;
  if (!Meteor.user().profile) return null;
  let profile = Meteor.user().profile;
 
  if (
    (accessList[access].isAdmin && !profile.isAdmin) ||
    (accessList[access].isOwner && !profile.isOwner)
  )
    return false;
  let hasAccess = true;
  accessList[access].access.forEach(item => {
    if (!profile.accesslist.includes(item)) hasAccess = false;
  });
  return hasAccess;
};

export default checkAccess;
