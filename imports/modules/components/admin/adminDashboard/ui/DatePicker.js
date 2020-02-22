import React, { Component } from "react";
import DateFnsUtils from "@date-io/date-fns";
import jMoment from "moment-jalaali";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import JalaliUtils from "material-ui-pickers-jalali-utils";
import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
// import Prolar from "./../../core/prolar/Prolar";
import lightBlue from "@material-ui/core/colors/lightBlue";
import Button from "@material-ui/core/Button";

// import MomentUtils from "@date-io/moment";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const materialTheme = {
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#00265a"
      }
    },
    MuiPickersToolbarButton: {
      toolbarBtn: {
        color: "white",
        cursor: "pointer"
      },
      toolbarBtnSelected: {
        color: "white",
        fontFamily: "IRANSansWeb"
      }
    },
    MuiTypography: {
      body1: {
        color: "black",
        fontFamily: "IRANSansWeb",
        fontSize: "1.1rem"
      }
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        direction: "ltr"
      }
    },
    MuiPickersCalendarHeader: {
      dayLabel: {
        color: "black",
        fontFamily: "IRANSansWeb",
        fontSize: ".8rem",
        fontWeight: "bold",
        color: "#29466e"
      }
    },
    MuiPickersDay: {
      day: {
        color: "black",
        fontFamily: "IRANSansWeb",
        fontSize: ".8rem"
      },
      selected: {
        backgroundColor: "#00265a"
      },
      current: {
        color: lightBlue["900"]
      }
    }
  }
};

const styles = theme => ({
  fieldWidth: {
    width: "100%"
  },
  input: {
    padding: "0px",
    height: "44px"
    // direction: Prolar.language.direction == "rtl" ? "rtl" : undefined,
    // textAlign: Prolar.language.direction == "rtl" ? "" : undefined
  },
  // label: { right: "auto", paddingLeft: "10px" }
  button: {
    fontSize: 12,
    color: "#29466e",
    border: "1px solid #29466e",
    padding: "3px 10px",
    borderRadius: 6,
    width: 50,
    textAlign: "center"
  }
});

class EditedJalaliUtils extends JalaliUtils {
  startOfMonth(date) {
    return date.clone().startOf("jMonth");
  }
}

class CustomDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: true
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.flag && nextProps.defaultValue) {
      nextProps.dateValue(nextProps.defaultValue);
      return {
        dateValue: nextProps.defaultValue,
        flag: false
      };
    }
    return null;
  }

  handleChange = date => {
    this.setState(
      {
        dateValue: date
      },
      () => {
        this.props.dateValue(this.state.dateValue);
      }
    );
  };

  render() {
    const { classes, views } = this.props;

    return (
      <MuiThemeProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            views={views}
            invalidDateMessage="error"
            variant="outlined"
            label={this.props.label}
            keyboard
            cancelLabel={<span className={classes.button}>Cancel</span>}
            okLabel={<span className={classes.button}>Ok</span>}
            todayLabel={<span className={classes.button}>Today</span>}
            allowKeyboardControl
            adornmentPosition="start"
            InputProps={{ className: classes.input }}
            className={classes.fieldWidth}
            autoOk
            mask={
              views !== undefined
                ? [/\d/, /\d/, /\d/, /\d/]
                : [/\d/, /\d/, /\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/]
            }
            format={views !== undefined ? "yyyy" : "yyyy/MM/dd"}
            showTodayButton
            value={this.state.dateValue}
            onChange={this.handleChange}
          />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(CustomDatePicker);
