import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import Button from "../../../../customs/Button/ui/Button";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { bookData } from "./../../../admin/books/api/BookData";
import PropTypes from "prop-types";
import CustomEditor from "../../../../customs/Editor/ui/CustomEditor";
import TextField from "@material-ui/core/TextField";
import progel from "../../../../../core/progel";
import AddIcon from "@material-ui/icons/AddCircle";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
// -------------------------------------------------------------------------------------------

const styles = theme => ({
  grid: {
    "&:hover": {
      border: "black 1px solid !important"
    },

    "&:focused": {
      border: "red 1px solid important"
    }
  }
});
class AddEpisode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: ""
    };
  }
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    // let classes = this.props.classes;
    const { classes } = this.props;
    return (
      <div>
        <Grid container justify="center" style={{ padding: 40 }}>
          {/* // -------------------------------------------------- */}

          <Grid
            item
            xs={10}
            md={7}
            style={{
              margin: "15px 0",
              padding: 32,
              display: "flex",
              justifyContent: "flex-start"
            }}
          >
            <TextField
              label="title"
              id="title"
              value={this.state.title}
              onChange={this.handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid
            item
            md={3}
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "flex-end",
              top: 40,
              left: 75
            }}
          >
            <Tooltip title="Add Episode">
              <IconButton aria-label="addepisode">
                <AddIcon
                  onClick={() => {
                    if (this.state.text && this.state.title) {
                      console.log("inside");
                      Meteor.call(
                        "books.submitNewEpisode",
                        this.props.match.params.id,
                        this.state.title,
                        this.state.text,
                        (err, res) => {
                          if (res) progel.msg(res.message, res.variant);
                          if (err) progel.msg(err.message, "error");
                        }
                      );
                    } else {
                      progel.msg("Please fill all fields", "warning");
                    }
                  }}
                />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid
            item
            xs={10}
            md={11}
            style={{
              borderBottom: `6px double ${progel.$c.secondary} `,
              marginBottom: 30
            }}
          />
          <Grid
            item
            xs={10}
            md={11}
            inputprops={{
              classes: {
                root: this.props.classes.cssOutlinedInput,
                focused: this.props.classes.cssFocused,
                notchedOutline: this.props.classes.notchedOutline
              }
            }}
            style={{
              border: "#bdbdbd 4px solid ",
              borderRadius: 10,

              padding: 32,
              minHeight: 700,
              focused: { border: "red 1px solid important" }
            }}
            className={classes.grid}
          >
            <CustomEditor
              sendEditorValue={value => {
                this.setState({
                  text: value
                });
              }}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
AddEpisode.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddEpisode);

//     < Grid
// item
// inputprops = {{
//     classes: {
//         root: this.props.classes.cssOutlinedInput,
//             focused: this.props.classes.cssFocused,
//                 notchedOutline: this.props.classes.notchedOutline
//     }
// }}
// style = {{
//     border: "#bdbdbd 1px solid ",
//         borderRadius: 5,
//             padding: 1,
//                 focused: { border: "red 1px solid important" }
// }}
// className = { classes.grid }
//     >
//     <CustomEditor
//         defaultvalue={this.props.aboutUs.text || " "}
//         sendEditorValue={value => {
//             this.setState({
//                 editorState: value
//             });
//         }}
//     />
//             </Grid >
