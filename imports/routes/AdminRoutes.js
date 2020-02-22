import React from "react";
import { BrowserRouter, Router, Route, Link, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import { withTracker } from "meteor/react-meteor-data";
import { Redirect } from "react-router-dom";
import Genre from "../modules/components/admin/genres/ui/Genre";
import AboutUs from "../modules/components/admin/aboutUs/ui/AboutUs";
import AdminLogin from "../modules/components/admin/adminlogin/AdminLogin";
import AdminDashSwitch from "./AdminDashSwitch";
import AdminDrawer from "../modules/components/admin/adminDrawer/AdminDrawer";
class Admin extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={this.props.match.path} component={AdminLogin} />
        <Route
          path={this.props.match.path + "/dashboard"}
          render={() => {
            if (!Meteor.userId()) {
              this.props.history.push("/admin");
              return null;
            }
            if (this.props.users[0] == undefined) {
              return null;
            }
            if (Meteor.userId() && this.props.users[0].profile.isAdmin) {
              return <AdminDrawer AdminSwitch={AdminDashSwitch} />;
            } else {
              return <Redirect to="/admin" />;
            }
          }}
        />
      </Switch>
    );
  }
}

Admin = withTracker(props => {
  let users = Meteor.users.find({ _id: Meteor.userId() }).fetch();
  return { users };
})(Admin);
export default withRouter(Admin);
