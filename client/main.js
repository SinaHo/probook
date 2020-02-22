import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";

import "./main.html";
import App from "../imports/App";
import progel from "../imports/core/progel";
Meteor.startup(() => {
  progel.extensions();
  ReactDOM.render(<App />, document.getElementById("root"));
});
