import React from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";

import Home from "../modules/components/user/home/Home";
import EditProfile from "../modules/components/user/userProfile/ui/EditProfile";
import UserProfile from "../modules/components/user/userProfile/ui/UserProfile";
import Conversations from "../modules/components/user/crm/ui/Conversation";
import Crms from "../modules/components/user/crm/ui/Crms";
import WrittenBook from "../modules/components/user/writeBook/ui/WrittenBook";
import WriteBookSwitch from "../routes/WriteBookSwitch";
// import AboutWeb from "../modules/components/user/aboutweb/AboutWeb";
import ReadBook from "../modules/components/user/readbook/ui/ReadBook";
import ReadEpisode from "../modules/components/user/readbook/ui/ReadEpisode";
import EditBook from "../modules/components/user/writeBook/ui/EditBook";

import Search from "../modules/components/user/readbook/ui/SearchBooks";
import SearchResult from "../modules/components/user/readbook/ui/SearchResult";
import AboutUs from "../modules/components/user/aboutus/AboutUs";
import Books from "../modules/components/user/readbook/ui/Books";
import ViewBook from "../modules/components/user/readbook/ui/ViewBook";

class UserRoutes extends React.Component {
  render() {
    if (!Meteor.userId()) {
      this.props.history.push("/");
      return null;
    }
    return (
      <Switch>
        <Route exact path={this.props.match.path} component={Home} />
        <Route
          path={this.props.match.path + "/profile"}
          component={UserProfile}
        />
        <Route
          exact
          path={this.props.match.path + "/books"}
          component={Books}
        />
        <Route
          exact
          path={this.props.match.path + "/books/:id"}
          component={ViewBook}
        />
        path={this.props.match.path + "/books/search"}
        component={Search}
        />
        <Route
          path={this.props.match.path + "/books/search/:keyword"}
          component={SearchResult}
        />
        <Route
          exact
          path={this.props.match.path + "/books/:id/view/:index"}
          component={ReadEpisode}
        />
        <Route
          path={this.props.match.path + "/edit-profile"}
          component={EditProfile}
        />
        {/* <Route
          exact
          path={this.props.match.path + "/book"}
          component={ReadBook}
        />
        <Route
          path={this.props.match.path + "/book/:name"}
          component={ReadEpisode}
        /> */}
        <Route
          exact
          path={this.props.match.path + "/write"}
          component={WrittenBook}
        />
        <Route
          path={this.props.match.path + "/write/:id"}
          component={WriteBookSwitch}
        />
        {/* <Route
          path={this.props.match.path + "/write/:id/edit"}
          component={EditBook}
        /> */}
        <Route exact path={this.props.match.path + "/crm"} component={Crms} />
        <Route
          path={this.props.match.path + "/crm/:id"}
          component={Conversations}
        />
        <Route path={this.props.match.path + "/aboutus"} component={AboutUs} />
      </Switch>
    );
  }
}

export default withRouter(UserRoutes);
