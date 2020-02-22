import React, { Component } from "react";
import { TextField, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    borderColor: "#7a3c4a"
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 1000
  }
});

class MultiLineTextField extends Component {
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
      <Grid>
        <TextField
          id="outlined-multiline-static"
          label={this.props.label}
          multiline
          rows={this.props.rows}
          style={this.props.style}
          fullWidth
          defaultValue={this.props.defaultValue}
          value={this.props.value}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={this.props.onChange}
          color={this.props.color}
        />
      </Grid>
    );
  }
}

MultiLineTextField.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MultiLineTextField);
