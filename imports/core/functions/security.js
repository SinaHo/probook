import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

const security = () => {
  Meteor.users.deny({
    insert() {
      return true;
    },
    update() {
      return true;
    },
    remove() {
      return true;
    }
  });
  Accounts.config({
    forbidClientAccountCreation: true
  });
};

export default security;
