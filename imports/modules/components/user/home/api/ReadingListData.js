import { Mongo } from "meteor/mongo";

const RLData = new Mongo.Collection("readingList");

export { RLData };
