import { Mongo } from "meteor/mongo";

const bookData = new Mongo.Collection("books");

export { bookData };
