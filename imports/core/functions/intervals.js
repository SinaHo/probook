import { Meteor } from "meteor/meteor";
const checkMessagesSentStat = () => {
  let users = Meteor.users.find({}).fetch();
  let date = new Date();
  date = date.getTime();
  users.forEach((element, index) => {
    let messages = element.messages;
    if (!messages) return;
    messages.forEach((message, i) => {
      if (message.isVisibleSince < date && !message.sent) {
        message.sent = true;
      }
      Meteor.users.update({ _id: element._id }, { $set: { messages } });
    });
  });
};
const intervals = () => {
  Meteor.setInterval(() => {
    // one minute intervals
    checkMessagesSentStat();
  }, 60 * 1000);
};

export default intervals;
