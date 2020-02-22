import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Button from "../../../../customs/Button/ui/Button";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { bookData } from "./../../../admin/books/api/BookData";

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
class EditEpisode extends Component {
  render() {
    return (
      <div>
        <Grid container>
          <Grid
            item
            inputprops={{
              classes: {
                root: this.props.classes.cssOutlinedInput,
                focused: this.props.classes.cssFocused,
                notchedOutline: this.props.classes.notchedOutline
              }
            }}
            style={{
              border: "#bdbdbd 1px solid ",
              borderRadius: 5,
              padding: 1,
              focused: { border: "red 1px solid important" }
            }}
            className={classes.grid}
          >
            <CustomEditor
              defaultvalue={this.props.writeBook.text || " "}
              sendEditorValue={value => {
                this.setState({
                  editorState: value
                });
              }}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default EditEpisode;

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
