import React, { Component } from "react";
import { Grid, Button } from "@material-ui/core";
import { withTracker } from "meteor/react-meteor-data";
import { GenresData } from "../../../admin/genres/api/GenresData";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import classNames from "classnames";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 600
  },
  tableRow: {
    cursor: "pointer"
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    }
  }
});

class GenreList extends Component {
  handleOpen = item => {
    this.props.history.push(`/user/genres/${item}`);
  };
  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center">
        <Grid item>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Genere Name</TableCell>
                <TableCell align="right">bookCount</TableCell>
                <TableCell align="right">Click Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.GenresList &&
                this.props.GenresList.map((Genre, i) => {
                  return (
                    <TableRow
                      className={classNames(
                        classes.tableRow,
                        classes.tableRowHover
                      )}
                      onClick={() => {
                        this.handleOpen(Genre.name);
                      }}
                      key={i}
                    >
                      <TableCell component="th" scope="row">
                        {Genre.name}
                      </TableCell>
                      <TableCell align="right">{Genre.bookCount}</TableCell>
                      <TableCell align="right">{Genre.clicked}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    );
  }
}
GenreList = withTracker(props => {
  Meteor.subscribe("GenrePublish");
  return { GenresList: GenresData.find({}).fetch() };
})(GenreList);

GenreList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GenreList);
