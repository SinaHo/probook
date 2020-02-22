import { Meteor } from "meteor/meteor";
import progel from "../imports/core/progel";

import "../imports/modules/components/admin/genres/api/GenresApi";
import "../imports/modules/components/admin/books/api/BookApi";
import "../imports/modules/components/admin/aboutUs/api/AboutUsApi";
import "../imports/modules/components/admin/adminmanagement/api/userApi";
import "../imports/modules/components/admin/bookgenredata/api/BookGenreApi";
import "../imports/modules/components/admin/aboutUs/api/AboutUsApi";
import "../imports/modules/components/admin/adminmanagement/api/userApi";
import "../imports/modules/components/admin/crm/api/CrmApi";
import "../imports/modules/components/user/home/api/ReadingListApi";
Meteor.startup(() => {
  progel.intervals();
  progel.security();
  progel.extensions();

  Meteor.call("users.createUser", "owner", "owner", "owner@example.com", {
    profile: {
      accesslist: ["editAdmins"],
      isAdmin: true,
      isOwner: true,
      accesslist: [
        "editAdmins",
        "dashboard",
        "users",
        "stories",
        "genres",
        "crm",
        "aboutUs",
        "writeBook"
      ],
      fullname: "Owner OwnerManesh"
    },
    messages: []
  });
  Meteor.call("users.createUser", "user", "user", "user@example.com", {
    profile: {
      isAdmin: false,
      isOwner: false,
      accesslist: ["writeBook"],
      fullname: "User UserManesh"
    },
    messages: []
  });
});
