import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { withStyles } from "@material-ui/core/styles";
import progel from "../../../core/progel";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const styles1 = theme => ({
  success: {
    backgroundColor: progel.$c.ok
  },
  error: {
    backgroundColor: progel.$c.error
  },
  info: {
    backgroundColor: progel.$c.neutral
  },
  warning: {
    backgroundColor: progel.$c.warning
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

class CustomSnackbar extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      open: false,
      variant: "error",
      message: "test"
    };
  }

  handleClick = () => {
    this.setState({ open: true });
  };
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };
  show = (variant, message) => {
    this.setState({
      open: true,
      variant,
      message
    });
  };
  outShow(variant, message) {
    show(variant, message);
  }
  componentWillMount() {
    console.log(this.refs);
    console.log(this.props);
  }
  render() {
    console.log("rendered");
    return (
      <Snackbar
        anchorOrigin={{
          vertical: this.props.vertical,
          horizontal: this.props.horizontal
        }}
        ref={this.props.ref}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
      >
        <MySnackbarContentWrapper
          onClose={this.handleClose}
          variant={this.state.variant}
          message={this.state.message}
        />
      </Snackbar>
    );
  }
}

CustomSnackbar.propTypes = {
  classes: PropTypes.object.isRequired
};

CustomSnackbar = withStyles(styles2)(CustomSnackbar);

export default CustomSnackbar;
