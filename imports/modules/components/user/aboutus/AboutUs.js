import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withTracker } from "meteor/react-meteor-data";
import ReactHtmlParser from "react-html-parser";
import { AboutUsData } from "../../admin/aboutUs/api/AboutUsData";

class AboutUs extends Component {
  initMap = () => {
    // The location of Uluru
    var uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru
    });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: uluru, map: map });
  };

  render() {
    // this.initMap();
    if (this.props.pubAbout.ready()) {
      return (
        <Grid container justify="center" style={{ marginTop: 10 }}>
          <Grid item xs={9}>
            {ReactHtmlParser(this.props.about.text)}
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="space-evenly" style={{ marginTop: 50 }}>
              <Grid
                item
                xs={12}
                md={5}
                style={{
                  boxShadow: `1px 1px 3px 3px #0001`,
                  borderRadius: 7,
                  justifyContent: "center"
                }}
              >
                Phone: {this.props.about.phone}
              </Grid>
              <Grid
                item
                xs={12}
                md={5}
                style={{
                  boxShadow: `1px 1px 3px 3px #0001`,
                  borderRadius: 7,
                  justifyContent: "center"
                }}
              >
                email: {this.props.about.email}
              </Grid>
              <Grid
                item
                xs={12}
                md={5}
                style={{
                  boxShadow: `1px 1px 3px 3px #0001`,
                  borderRadius: 7,
                  justifyContent: "center",
                  overflow: "scroll"
                }}
              >
                <div id="map" />
                location: {this.props.about.location}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    } else {
      return null;
    }
  }
}

export default withTracker(props => {
  let pubAbout = Meteor.subscribe("aboutUs");
  let about = AboutUsData.find({}).fetch()[0];
  return { pubAbout, about };
})(AboutUs);
