import React from "react";
import PropTypes from "prop-types";

import Snackbar from "@material-ui/core/Snackbar";

import MySnackbarContentWrapper from "./mySnackbarContent/MySnackbarContent";

class CustomSnackBar extends React.Component {
  state = {
    open: false
  };

  show = (message, variant) => {
    this.setState({
      open: true,
      message,
      variant: variant ? variant : this.state.variant
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { duration, vertical, horizontal } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: vertical,
          horizontal: horizontal
        }}
        style={{ margin: 20, zIndex: 1000001 }}
        open={this.state.open}
        autoHideDuration={duration}
        onClose={this.handleClose}
      >
        <MySnackbarContentWrapper
          onClose={this.handleClose}
          variant={this.state.variant}
          message={this.state.message}
          style={{ margin: 8 }}
        />
      </Snackbar>
    );
  }
}

CustomSnackBar.defaultProps = {
  duration: 3000
};

export default CustomSnackBar;
