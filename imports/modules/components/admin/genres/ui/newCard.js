import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router";
import { Grid } from "@material-ui/core";
import Clear from "@material-ui/icons/Clear";
import Book from "@material-ui/icons/Book";
import progel from "../../../../../core/progel";
import IconButton from "@material-ui/core/IconButton";
const styles = {
  card: {},
  media: {
    height: 140
  },
  genreTitle: {
    textAlign: "center"
  },
  CardActions: {
    padding: 0
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
        xs={6}
        lg={3}
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px"
        }}
      >
        <Card
          className={classes.card}
          style={{ position: "relative", minWidth: "200px" }}
        >
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="/img/logo64.png"
              title="Contemplative Reptile"
              style={{ background: "#fcb74d" }}
              onClick={() => {
                this.handleOpen(this.props.Genre._id);
              }}
            />
            <CardContent className={classes.genreTitle}>
              <Typography
                gutterBottom
                variant="h5"
                onClick={() => {
                  this.handleOpen(this.props.Genre._id);
                }}
              >
                {this.props.GenreName}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.CardActions}>
            <IconButton
              size="large"
              style={{ position: "absolute", left: "5px", top: "0" }}
            >
              {this.props.GenreLength ? this.props.GenreLength : "0"} <Book />
            </IconButton>
            <IconButton
              onClick={() => {
                this.DeleteGenre(this.props.GenreName);
              }}
              style={{ position: "absolute", right: "10px", top: "0" }}
            >
              <Clear />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};
Sm = withStyles(styles)(SimpleCard);
export default withRouter(Sm);
