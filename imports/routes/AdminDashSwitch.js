import { Meteor } from "meteor/meteor";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import Books from "./../../imports/modules/components/admin/bookgenredata/ui/bookgenre";
import Genre from "../modules/components/admin/genres/ui/Genre";
import AboutUs from "../modules/components/admin/aboutUs/ui/AboutUs";
import Users from "../modules/components/admin/users/ui/Users";
import Crm from "../modules/components/admin/crm/ui/Crm";
import Stories from "../modules/components/admin/stories/ui/Stories";
import NotAllowed from "../modules/components/admin/notAllowed/NotAllowed";
import AdminDashboard from "../modules/components/admin/adminDashboard/ui/AdminDashboard";
// import AdminDrawer from "../modules/components/adminDrawer/AdminDrawer";
import AdminManagement from "../modules/components/admin/adminmanagement/ui/AdminManagement";
import progel from "../core/progel";
import BookItem from "./../modules/components/admin/books/ui/bookItem";
import { Conversation } from "../modules/components/admin/crm/ui/Conversation";

class AdminDashSwitch extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={this.props.match.path}
          render={() => {
            if (progel.checkAccess("dashboard")) {
              return <AdminDashboard />;
            } else {
              this.props.history.push(this.props.match.path + "/notAllowed");
            }
          }}
        />

        <Route
          path={this.props.match.path + "/admin-management"}
          render={() => {
            if (progel.checkAccess("users.editAdmins")) {
              return <AdminManagement />;
            } else {
              this.props.history.push(this.props.match.path + "/notAllowed");
            }
          }}
        />

        <Route
          path={this.props.match.path + "/users"}
          render={() => {
            if (progel.checkAccess("users")) {
              return <Users />;
            } else {
              this.props.history.push(this.props.match.path + "/notAllowed");
            }
          }}
        />

        <Route
          path={this.props.match.path + "/stories"}
          render={() => {
            if (progel.checkAccess("stories")) {
              return <Stories />;
            } else {
              this.props.history.push(this.props.match.path + "/notAllowed");
            }
          }}
        />

        <Route
          exact
          path={this.props.match.path + "/genre"}
          render={() => {
            if (progel.checkAccess("genres")) {
              return <Genre />;
            } else {
              this.props.history.push(this.props.match.path + "/notAllowed");
            }
          }}
        />
        <Route
          exact
          path={this.props.match.path + "/crm"}
          render={() => {
            if (progel.checkAccess("crm")) {
              return <Crm />;
            } else {
              this.props.history.push(this.props.match.path + "/notAllowed");
            }
          }}
        />

        <Route
          path={this.props.match.path + "/crm/:id"}
          component={Conversation}
        />

        <Route
          path={this.props.match.path + "/about-web"}
          render={() => {
            if (progel.checkAccess("aboutUs")) {
              return <AboutUs />;
            } else {
              this.props.history.push(this.props.match.path + "/notAllowed");
            }
          }}
        />
        <Route path={this.props.match.path + "/genre/:id"} component={Books} />
        <Route
          path={this.props.match.path + "/notAllowed"}
          component={NotAllowed}
        />
      </Switch>
    );
    // }
  }
}

export default withRouter(AdminDashSwitch);
