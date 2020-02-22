import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import progel from "./../../../../../core/progel";
import { bookData } from "./../api/BookData";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

const styles = theme => ({
  card: {
    display: "flex",
    height: "120px",
    position: "relative"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151,
    position: "absolute",
    right: 0,
    height: "inherit"
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  }
});

class BookItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes, theme } = this.props;
    if (!this.props.bookList) {
      return (
        <Grid>
          <Card className={classes.card}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5" />
                <Typography variant="subtitle1" color="textSecondary" />
                <Chip color="primary" label={"item"} style={{ fontSize: 12 }} />
              </CardContent>
            </div>
            <CardMedia
              className={classes.cover}
              title="Live from space album cover"
              image="/img/logo64.png"
            />
          </Card>
        </Grid>
      );
    } else {
      return this.props.bookList.map((item, i) => {
        return (
          <Grid key={i} item md={3} sm={6} xs={10}>
            <Card className={classes.card}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography
                    component="h5"
                    variant="h5"
                    style={{ fontSize: 14 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" />
                  <Typography>
                    <Chip
                      color="primary"
                      label={"item"}
                      style={{ fontSize: 12, margin: "5px 0" }}
                    />
                  </Typography>
                  <Typography>
                    <Chip
                      label={item.author[0].name}
                      style={{ fontSize: 12, margin: "5px 0" }}
                    />
                  </Typography>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                title="Live from space album cover"
                image="/img/logo64.png"
              />
            </Card>
          </Grid>
        );
      });
    }
  }
}

BookItem = withTracker(props => {
  Meteor.subscribe("bookPublish");
  return {
    bookList:
      props.returnforgenre === "1"
        ? bookData.find({ _id: props.book }).fetch()
        : bookData.find({}).fetch()
  };
})(BookItem);
export default withStyles(styles, { withTheme: true })(BookItem);
