import React, { Component } from "react";
import Edit from "@material-ui/icons/Edit";
import { Grid, Avatar } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";
import progel from "../../../../../core/progel";
export class AdminCard extends Component {
  render() {
    return (
      <Grid
        item
        xs={11}
        md={5}
        style={{
          border: "double ",
          borderRadius: 50,
          borderColor: "#ffc107",
          padding: 25,
          backgroundColor: "#f5f5f5"
        }}
      >
        <Grid container style={{ paddingRight: 20 }}>
          <Grid item xs={6}>
            <Avatar
              color="primary"
              src={"./../../../../img/logo256.png"}
              style={{ width: 130, height: 130 }}
            />
          </Grid>

          <Grid item xs={6}>
            <h1>{this.props.fullname}</h1>
            <h3>@{this.props.username}</h3>
            <h4>{this.props.email}</h4>
          </Grid>
          <Grid item item xs={6} style={{ paddingLeft: 20 }}>
            {this.props.accesslist.map((item, i) => {
              return (
                <Chip
                  label={item}
                  key={i}
                  style={{
                    fontSize: 12,
                    color: progel.$c.secondary,
                    borderColor: progel.$c.primary,
                    borderStyle: "dotted",
                    borderWidth: 2
                  }}
                  variant="outlined"
                />
              );
            })}
          </Grid>

          <Grid container justify="flex-end">
            <Tooltip
              title="Delete"
              aria-label="Delete"
              color="primary"
              onClick={() => {
                this.props.onDelete(this.props._id, this.props.fullname);
              }}
            >
              <DeleteIcon style={{ width: "60px", color: "#673ab7" }} />
              {/* <Avatar src={"./../../../../img/delete.svg"} /> */}
            </Tooltip>

            <Tooltip
              title="Edit"
              color="primary"
              onClick={() => {
                this.props.onEdit(this.props._id);
              }}
            >
              <Edit style={{ color: "#673ab7" }} />
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
export default AdminCard;
