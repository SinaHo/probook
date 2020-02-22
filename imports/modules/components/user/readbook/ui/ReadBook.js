import React, { Component } from "react";
import { Grid } from "@material-ui/core";
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
let id = 0;
function createData(name) {
  id += 1;
  return { id, name };
}
const rows = [
  createData("Frozen yoghurt"),
  createData("Ice cream sandwich"),
  createData("Eclair"),
  createData("Cupcake"),
  createData("Gingerbread")
];

class ReadBook extends Component {
  handleOpen = item => {
    item = item.replace(/\ /g, "-");
    this.props.history.push(`/user/book/${item}`);
  };
  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        justify="space-between"
        style={{ display: "flex", flexWrap: "space-between" }}
      >
        {/* <p>fffff</p> */}
        {/* <div */}
        <Grid
          item
          // lg={6}
          style={{
            margin: "auto",
            backgroundImage: `url(${"/img/book.jpg"})`,
            maxWidth: "100%",
            // maxHeight: "100%",
            objectFit: "contain",
            marginTop: "20px"
          }}
        >
          <p style={{ padding: "85px" }}>{this.props.title || "BookTitle"}</p>
          <p style={{ paddingLeft: "85px", paddingBottom: "45px" }}>
            {this.props.author || "AuthorName"}
          </p>
          {/* </div> */}
        </Grid>
        <Grid item lg={7} style={{ margin: "auto" }}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Episodes</TableCell>
                <TableCell align="right">EpisodeName</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow
                  className={classNames(
                    classes.tableRow,
                    classes.tableRowHover
                  )}
                  onClick={() => {
                    this.handleOpen(row.name);
                  }}
                  key={row.id}
                >
                  <TableCell component="th" scope="row">
                    {"Episode " + row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    );
  }
}

ReadBook.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReadBook);
