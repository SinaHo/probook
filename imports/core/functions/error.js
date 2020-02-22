import { Meteor } from "meteor/meteor";

export const sendError = (errCode, reason) => {
  if (errCode < 500 && errCode >= 400) {
    throw new Meteor.Error(errCode, reason);
  } else {
    return [errCode, reason];
  }
};
