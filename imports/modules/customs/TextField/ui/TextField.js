import React, { Component } from "react";
import { TextField, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import classNames from "classnames";
import progel from "../../../../core/progel";

const styles = theme => ({
  input: {
    height: 40
  },
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
    // width: 200
  },
  cssLabel: {
    "&$cssFocused": {
      color: progel.$c.primary
    }
  },
  cssFocused: {},
  cssUnderline: {
    "&:after": {
      borderBottomColor: progel.$c.primary
    }
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: progel.$c.primary
    }
  },
  notchedOutline: {}
});

class TextFields extends Component {
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
      <TextField
        InputLabelProps={{
          classes: {
            root: this.props.classes.cssLabel,
            focused: this.props.classes.cssFocused
          }
        }}
        InputProps={{
          classes: {
            root: this.props.classes.cssOutlinedInput,
            focused: this.props.classes.cssFocused,
            notchedOutline: this.props.classes.notchedOutline
          }
        }}
        inputProps={this.props.inputProps}
        id="outlined-dense"
        placeholder={this.props.placeholder}
        label={this.props.label}
        fullWidth={!!this.props.fullWidth}
        className={classNames(classes.textField)}
        margin="dense"
        multiline={this.props.multiline}
        rows={this.props.rows}
        style={this.props.style}
        type={this.props.type}
        variant="outlined"
        onChange={this.props.onChange}
        defaultValue={this.props.defaultValue}
        value={this.props.value}
      />
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextFields);
