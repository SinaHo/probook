import { Meteor } from "meteor/meteor";
import {  bookgenredata} from './BookGenreData'
if (Meteor.isServer) {
 
    Meteor.publish("bookgenre", () => {

        return bookgenredata.find({});
    });
}
