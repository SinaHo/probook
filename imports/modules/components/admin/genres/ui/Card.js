import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router";
import Progel from "../../../../../core/progel";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Clear from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";

const styles = {
  card: {
    position: "relative",
    minWidth: 200,
    border: "solid ",
    borderRadius: 20,
    borderColor: "#ffc107",
    padding: 7,
    backgroundColor: "#f5f5f5",
    boxShadow: "2px 0px 5px 0px rgba(51,51,51,0.63)"
  },

  title: {
    fontSize: 26,
    color: "rgba(0, 0, 0, 0.87)",
    cursor: "pointer"
  },
  pos: {
    position: "absolute",
    right: "15px",
    bottom: "10",
    fontSize: 12,
    color: "#rgba(0, 0, 0, 0.57)"
  }
};

class SimpleCard extends Component {
  constructor(props) {
    super(props);
  }
  DeleteGenre = item => {
    Meteor.call("genre.Delete", item, (err, res) => {
      if (res) progel.msg(res.message, res.variant);
      if (err) progel.msg(err.message, "error");
    });
  };
  handleOpen = item => {
    Meteor.call("genre.clicked", item, (err, res) => {
      if (res) progel.msg(res.message, res.variant);
      if (err) progel.msg(err.message, "error");
    });

    this.props.history.push(`/admin/dashboard/genre/${item}`);
  };
  render() {
    const { classes } = this.props;
    return (
      <Grid
        item
        md={6}
        sm={6}
        xs={12}
        style={{
          marginTop: "40px",
          // backgroundColor: "red",
          borderbuttom: "#ffc107"
        }}
      >
        <Grid container>
          <Grid item md={12}>
            <Card className={classes.card}>
              <IconButton
                onClick={() => {
                  this.DeleteGenre(this.props.GenreName);
                }}
                style={{ position: "absolute", right: "10px", top: "0" }}
              >
                <Clear />
              </IconButton>
              <CardContent>
                <Typography
                  variant="h5"
                  color="textSecondary"
                  className={classes.title}
                  onClick={() => {
                    this.handleOpen(this.props.Genre._id);
                  }}
                >
                  {this.props.GenreName}
                </Typography>
                <Typography className={classes.pos}>
                  {this.props.GenreLength ? this.props.GenreLength : "0"} Books
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* <Grid item md={2} /> */}
        </Grid>
      </Grid>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};
Sm = withStyles(styles)(SimpleCard);
export default withRouter(Sm);
