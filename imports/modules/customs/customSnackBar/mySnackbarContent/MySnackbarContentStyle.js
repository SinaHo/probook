import WarningIcon from "@material-ui/icons/Warning";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";

import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";

export const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

export const MySnackbarContentStyle = theme => ({
  success: {
    backgroundColor: green[600],
    direction: "ltr"
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    direction: "ltr"
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
    direction: "ltr"
  },
  warning: {
    backgroundColor: amber[700],
    direction: "ltr"
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
    marginBottom: "-6px"
  },
  message: {
    // display: "flex",
    alignItems: "right",
    fontSize: 14
  }
});
