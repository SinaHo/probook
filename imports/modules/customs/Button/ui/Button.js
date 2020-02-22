import Buttons from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import React, { Component } from "react";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    "&:hover": {
      background: "#f9cf5d",
      border: "#f9cf5d"
    }
  },
  input: {
    display: "none"
  }
});

class Button extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Buttons
        fullWidth={!!this.props.fullWidth}
        variant={this.props.variant}
        color={this.props.color}
        style={this.props.style}
        onClick={this.props.onClick}
        className={classes.button}
      >
        {this.props.value}
      </Buttons>
    );
  }
}

Button.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Button);
