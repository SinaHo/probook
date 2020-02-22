import React from "react";
import error from "./functions/error";
import checkAccess from "./functions/checkAccess";
import intervals from "./functions/intervals";
import security from "./functions/security";
import extensions from "./functions/extensions";
class Progel {
  constructor() {
    this.snackbarRef = React.createRef();
  }
  checkAccess = checkAccess;
  intervals = intervals;
  security = security;
  extensions = extensions;
  colors = {
    primary: "#fcb74d",
    secondary: "#1a237e",
    error: "#e6696a",
    warning: "#f9ef5d",
    ok: "#49b048",
    hover: "#b39ddb",
    background: "#ede7f6",
    neutral: "#616161",
    userdrawer: "#1c4e80",
    drawerTextColor: "#fff",
    userSecondary: "#1c4e80"
  };
  $c = this.colors;
  msg = (message, variant) => {
    if (this.snackbarRef.current === undefined) {
      alert(message);
      return;
    }
    this.snackbarRef.current.show(message, variant);
  };
}
let progel = new Progel();
this.Progel = progel;
export default progel;
