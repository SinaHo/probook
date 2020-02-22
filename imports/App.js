import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import Root from "../imports/routes/Root";
import progel from "./core/progel";
import CustomSnackBar from "./modules/customs/customSnackBar/CustomSnackBar";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <CustomSnackBar
          ref={progel.snackbarRef}
          vertical="top"
          horizontal="center"
        />
        <CssBaseline />
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </div>
    );
  }
}
