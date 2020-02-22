import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

class EmptyTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      color: this.props.color
    };
  }

  handleChange = event => {
    this.setState({ text: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          id="outlined-bare"
          className={classes.textField}
          defaultValue={this.props.defaultValue}
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
          color={this.state.color}
        />
      </div>
    );
  }
}

EmptyTextField.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmptyTextField);
