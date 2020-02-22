import { Mongo } from "meteor/mongo";

const AboutUsData = new Mongo.Collection("aboutUs");
// export const AboutUsLogs = new Mongo.Collection("aboutUsLogs");

export { AboutUsData };
