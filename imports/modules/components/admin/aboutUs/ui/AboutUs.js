import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Button from "../../../../customs/Button/ui/Button";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { AboutUsData } from "../api/AboutUsData";
import TextField from "../../../../customs/TextField/ui/TextField";
import CustomEditor from "../../../../customs/Editor/ui/CustomEditor";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import progel from "../../../../../core/progel";
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

class AboutUs extends Component {
  constructor(props) {
    super(props);
    const html = this.props.defaultvalue ? this.props.defaultvalue : "";
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.state = { editorState };
    }
    this.state = {
      Text: "",
      Phone: "",
      Email: "",
      Data: "",
      Location: "",
      username: "",
      flag: true
    };
  }

  onEditorStateChange = editorState => {
    this.setState({ editorState });

    this.props.sendEditorValue(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  updateAboutUs = e => {
    Meteor.call(
      "AboutUs.update",
      this.state.editorState,
      this.state.Phone,
      this.state.Email,
      this.state.Data,
      this.state.Location,
      this.state.username,
      (err, res) => {
        if (res) progel.msg(res.message, res.variant);
        if (err) progel.msg(err.message, "error");
      }
    );
  };

  loadAboutUs = () => {
    this.setState({
      flag: true
    });
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.flag && nextProps.aboutUs) {
      return {
        editorState: nextProps.aboutUs.text,
        Phone: nextProps.aboutUs.phone,
        Email: nextProps.aboutUs.email,
        Data: nextProps.aboutUs.data,
        Location: nextProps.aboutUs.location,
        username: nextProps.user[0].username,
        flag: false
      };
    } else {
      return null;
    }
  }

  sendEditorValue = Text => {
    this.setState({ Text });
  };
  // *****************************************************************************************************
  render() {
    const { classes } = this.props;
    if (!this.props.aboutUs) {
      Meteor.call("AboutUs.insert", (err, res) => {
        if (res) progel.msg(res.message, res.variant);
        if (err) progel.msg(err.message, "error");
      });
      return null;
    }
    return (
      <Grid container>
        <Grid container style={{ paddingTop: 20 }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            xl={12}
            lg={12}
            style={{
              paddingRight: 40,
              paddingLeft: 40,
              paddingBottom: 10
            }}
          >
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
                defaultvalue={this.props.aboutUs.text || " "}
                sendEditorValue={value => {
                  this.setState({
                    editorState: value
                  });
                }}
              />
            </Grid>
          </Grid>
          {/**************************************************************************************************/}
          <Grid
            container
            justify="center"
            style={{ paddingLeft: "30px", paddingRight: "30px" }}
          >
            <Grid item xs={6} sm={6} md={3} xl={3} lg={3}>
              <TextField
                fullWidth
                label="Phone Number"
                style={{ backgroundColor: "white", paddingRight: "20px" }}
                value={this.state.Phone}
                onChange={this.handleChange("Phone")}
              />
            </Grid>

            <Grid item xs={6} sm={6} md={3} xl={3} lg={3}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                style={{ backgroundColor: "white", paddingRight: "20px" }}
                value={this.state.Email}
                onChange={this.handleChange("Email")}
              />
            </Grid>

            <Grid item xs={6} sm={6} md={3} xl={3} lg={3}>
              <TextField
                fullWidth={true}
                label="Location"
                type="text"
                style={{ backgroundColor: "white", paddingRight: "20px" }}
                value={this.state.Location}
                onChange={this.handleChange("Location")}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3} xl={3} lg={3}>
              <TextField
                fullWidth={true}
                style={{
                  backgroundColor: "white",
                  paddingRight: "18px"
                }}
                label="Custom data"
                type="text"
                value={this.state.Data}
                onChange={this.handleChange("Data")}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              xl={12}
              lg={12}
              style={{ paddingLeft: "50px", paddingRight: "50px" }}
            />
          </Grid>
        </Grid>

        <Grid container justify="center" style={{ paddingTop: "10px" }}>
          {/**************************************************************************************************/}
          <Grid
            item
            xs={3}
            sm={3}
            md={2}
            xl={2}
            lg={2}
            style={{ paddingRight: "20px" }}
          >
            <Button
              fullWidth={true}
              variant="outlined"
              style={{
                height: "45px",
                backgroundColor: "white !important",
                borderRadius: 25,
                borderWidth: "2px",
                borderColor: "#49b048"
              }}
              onClick={this.updateAboutUs}
              value="save"
            />
          </Grid>
          <Grid
            item
            xs={3}
            sm={3}
            md={2}
            xl={2}
            lg={2}
            style={{ paddingRight: "10px" }}
          >
            <Button
              fullWidth={true}
              variant="outlined"
              // color="primary"
              style={{
                height: "45px",
                backgroundColor: "white !important",
                borderRadius: 25,
                borderColor: "#bdbdbd",
                borderWidth: "2px"
              }}
              onClick={this.loadAboutUs}
              value="Cancel"
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

AboutUs.propTypes = {
  classes: PropTypes.object.isRequired
};

AboutUs = withTracker(props => {
  Meteor.subscribe("aboutUs");
  Meteor.subscribe("users");
  let user = Meteor.users.find({ _id: Meteor.userId() }).fetch();
  let aboutUs = AboutUsData.find().fetch();
  aboutUs = aboutUs[0];
  return { aboutUs, user };
})(AboutUs);

export default withStyles(styles)(AboutUs);
