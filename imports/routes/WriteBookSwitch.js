import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import WrittenBook from "../modules/components/user/writeBook/ui/WrittenBook";
import AddEpisode from "../modules/components/user/writeBook/ui/AddEpisode";
import EditEpisode from "../modules/components/user/writeBook/ui/EditEpisode";

import EditBook from "../modules/components/user/writeBook/ui/EditBook";
class WriteBookSwitch extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={this.props.match.path} component={EditBook} />
        <Route
          path={this.props.match.path + "/add-episode"}
          component={AddEpisode}
        />
        <Route
          path={this.props.match.path + "/edit-episode/:episodeIndex"}
          component={EditEpisode}
        />
      </Switch>
    );
  }
}

export default WriteBookSwitch;
