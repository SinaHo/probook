import { Meteor } from "meteor/meteor";
import { AboutUsData, AboutUsLogs } from "./AboutUsData";
import progel from "../../../../../core/progel";

if (Meteor.isServer) {
  Meteor.methods({
    "AboutUs.insert"() {
      if (AboutUsData.findOne() == undefined) {
        AboutUsData.insert({
          text: "",
          phone: "",
          email: "",
          data: "",
          location: ""
        });
        return { message: "About us set successfully", variant: "success" };
      }
      return { message: "About us has been already set", variant: "warning" };
    },
    "AboutUs.update"(text, phone, email, data, location, username) {
      if (!progel.checkAccess("aboutUs"))
        throw new Meteor.Error(
          401,
          "You don't have access for requested action"
        );
      try {
        // let date = new Date();
        // date =
        //   date.getFullYear() +
        //   "/" +
        //   date.getMonth() +
        //   "/" +
        //   date.getDate() +
        //   " - " +
        //   (date.getHours() < 10 ? "0" : "") +
        //   date.getHours() +
        //   ":" +
        //   (date.getMinutes() < 10 ? "0" : "") +
        //   date.getMinutes();

        // AboutUsLogs.insert({ username, date });

        // if (AboutUsData.find() == undefined) {
        //   AboutUsData.insert({
        //     text: "",
        //     phone: "",
        //     email: "",
        //     data: "",
        //     location: ""
        //   });
        // }

        AboutUsData.update(
          {},
          {
            $set: {
              text,
              phone,
              email,
              data,
              location
            }
          },
          { upsert: true }
        );
        return { message: "About us updated successfully", variant: "success" };
      } catch (e) {
        console.log(e);
      }
    }
  });
}
