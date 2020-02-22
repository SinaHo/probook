import React from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import Admin from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import UserDrawer from "../modules/components/user/userdrawer/UserDrawer";
import SignUp from "../modules/components/user/signup/ui/Signup";
import Login from "../modules/components/user/signup/ui/Login";
import AutoComplete from "./../modules/components/user/writeBook/ui/AutoComplete";
class Root extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            if (Meteor.userId()) {
              document.title = "ProBook | User";
              this.props.history.push("/user");
            } else {
              return <Login />;
            }
          }}
        />
        <Route
          path="/signup"
          render={() => {
            if (Meteor.userId()) {
              document.title = "ProBook | User";
              this.props.history.push("/user");
            } else {
              return <SignUp />;
            }
          }}
        />
        <Route
          path="/user"
          render={() => {
            if (Meteor.userId()) {
              document.title = "ProBook | User";
              return <UserDrawer UserSwitch={UserRoutes} />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          path="/admin"
          render={() => {
            document.title = "ProBook | Admin";
            return <Admin />;
          }}
        />
      </Switch>
    );
  }
}

export default withRouter(Root);
